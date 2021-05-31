import React, { Component } from 'react'

export default class DisplayVideo extends Component {
  render() {
    return (
        <iframe src={`https://www.youtube.com/embed/${this.props.categoryChosen[0].id}`} title='1' allowFullScreen></iframe>
    )
  }
}
