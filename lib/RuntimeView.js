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
    this.element.classList.add('console')
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
    this.react = ReactDOM.render(React.createElement(OutputList, {output}), this.element)
    fs.writeFile(this.getPath().replace(/([^\/]+)\.([^\/]+$)/g, '.$1.$2.json'), JSON.stringify(this.react.state))
  }

  setStatus(status) {
    this.react = ReactDOM.render(React.createElement(OutputList, {status}), this.element)
  }

  dehydrate() {
    return {
      filePath: this.getPath() || this.filePath,
      editorId: this.editorId,
      state: this.react.state
    }
  }

  hydrate(state) {
    try {
      state = require(this.getPath().replace(/([^\/]+)\.([^\/]+$)/g, '.$1.$2.json'))
      this.react = ReactDOM.render(React.createElement(OutputList, {state}), this.element)
    } catch (error) {}
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
