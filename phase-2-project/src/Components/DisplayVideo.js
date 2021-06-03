import React, { Component } from 'react'

export default class DisplayVideo extends Component {

playingVid = ""

  state = {
    count: 0
    // playingVid: this.props.categoryChosen[this.props.randomNum].id
  }

  handleFavorite = (evt) => {
      this.props.newFavorite(this.props.categoryChosen[this.props.randomNum])
  }
  
  handleBack = (evt) => {
    this.setState({
      count: this.state.count + 1,
    })
  }

  handleSkip = (evt) => {
    
    if(this.state.count > 0) {
      this.setState({
        count: this.state.count - 1
      })
    } 
    else {
      this.props.handleChooseCategory(this.props.categoryChosen[this.props.categoryChosen.length-1].snippet.categoryId)
    }
  }

  render() {
    if (this.props.categoryChosen[this.props.randomNum]) {
      this.playingVid = this.props.categoryChosen[this.props.randomNum].id
    }

    return (
      <div>
      {this.props.categoryChosen[this.props.randomNum]?  
     <div>
       <button onClick ={this.handleBack}>
          Back
        </button>
        <iframe src={`https://www.youtube.com/embed/${this.props.watched[this.props.watched.length-1-this.state.count].videoId}`} 
          title='1' allowFullScreen ></iframe> 
          <button onClick={this.handleSkip}>
            Skip
          </button>
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