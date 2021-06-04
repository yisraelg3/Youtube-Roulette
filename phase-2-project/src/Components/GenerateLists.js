import React, { Component } from 'react'
import DisplayLists from './DisplayLists'
import { Grid, Header, Icon } from'semantic-ui-react'
import { Redirect } from 'react-router-dom'

export default class GenerateLists extends Component {
  render() {
    if (this.props.userId === 1) {
      return <Redirect to='/'/>
    }
    const videos= this.props.list.map(videoObj => <Grid.Column><DisplayLists key={videoObj.videoId} header={this.props.header} videoObj={videoObj} deleteItem={this.props.deleteItem}/></Grid.Column>)
    return (
      <div>
        <Header as='h1' textAlign='center' >
            <Icon name='youtube' color='red'/>
            <Header.Content>
              Youtube Roulette
              <Header.Subheader>A New YouTube Experience</Header.Subheader>
            </Header.Content>
          </Header> 
        <h1>{this.props.header}</h1>
        <Grid container columns={3} stretched >
        { videos}
        </Grid>
      </div>
    )
  }
}
