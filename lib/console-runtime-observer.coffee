{ CompositeDisposable } = require 'atom'

module.exports =
class ConsoleRuntimeObserver
  constructor: (@view, @subscriptions = new CompositeDisposable) ->

  observe: (runtime) ->
    console.log runtime
    @subscriptions.add runtime.onStart =>
      # console.log('starting execution')
    @subscriptions.add runtime.onStarted =>
      # console.log('started execution')
    @subscriptions.add runtime.onStopped =>
      console.log('stopped execution')
    @subscriptions.add runtime.onDidWriteToStderr (ev) =>
      # console.log('stderr:', ev.message)
      @view.render ev.message
    @subscriptions.add runtime.onDidWriteToStdout (ev) =>
      # console.log('stdout:', ev.message)
      @view.render ev.message
    @subscriptions.add runtime.onDidExit (ev) =>
      console.log("execution finished, code: #{ev.returnCode}, time: #{ev.executionTime}")
    @subscriptions.add runtime.onDidNotRun (ev) =>
      # console.log("didn't manage to run #{ev.command}")
    @subscriptions.add runtime.onDidContextCreate (ev) =>
      # console.log("context created, language: #{ev.lang}, filename: #{ev.filename}, line number: #{ev.lineNumber}")
    @subscriptions.add runtime.onDidNotSpecifyLanguage =>
      # console.log("please specify language")
    @subscriptions.add runtime.onDidNotSupportLanguage (ev) =>
      # console.log("language not supported: #{ev.lang}")
    @subscriptions.add runtime.onDidNotSupportMode (ev) =>
      # console.log("Mode #{ev.argType} not supported for #{ev.lang}")
    @subscriptions.add runtime.onDidNotBuildArgs (ev) =>
      # console.log("Couldn't build args: #{ev.error}")

  destroy: ->
    @subscriptions?.dispose()
