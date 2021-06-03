import React, { Component } from 'react'
import DisplayLists from './DisplayLists'

export default class GenerateLists extends Component {
  render() {
    const videos= this.props.list.map(videoObj => <DisplayLists key={videoObj.videoId} header={this.props.header} videoObj={videoObj} deleteItem={this.props.deleteItem}/>)
    return (
      <div>
        <h2>{this.props.header}</h2>
        {videos}
      </div>
    )
  }
}
