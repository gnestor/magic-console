'use babel'

import {CompositeDisposable} from 'atom'
import fs from 'fs'
import url from 'url'
import path from 'path'
import ConsoleRuntimeObserver from './RuntimeObserver'
import ConsoleRuntimeView from './RuntimeView'

export default {

  config: {
    evaluateOnSave: {
      type: 'boolean',
      description: 'Watch for changes and re-evaluate a source file on save',
      default: true
    }
  },

  activate(state) {
    this.subscriptions = new CompositeDisposable
    this.subscriptions.add(
      atom.commands.add('atom-workspace', {
        'magic-console:toggle': () => this.toggle(),
        'magic-console:open-plugins-directory': () => this.openPluginsDirectory(),
        'magic-console:create-new-plugin': () => this.createNewPlugin()
      })
    )
    this.views = []
    atom.workspace.addOpener(uriToOpen => {
      let [protocol, host, pathname] = uriToOpen.split(/\/+/)
      if (!protocol || protocol !== 'magic-console:') return
      if (host === 'editor') return this.createView({editorId: pathname})
      return this.createView({filePath: `/${pathname}`})
    })
    atom.deserializers.add(this)
    if (state) this.deserialize(state)
  },

  createView({editorId, filePath, data}) {
    let view = new ConsoleRuntimeView({editorId, filePath, data})
    this.views = [...this.views, view]
    this.subscriptions.add(
      view.onDidDestroy(() => {
        if (editorId) {
          this.views = this.views.filter(view => view.editorId != editorId)
        } else if (filePath) {
          this.views = this.views.filter(view => view.filePath != filePath)
        }
        if (this.blankRuntime) this.blankRuntime.stop()
      })
    )
    this.subscriptions.add(
      view.onDidSave(ev => {
        if (atom.config.get('magic-console.evaluateOnSave')) {
          if (this.blankRuntime.observers) {
            if (this.blankRuntime.observers.length === 0) this.toggle()
          }
        }
      })
    )
    return view
  },

  deactivate() {
    this.subscriptions.dispose()
  },

  serialize() {
    return {
      deserializer: 'magic-console',
      views: this.views.map(view => view.dehydrate())
    }
  },

  deserialize({views}) {
    if (!views) return
    views.forEach(view => {
      this.createView(view)
      atom.workspace.open(`magic-console://editor/${view.editorId}`, {split: 'right'}, {searchAllPanes: true})
    })
  },

  consumeBlankRuntime(runtime) {
    this.blankRuntime = runtime
  },

  activatePackage(packageName) {
    if (atom.packages.activePackages[packageName]) return
    let atomPackage = atom.packages.loadPackage(packageName)
    if (!atomPackage) throw new Error(`Packaged not installed: '${packageName}'`)
    atomPackage.activateNow()
  },

  runBlank(view) {
    this.activatePackage('script')
    this.blankRuntime.addObserver(new ConsoleRuntimeObserver(view))
    this.blankRuntime.execute()
  },

  toggle() {
    let editor = atom.workspace.getActiveTextEditor()
    if (!editor) return
    let uri = `magic-console://editor/${editor.id}`
    let outputPane = atom.workspace.paneForURI(uri)
    let previousActivePane
    if (outputPane) {
      previousActivePane = atom.workspace.getActivePane()
      outputPane.activateItemForURI(uri)
      if (!this.blankRuntime) this.runBlank(outputPane.itemForURI(uri))
      if (this.blankRuntime.observers) {
        if (this.blankRuntime.observers.length > 0) return this.blankRuntime.stop()
      }
      previousActivePane.activate()
      return this.runBlank(outputPane.itemForURI(uri))
    }
    previousActivePane = atom.workspace.getActivePane()
    atom.workspace.open(uri, {split: 'right'}, {searchAllPanes: true}).then(consoleRuntimeView => {
      if (consoleRuntimeView instanceof ConsoleRuntimeView) {
        previousActivePane.activate()
        this.runBlank(consoleRuntimeView)
      }
    })
  },

  openPluginsDirectory() {
    atom.open({pathsToOpen: path.join(__dirname, '..', 'plugins')})
  },

  createNewPlugin() {
    let template = fs.readFileSync(path.join(__dirname, '..', 'utils', 'plugin-template.js'), {encoding: 'utf-8'})
    atom.workspace.open(path.join(__dirname, '..', 'plugins', 'New.js')).then(textEditor => {
      textEditor.setText(template)
    })
  }

}
