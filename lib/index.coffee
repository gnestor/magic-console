{CompositeDisposable} = require 'atom'
url = require 'url'
ConsoleRuntimeObserver = require './console-runtime-observer'
ConsoleRuntimeView = require './console-runtime-view'

module.exports = SampleScriptConsumer =

  # subscriptions: null

  config:
    evaluateOnSave:
      type        : 'boolean'
      description : 'Re-evaluate on save'
      default     : true

  activate: (state) ->
    @subscriptions = new CompositeDisposable
    @subscriptions.add atom.commands.add 'atom-workspace', 'magic-console:toggle':
      => @toggle()
    @views = []
    @blankRuntime = null
    atom.workspace.addOpener (uriToOpen) =>
      try
        {protocol, host, pathname} = url.parse(uriToOpen)
      catch error
        return
      return unless protocol is 'hyper-console:'
      try
        pathname = decodeURI(pathname) if pathname
      catch error
        return
      if host is 'editor'
        editorId = pathname.substring(1)
        view = new ConsoleRuntimeView({editorId})
        changeCount = view.editor.buffer.changeCount.valueOf()
        @views = [@views..., view]
        @subscriptions.add view.onDidDestroy =>
          @blankRuntime.stop()
          @views = @views.filter (view) -> view.editorId != editorId
        @subscriptions.add view.onDidSave (ev) =>
          if atom.config.get 'magic-console.evaluateOnSave'
            if view.editor.buffer.changeCount > changeCount
              console.log 'onDidSave', @blankRuntime.observers[0].view.editor.buffer.changeCount, changeCount
              changeCount = @blankRuntime.observers[0].view.editor.buffer.changeCount
              @blankRuntime.stop()
              @runBlank(view)
        view
      else
        filePath = pathname
        view = new ConsoleRuntimeView({filePath})
        changeCount = view.editor.buffer.changeCount.valueOf()
        @views = [@views..., view]
        @subscriptions.add view.onDidDestroy =>
          @blankRuntime.stop()
          @views = @views.filter (view) -> view.filePath != filePath
        @subscriptions.add view.onDidSave (ev) =>
          if atom.config.get 'magic-console.evaluateOnSave'
            if view.editor.buffer.changeCount > changeCount
              console.log 'onDidSave', @blankRuntime.observers[0].view.editor.buffer.changeCount, changeCount
              changeCount = @blankRuntime.observers[0].view.editor.buffer.changeCount
              @blankRuntime.stop()
              @runBlank(view)
        view

  deactivate: ->
    @subscriptions.dispose()
    @view.destroy()

  # serialize: ->
  #   view: @views.forEach (view) -> view.serialize()

  # deserialize: ->
  #   view: @view.deserialize()

  consumeBlankRuntime: (runtime) ->
    @blankRuntime = runtime

  consumeDefaultRuntime: (runtime) ->
    @defaultRuntime = runtime

  activatePackage: (packageName) ->
    return if atom.packages.activePackages[packageName]?
    atomPackage = atom.packages.loadPackage(packageName)
    throw new Error("Packaged not installed: '#{packageName}'") unless atomPackage?
    atomPackage.activateNow()

  runBlank: (view) ->
    # @activatePackage('script')
    @blankRuntime?.observers.forEach (observer) -> observer.destroy()
    @blankRuntime.observers = []
    @blankRuntime.addObserver(new ConsoleRuntimeObserver(view))
    @blankRuntime.execute()

  runDefault: ->
    @activatePackage('script')
    @defaultRuntime.execute()

  toggle: ->
    editor = atom.workspace.getActiveTextEditor()
    return unless editor?
    uri = "hyper-console://editor/#{editor.id}"
    previewPane = atom.workspace.paneForURI(uri)
    if previewPane
      # previewPane.destroyItem(previewPane.itemForURI(uri))
      previousActivePane = atom.workspace.getActivePane()
      previewPane.activateItemForURI(uri)
      @blankRuntime.stop()
      previousActivePane.activate()
      return @runBlank(previewPane.itemForURI(uri))
      # return @blankRuntime.execute()
    previousActivePane = atom.workspace.getActivePane()
    atom.workspace.open(uri, split: 'right', searchAllPanes: true).then (consoleRuntimeView) =>
      if consoleRuntimeView instanceof ConsoleRuntimeView
        previousActivePane.activate()
        @runBlank(consoleRuntimeView)
