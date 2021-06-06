import React, { Component } from 'react'
import { Button, Icon } from 'semantic-ui-react'
import { Redirect } from 'react-router-dom'

export default class DisplayVideo extends Component {

playingVid = ""

  state = {
    count: 0
    // playingVid: this.props.categoryChosen[this.props.randomNum].id
  }

  handleFavorite = (evt) => {
      this.props.newFavorite(this.props.watched[this.props.watched.length-1-this.state.count])
  }
  
  handleBack = (evt) => {
    console.log(this.props.watched[this.props.watched.length-1-this.state.count])
    if (this.props.watched.length-1-this.state.count === 0) {
      return
    }
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
      this.props.handleChooseCategory(this.props.watched[this.props.watched.length-1-this.state.count].category)
    }
  }

  render() {
    // if (this.props.categoryChosen[this.props.randomNum]) {
    //   this.playingVid = this.props.categoryChosen[this.props.randomNum].id
    // }

    return (
      <div>
      
     <div className="videoPlayer">
        {/* <Button animated onClick ={this.handleBack} basic color='black' size='medium'>
          <Button.Content visible>Back</Button.Content>
          <Button.Content hidden>
            <Icon name='arrow left' />
          </Button.Content>
        </Button> */}
        <Redirect to={`/categories/${this.props.watched[this.props.watched.length-1-this.state.count].videoId}`}/>
 <iframe src={`https://www.youtube.com/embed/${this.props.watched[this.props.watched.length-1-this.state.count].videoId}?autoplay=1`} 
          title='1' allow="autoplay; fullscreen" width='900' height='600'></iframe> 
        {/* <Button animated onClick ={this.handleSkip} basic color='black' size='medium'>
          <Button.Content visible>Next</Button.Content>
          <Button.Content hidden>
            <Icon name='arrow right' />
          </Button.Content>
        </Button> */}
        <br></br>
        {/* <Button animated='fade' onClick ={this.handleFavorite} basic color='black' size='medium'>
          <Button.Content visible>Favorite</Button.Content>
          <Button.Content hidden>
            <Icon name='heart' color='red'/>
          </Button.Content>
        </Button> */}
        <Button.Group>
          <Button labelPosition='left' icon='left chevron' content='Back' onClick ={this.handleBack} basic color='black' size='large'
          disabled={0 === this.props.watched.length-1-this.state.count}/>
          <Button animated='fade' onClick ={this.handleFavorite} size='large' basic color='black'>
            <Button.Content visible>Favorite</Button.Content>
            <Button.Content hidden>
              <Icon name='heart' color='red'/>
            </Button.Content>
          </Button>
          <Button labelPosition='right' icon='right chevron' content={this.state.count === 0 ? 'New Video' : 'Forward'} onClick ={this.handleSkip} basic color='black' size='large'/>
        </Button.Group>
  
        <br></br>
      </div>
      

      </div>
     
        )

  }
}


