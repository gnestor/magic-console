{CompositeDisposable} = require 'atom'
fs = require 'fs'
url = require 'url'
path = require 'path'
ConsoleRuntimeObserver = require './console-runtime-observer'
ConsoleRuntimeView = require './console-runtime-view'

module.exports = SampleScriptConsumer =

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
      return unless protocol is 'magic-console:'
      try
        pathname = decodeURI(pathname) if pathname
      catch error
        return
      if host is 'editor'
        editorId = pathname.substring(1)
        view = new ConsoleRuntimeView({editorId})
        @views = [@views..., view]
        @subscriptions.add view.onDidDestroy =>
          @blankRuntime.stop()
          @views = @views.filter (view) -> view.editorId != editorId
        @subscriptions.add view.onDidSave (ev) =>
          if atom.config.get 'magic-console.evaluateOnSave'
            @toggle() unless @blankRuntime.observers?.length > 0
        view
      else
        filePath = pathname
        view = new ConsoleRuntimeView({filePath})
        @views = [@views..., view]
        @subscriptions.add view.onDidDestroy =>
          @blankRuntime.stop()
          @views = @views.filter (view) -> view.filePath != filePath
        @subscriptions.add view.onDidSave (ev) =>
          if atom.config.get 'magic-console.evaluateOnSave'
            @toggle() unless @blankRuntime.observers?.length > 0
        view

  deactivate: ->
    @subscriptions.dispose()

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
    @activatePackage('script')
    @blankRuntime.addObserver(new ConsoleRuntimeObserver(view))
    @blankRuntime.execute()

  runDefault: ->
    # @activatePackage('script')
    @defaultRuntime.execute()

  toggle: ->
    editor = atom.workspace.getActiveTextEditor()
    return unless editor?
    uri = "magic-console://editor/#{editor.id}"
    previewPane = atom.workspace.paneForURI(uri)
    if previewPane
      # previewPane.destroyItem(previewPane.itemForURI(uri))
      previousActivePane = atom.workspace.getActivePane()
      previewPane.activateItemForURI(uri)
      if @blankRuntime.observers?.length > 0
        return @blankRuntime.stop()
      previousActivePane.activate()
      return @runBlank(previewPane.itemForURI(uri))
      # return @blankRuntime.execute()
    previousActivePane = atom.workspace.getActivePane()
    atom.workspace.open(uri, split: 'right', searchAllPanes: true).then (consoleRuntimeView) =>
      if consoleRuntimeView instanceof ConsoleRuntimeView
        previousActivePane.activate()
        @runBlank(consoleRuntimeView)
