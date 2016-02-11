'use babel'

import React, {Component, PropTypes} from 'react'
import Remarkable from 'remarkable'
import hljs from 'highlight.js'

class Markdown extends Component {

  render() {
    const md = new Remarkable('full', {
      html: true,
      linkify: true,
      typographer: true,
      quotes: '“”‘’',
      langPrefix: 'language-',
      highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
          try {
            return hljs.highlight(lang, str).value
          } catch (error) {}
        }
        try {
          return hljs.highlightAuto(str).value
        } catch (error) {}
        return ''
      }
    })
    return (
      <div className="markdown" dangerouslySetInnerHTML={{__html: md.render(this.props.data)}}></div>
    )
  }

}

Markdown.propTypes = {
  data: PropTypes.string.isRequired
}

export default Markdown
