import React, { Component } from 'react'

export default class DisplayVideo extends Component {
  
  
  
  render() {

    let randomNum = Math.floor(Math.random() * (1 + 49 - 0)) + 0
    console.log(randomNum)
    

    return (
      this.props.categoryChosen[randomNum]?  <iframe src={`https://www.youtube.com/embed/${this.props.categoryChosen[randomNum].id}`} title='1' allowFullScreen></iframe> : ""
        )

  }
}
