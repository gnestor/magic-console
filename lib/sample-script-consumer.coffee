ConsoleRuntimeObserver = require './console-runtime-observer'

{CompositeDisposable} = require 'atom'

module.exports = SampleScriptConsumer =
  subscriptions: null

  activate: (state) ->
    # Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    @subscriptions = new CompositeDisposable

    # Register command that toggles this view
    @subscriptions.add atom.commands.add 'atom-workspace', 'sample-script-consumer:run-blank':
      => @runBlank()
    @subscriptions.add atom.commands.add 'atom-workspace', 'sample-script-consumer:run-default':
      => @runDefault()

  deactivate: ->
    @subscriptions.dispose()

  serialize: ->
    sampleScriptConsumerViewState: @sampleScriptConsumerView.serialize()

  consumeBlankRuntime: (runtime) ->
    @blankRuntime = runtime
    @blankRuntime.addObserver(new ConsoleRuntimeObserver)

  consumeDefaultRuntime: (runtime) ->
    @defaultRuntime = runtime

  activatePackage: (packageName) ->
    return if atom.packages.activePackages[packageName]?

    # There's no easy way to use PackageManager to force activate a package
    # As of 9.09.2015 this is the way to go
    pakage = atom.packages.loadPackage(packageName)

    throw new Error("Packaged not installed: '#{packageName}'") unless pakage?

    pakage.activateNow()

  runBlank: ->
    @activatePackage('script')
    @blankRuntime.execute()

  runDefault: ->
    @activatePackage('script')
    @defaultRuntime.execute()
