import React, { Component } from 'react'

export default class DisplayLists extends Component {
  render() {

    console.log(this.props)

    return (
      <div>
        <iframe src={`https://www.youtube.com/embed/${this.props.videoObj.videoId}`} title='1' allowFullScreen></iframe>
      </div>
    )
  }
}
