'use babel'

import {CompositeDisposable} from 'atom'

export default class RuntimeObserver {

  constructor(view) {
    this.view = view
    this.subscriptions = new CompositeDisposable
  }

  observe(runtime) {
    console.log(runtime)
    this.subscriptions.add(
      runtime.onStart(() => {
        // console.log('starting execution')
      }),
      runtime.onStarted(() => {
        // console.log('started execution')
        this.view.setStatus('started')
      }),
      runtime.onStopped(() => {
        // console.log('stopped execution')
        this.view.setStatus('stopped')
        this.destroy()
        runtime.observers = []
      }),
      runtime.onDidWriteToStderr(ev => {
        // console.log('stderr:', ev.message)
        this.view.render(ev.message)
      }),
      runtime.onDidWriteToStdout(ev => {
        // console.log('stdout:', ev.message)
        this.view.render(ev.message)
      }),
      runtime.onDidExit(ev => {
        // console.log(`execution finished, code: ${ev.returnCode}, time: ${ev.executionTime}`)
        this.view.setStatus('exited')
        this.destroy()
        runtime.observers = []
      }),
      runtime.onDidNotRun(ev => {
        // console.log(`didn't manage to run ${ev.command}`)
      }),
      runtime.onDidContextCreate(ev => {
        // console.log(`context created, language: ${ev.lang}, filename: ${ev.filename}, line number: ${ev.lineNumber}`)
      }),
      runtime.onDidNotSpecifyLanguage(ev => {
        // console.log('please specify language')
      }),
      runtime.onDidNotSupportLanguage(ev => {
        // console.log(`language not supported: ${ev.lang}`)
      }),
      runtime.onDidNotSupportMode(ev => {
        // console.log(`Mode ${ev.argType} not supported for ${ev.lang}`)
      }),
      runtime.onDidNotBuildArgs(ev => {
        // console.log(`Couldn't build args: ${ev.error}`)
      })
    )
  }

  destroy() {
    this.subscriptions.dispose()
  }

}
