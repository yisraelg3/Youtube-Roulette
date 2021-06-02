import React, { Component } from 'react'
import {Redirect, Route} from 'react-router-dom'

export default class DisplayVideo extends Component {
  
  handleFavorite = (evt) => {
      this.props.newFavorite(this.props.categoryChosen[this.props.randomNum])
  }
  
  render() {


    return (
      <div>
      {this.props.categoryChosen[this.props.randomNum]?  
     <div>
        <iframe src={`https://www.youtube.com/embed/${this.props.categoryChosen[this.props.randomNum].id}`} 
          title='1' allowFullScreen ></iframe> 
        <br></br>
        <button onClick ={this.handleFavorite}>
            Favorite
        </button>
      </div>
      : ""}
      </div>
     
        )

  }
}
