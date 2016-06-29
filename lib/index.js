'use babel'

import {CompositeDisposable} from 'atom'
import fs from 'fs'
import url from 'url'
import path from 'path'
import RuntimeObserver from './RuntimeObserver'
import RuntimeView from './RuntimeView'

export default magicConsole = {

  config: {
    evaluateOnSave: {
      type: 'boolean',
      description: 'Watch for changes and re-evaluate a source file on save',
      default: true
    }
  },

  activate(state) {
    fixPath(atom.project.getPaths()[0])
    this.subscriptions = new CompositeDisposable
    this.subscriptions.add(
      atom.commands.add('atom-workspace', {
        'magic-console:toggle': () => this.toggle(),
        'magic-console:step-backward': () => this.stepBackward(),
        'magic-console:step-forward': () => this.stepForward(),
        'magic-console:open-plugins-directory': () => this.openPluginsDirectory(),
        'magic-console:create-new-plugin': () => this.createNewPlugin()
      }),
      atom.workspace.project.onDidChangePaths(paths => fixPath(paths[0]))
    )
    this.views = []
    atom.workspace.addOpener(uriToOpen => {
      let [protocol, host, pathname] = uriToOpen.split(/\/+/)
      if (!protocol || protocol !== 'magic-console:' || host !== 'editor') return
      if (!atom.workspace.getTextEditors().find(editor => editor.id.toString() === pathname)) return
      return this.createView({editorId: pathname})
      // return this.createView({filePath: `/${pathname}`})
    })
    atom.deserializers.add(this)
    if (state) this.deserialize(state)
  },

  createView({editorId, filePath, state}) {
    let view = new RuntimeView({editorId, filePath, state})
    this.views = [...this.views, view]
    this.subscriptions.add(
      view.onDidDestroy(() => {
        if (editorId) {
          this.views = this.views.filter(view => view.editorId != editorId)
        } else if (filePath) {
          this.views = this.views.filter(view => view.filePath != filePath)
        }
        if (this.blankRuntime) this.blankRuntime.stop()
      }),
      view.onDidSave(ev => {
        if (atom.config.get('magic-console.evaluateOnSave')) {
          if (this.blankRuntime) {
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
    this.blankRuntime.addObserver(new RuntimeObserver(view))
    this.blankRuntime.execute()
  },

  toggle() {
    let editor = atom.workspace.getActiveTextEditor()
    if (!editor) return
    let uri = `magic-console://editor/${editor.id}`
    let outputPane = atom.workspace.paneForURI(uri)
    let editorPane = atom.workspace.getActivePane()
    if (outputPane) {
      outputPane.activateItemForURI(uri)
      editorPane.activate()
      if (this.blankRuntime && this.blankRuntime.observers.length > 0) return this.blankRuntime.stop()
      return this.runBlank(outputPane.itemForURI(uri))
    }
    atom.workspace.open(uri, {split: 'right'}, {searchAllPanes: true}).then(runtimeView => {
      if (runtimeView instanceof RuntimeView) {
        editorPane.activate()
        this.runBlank(runtimeView)
      }
    })
  },

  stepForward() {
    atom.workspace.getActivePaneItem().react.stepForward()
  },

  stepBackward() {
    atom.workspace.getActivePaneItem().react.stepBackward()
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

function fixPath(path) {
  process.env.PWD = path
  process.env.CWD = path
}
