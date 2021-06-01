import React, { Component } from 'react'

export default class DisplayVideo extends Component {
  
  
  
  render() {
    

    return (
      this.props.categoryChosen[this.props.randomNum]?  
      <iframe src={`https://www.youtube.com/embed/${this.props.categoryChosen[this.props.randomNum].id}`} 
      title='1' allowFullScreen ></iframe> : ""
        )

  }
}
