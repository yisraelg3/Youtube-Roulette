import React, { Component } from 'react'

export default class DisplayLists extends Component {
 
    handleClick = (event) => {
      this.props.deleteItem(this.props.header, this.props.videoObj)
    }
    render() {
    return (
      <div>
        <iframe src={`https://www.youtube.com/embed/${this.props.videoObj.videoId}`} title='1' allowFullScreen></iframe>
        <br/>
        <button onClick={this.handleClick}>Remove from {this.props.header}</button>
      </div>
    )
  }
}
