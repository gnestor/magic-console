'use babel'

import {
  CompositeDisposable,
  Disposable,
  Emitter
} from 'atom'
import fs from 'fs'
import React from 'react'
import ReactDOM from 'react-dom'
import OutputList from './OutputList'

export default class ConsoleRuntimeView {

  constructor({filePath, editorId, state}) {
    this.filePath = filePath
    this.editorId = editorId
    this.emitter = new Emitter
    this.element = document.createElement('div')
    this.element.classList.add('console', 'native-key-bindings')
    this.element.tabIndex = -1
    if (this.editorId) {
      this.editor = atom.workspace.getTextEditors().find(editor => editor.id.toString() === this.editorId)
      this.editorSub = new CompositeDisposable
      this.editorSub.add(
        this.editor.onDidChangePath(ev => {
          this.filePath = this.editor.getPath()
        })
      )
      this.editorSub.add(
        this.editor.onDidSave(ev => {
          this.emitter.emit('save', ev)
        })
      )
      this.editorSub.add(
        this.editor.onDidDestroy(() => {
          this.destroy()
        })
      )
    }
    this.hydrate(state)
  }

  render(output) {
    this.react = ReactDOM.render(React.createElement(OutputList, {
      output,
      filepath: this.getPath().replace(/([^\/]+)\.([^\/]+$)/g, '.$1.$2.json')
    }), this.element)
    let {
      outputs,
      started,
      stopped
    } = this.react.state
    fs.writeFile(this.getPath().replace(/([^\/]+)\.([^\/]+$)/g, '.$1.$2.json'), JSON.stringify({
      outputs,
      started,
      stopped
    }, null, 2))
  }

  setStatus(status) {
    this.react = ReactDOM.render(React.createElement(OutputList, {
      status,
      filepath: this.getPath().replace(/([^\/]+)\.([^\/]+$)/g, '.$1.$2.json')
    }), this.element)
  }

  hydrate() {
    try {
      let filepath = this.getPath().replace(/([^\/]+)\.([^\/]+$)/g, '.$1.$2.json')
      let state = require(filepath)
      this.react = ReactDOM.render(React.createElement(OutputList, {
        state,
        filepath
      }), this.element)
    } catch (error) {}
  }

  dehydrate() {
    let {
      outputs,
      started,
      stopped
    } = this.react.state
    return {
      filePath: this.getPath() || this.filePath,
      editorId: this.editorId,
      state: {
        outputs,
        started,
        stopped
      }
    }
  }

  destroy() {
    this.element.remove()
    this.emitter.emit('destroy')
    this.emitter.dispose()
  }

  onDidDestroy(callback) {
    return this.emitter.on('destroy', callback)
  }

  onDidSave(callback) {
    return this.emitter.on('save', callback)
  }

  getElement() {
    return this.element
  }

  getTitle() {
    if (this.editor) return `${this.editor.getTitle()} Output`
    return 'Output'
  }

  getURI() {
    return `magic-console://editor/${this.editorId}`
  }

  getPath() {
    if (this.editor) return this.editor.getPath()
    return this.filePath
  }

  // resolveEditor(editorId) {
  //   const resolve = () => {
  //     this.editor = atom.workspace.getTextEditors().find(editor => editor.id === this.editorId)
  //     if (this.editor) {
  //       this.handleEvents()
  //     } else {
  //       if (atom.workspace) {
  //         if (atom.workspace.paneForItem(this)) atom.workspace.paneForItem(this).destroyItem(this)
  //       }
  //     }
  //   }
  //   if (atom.workspace) {
  //     resolve()
  //   } else {
  //     atom.packages.onDidActivatePackage(() => {
  //       resolve()
  //       this.render()
  //     })
  //   }
  // }

}
