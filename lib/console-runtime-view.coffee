{CompositeDisposable, Disposable, Emitter} = require 'atom'
fs = require 'fs'
React = require 'react'
ReactDOM = require 'react-dom'
OutputList = require './OutputList'

module.exports =
class ConsoleRuntimeView

  constructor: ({@filePath, @editorId, data}) ->
    @emitter = new Emitter
    @element = document.createElement('div')
    @element.classList.add('console')
    if @editorId?
      @resolveEditor(@editorId)
    else if @filePath?
      @handleEvents()
    if data?
      @hydrate(data)
    else
      try
        data = require(@getPath().replace(/([^\/]+)\.([^\/]+$)/g, '.$1.json'))
        @hydrate(data)
      catch error
        console.log(error)

  render: (output) ->
    @react = ReactDOM.render(React.createElement(OutputList, {output}), @element)
    fs.writeFile(@getPath().replace(/([^\/]+)\.([^\/]+$)/g, '.$1.json'), JSON.stringify(@react.state))

  setStatus: (status) ->
    @react = ReactDOM.render(React.createElement(OutputList, {status}), @element)

  hydrate: (state) ->
    @react = ReactDOM.render(React.createElement(OutputList, {state}), @element)

  dehydrate: ->
    filePath: @getPath() ? @filePath
    editorId: @editorId
    data: @react.state

  destroy: ->
    @emitter.emit 'destroy'
    @element.remove()
    @emitter.dispose()

  onDidDestroy: (callback) ->
    @emitter.on 'destroy', callback

  onDidSave: (callback) ->
    @emitter.on 'save', callback

  getElement: ->
    @element

  resolveEditor: (editorId) ->
    resolve = =>
      @editor = @editorForId(editorId)
      if @editor?
        @handleEvents()
      else
        # The editor this preview was created for has been closed so close
        # this preview since a preview cannot be rendered without an editor
        atom.workspace?.paneForItem(this)?.destroyItem(this)
    if atom.workspace?
      resolve()
    else
      atom.packages.onDidActivatePackage =>
        resolve()
        @render()

  editorForId: (editorId) ->
    for editor in atom.workspace.getTextEditors()
      return editor if editor.id?.toString() is editorId.toString()
    null

  handleEvents: =>
    @editorSub = new CompositeDisposable
    if @editor?
      @editorSub.add @editor.onDidChangePath (ev) =>
        @filePath = @editor.getPath
      @editorSub.add @editor.onDidSave (ev) =>
        @emitter.emit 'save', ev
      @editorSub.add @editor.onDidDestroy =>
        @destroy()

  getTitle: ->
    if @editor?
      "#{@editor.getTitle()} Output"
    else
      "Output"

  getURI: ->
    "magic-console://editor/#{@editorId}"

  getPath: ->
    if @editor?
      @editor.getPath()
