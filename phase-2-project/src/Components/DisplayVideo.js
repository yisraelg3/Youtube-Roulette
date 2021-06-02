import React, { Component } from 'react'
import {Redirect, Route} from 'react-router-dom'

export default class DisplayVideo extends Component {
  render() {
    console.log('display Videos rendered')
    return (     
      <div>
        <iframe src={`https://www.youtube.com/embed/${this.props.chosenCategoryVideos[this.props.randomNum].id}`} 
        title='1' allowFullScreen width='800' height='500'></iframe>
      </div> 
    )
                
  }
}
