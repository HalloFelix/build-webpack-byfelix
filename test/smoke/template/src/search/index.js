'use strict'

import React from 'react'
import ReactDom from 'react-dom'
import './search.less'
import '../../common'

class Search extends React.Component {
  render() {
    return <div className="search-text">
            SearchText
            <div className="inner1">文本在这里呀</div>
            <div className="inner2">我是文本22222</div>
          </div>
  }
}
ReactDom.render(
  <Search/>,
  document.getElementById('root')
)