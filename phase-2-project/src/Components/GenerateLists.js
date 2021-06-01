import React, { Component } from 'react'
import DisplayLists from './DisplayLists'

export default class GenerateLists extends Component {
  render() {
    const videos= this.props.list.map(videoId => <DisplayLists header={this.props.header} videoId={videoId}/>)
    return (
      <div>
        <h2>{this.props.header}</h2>
        {videos}
      </div>
    )
  }
}
