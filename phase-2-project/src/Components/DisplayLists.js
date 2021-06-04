import React, { Component } from 'react'
import { Button, Icon } from'semantic-ui-react'

export default class DisplayLists extends Component {
 
    handleClick = (event) => {
      this.props.deleteItem(this.props.header, this.props.videoObj)
    }
    render() {
    return (
      <div>
        <br/>
        <iframe src={`https://www.youtube.com/embed/${this.props.videoObj.videoId}`} title='1' allowFullScreen
        width='350' height='225'></iframe>
        <br/>
        <p>{this.props.videoObj.title}</p>
        <Button animated='fade' onClick ={this.handleClick} size='mini' basic color='black'>
            <Button.Content visible>Remove from {this.props.header}</Button.Content>
            <Button.Content hidden>
              <Icon name='trash' color='black'/>
            </Button.Content>
          </Button>
        {/* <button onClick={this.handleClick}>Remove from {this.props.header}</button> */}
      </div>
    )
  }
}
