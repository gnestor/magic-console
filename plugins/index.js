'use babel'

// TODO: Dynamically create plugin index
// TODO: Sort plugins by propType specificity

// import JSONTree from 'react-json-tree'
// import JSONInspector from 'react-json-inspector'
// import ObjectInspector from 'react-object-inspector'
import ObjectTree from './ObjectTree'
import Markdown from './Markdown'
import ReactComponent from './ReactComponent'
import Raw from './Raw'
import LineChart from './LineChart'

// Default Plugins
// export Output from './Output'
// export OutputList from './OutputList'

// Plugins
// export JSONTree from 'react-json-tree'
// export JSONInspector from 'react-json-inspector'
// export ObjectInspector from 'react-object-inspector'
// export ReactMarkdown from 'react-markdown'
// export Markdown from './Markdown'

export const plugins = [
  LineChart,
  ReactComponent,
  ObjectTree,
  Markdown,
  Raw
]
