{
  CompositeDisposable,
  Disposable,
  Emitter
} = require 'atom'
React = require 'react'
ReactDOM = require 'react-dom'
OutputList = require './OutputList'

module.exports =
class ConsoleRuntimeView

  editor: null
  editorSub: null

  constructor: (state) ->
    if state.editorId?
      @editorId = state.editorId
      @resolveEditor(@editorId)
      @tmpPath = @getPath() # after resolveEditor
    else if state.filePath?
      @filePath = state.filePath
      if atom.workspace?
        @subscribeToFilePath(@filePath)
      else
        atom.packages.onDidActivatePackage =>
          @subscribeToFilePath(@filePath)
    @emitter = new Emitter
    @outputs = []
    # @subscriptions = new CompositeDisposable
    @element = document.createElement('div')
    @element.classList.add('panel-body')
    # ReactDOM.render(React.createElement(OutputList, {name: 'Grant'}), @element)

  render: (output) ->
    @outputs = [@outputs..., output] if output
    ReactDOM.render(React.createElement(OutputList, {outputs: [output]}), @element)

  # addStateChangeListener: (callback) ->
  #   @emitter.on('state-changed', callback)

  # getState: ->
  #   @state

  serialize: ->
    outputs: @outputs

  destroy: ->
    @emitter.emit 'destroy'
    @element.remove()
    @emitter.dispose()

  onDidDestroy: (callback) ->
    @emitter.on 'destroy', callback

  getElement: ->
    @element

  resolveEditor: (editorId) ->
    resolve = =>
      @editor = @editorForId(editorId)
      if @editor?
        # @trigger 'title-changed' if @editor?
        # console.log 'title-changed' if @editor?
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
      @editorSub.add @editor.onDidChangePath => console.log 'title-changed'

  subscribeToFilePath: (filePath) ->
    # @trigger 'title-changed'
    @handleEvents()

  getTitle: ->
      if @editor?
        "#{@editor.getTitle()} Console"
      else
        "Console"

  getURI: ->
    "hyper-console://editor/#{@editorId}"

  getPath: ->
    if @editor?
      @editor.getPath()
