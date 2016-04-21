'use babel'

import {CompositeDisposable} from 'atom'

export default class ConsoleRuntimeObserver {

  constructor(view) {
    this.view = view
    this.subscriptions = new CompositeDisposable
  }

  observe(runtime) {
    console.log(runtime)
    this.subscriptions.add(runtime.onStart(() => {
      // console.log('starting execution')
    }))
    this.subscriptions.add(runtime.onStarted(() => {
      // console.log('started execution')
      this.view.setStatus('started')
    }))
    this.subscriptions.add(runtime.onStopped(() => {
      // console.log('stopped execution')
      this.view.setStatus('stopped')
      this.destroy()
      runtime.observers = []
    }))
    this.subscriptions.add(runtime.onDidWriteToStderr(ev => {
      // console.log('stderr:', ev.message)
      this.view.render(ev.message)
    }))
    this.subscriptions.add(runtime.onDidWriteToStdout(ev => {
      // console.log('stdout:', ev.message)
      this.view.render(ev.message)
    }))
    this.subscriptions.add(runtime.onDidExit(ev => {
      // console.log(`execution finished, code: ${ev.returnCode}, time: ${ev.executionTime}`)
      this.view.setStatus('exited')
      this.destroy()
      runtime.observers = []
    }))
    this.subscriptions.add(runtime.onDidNotRun(ev => {
      // console.log(`didn't manage to run ${ev.command}`)
    }))
    this.subscriptions.add(runtime.onDidContextCreate(ev => {
      // console.log(`context created, language: ${ev.lang}, filename: ${ev.filename}, line number: ${ev.lineNumber}`)
    }))
    this.subscriptions.add(runtime.onDidNotSpecifyLanguage(ev => {
      // console.log('please specify language')
    }))
    this.subscriptions.add(runtime.onDidNotSupportLanguage(ev => {
      // console.log(`language not supported: ${ev.lang}`)
    }))
    this.subscriptions.add(runtime.onDidNotSupportMode(ev => {
      // console.log(`Mode ${ev.argType} not supported for ${ev.lang}`)
    }))
    this.subscriptions.add(runtime.onDidNotBuildArgs(ev => {
      // console.log(`Couldn't build args: ${ev.error}`)
    }))
  }

  destroy() {
    this.subscriptions.dispose()
  }

}
