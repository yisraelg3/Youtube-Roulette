import React, { Component } from 'react'
import DisplayLists from './DisplayLists'

export default class GenerateLists extends Component {
  render() {
    console.log(this.props)
    const videos= this.props.list.map(videoObj => <DisplayLists header={this.props.header} videoObj={videoObj}/>)
    return (
      <div>
        <h2>{this.props.header}</h2>
        {videos}
      </div>
    )
  }
}
