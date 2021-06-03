import React, { Component } from 'react'


export default class DisplayVideo extends Component {
  
  handleFavorite = (evt) => {
      this.props.newFavorite(this.props.watched[this.props.watched.length-1])
  }
  
  render() {
// console.log(this.props.watched)
    return (
     <div>
        <iframe src={`http://www.youtube.com/embed/${this.props.watched[this.props.watched.length-1].videoId}`}
          title='1' allowFullScreen ></iframe> 
        <br></br>
        <button onClick ={this.handleFavorite}>
            Favorite
        </button>
      </div>
        )

  }
}
