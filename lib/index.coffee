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
      description : 'Watch for changes and re-evaluate a source file on save'
      default     : true

  activate: (state) ->
    @subscriptions = new CompositeDisposable
    @subscriptions.add atom.commands.add 'atom-workspace', 'magic-console:toggle':
      => @toggle()
    @subscriptions.add atom.commands.add 'atom-workspace', 'magic-console:open-plugins-directory':
      => @openPluginsDirectory()
    @subscriptions.add atom.commands.add 'atom-workspace', 'magic-console:create-new-plugin':
      => @createNewPlugin()
    @views = []
    # @blankRuntime = null
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
        @createView({editorId: pathname.substring(1)})
      else
        @createView({filePath: pathname})
    atom.deserializers.add(this)
    if state.views
      console.log('deserialize', state)
      @deserialize(state)

  createView: ({editorId, filePath, data}) ->
    if editorId or filePath
      view = new ConsoleRuntimeView({editorId, filePath, data})
      @views = [@views..., view]
      @subscriptions.add view.onDidDestroy =>
        if editorId
          @views = @views.filter (view) -> view.editorId != editorId
        else if filePath
          @views = @views.filter (view) -> view.filePath != filePath
        @blankRuntime.stop() if @blankRuntime
      @subscriptions.add view.onDidSave (ev) =>
        if atom.config.get 'magic-console.evaluateOnSave'
          @toggle() unless @blankRuntime.observers?.length > 0
      view

  deactivate: ->
    @subscriptions.dispose()

  serialize: ->
    deserializer: 'magic-console'
    views: @views.map (view) -> view.dehydrate()

  deserialize: ({views}) ->
    views.forEach (view) =>
      @createView(view)
      atom.workspace.open("magic-console://editor/#{view.editorId}", split: 'right', searchAllPanes: true)

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

  # runDefault: ->
  #   # @activatePackage('script')
  #   @defaultRuntime.execute()

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

  openPluginsDirectory: ->
    atom.open(pathsToOpen: path.join(__dirname, '..', 'plugins'))

  createNewPlugin: ->
    template = fs.readFileSync(path.join(__dirname, '..', 'utils', 'plugin-template.js'), encoding: 'utf-8')
    atom.workspace.open(path.join(__dirname, '..', 'plugins', 'New.js')).then (textEditor) =>
      textEditor.setText(template)
