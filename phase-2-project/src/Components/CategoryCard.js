import React, { Component } from 'react'
import DisplayVideo from './DisplayVideo'
import {Redirect, Route} from 'react-router-dom'

export default class CategoryCard extends Component {
  
  handleClick = (evt) => {
    // debugger
    this.props.handleChooseCategory(this.props.category.id)
    
  }
  
  render() {
    console.log(this.props.chosenCategoryVideos)
    console.log(this.props.randomNum)
    // console.log(this.props)
    const {snippet} = this.props.category
    return (
      <div onClick ={this.handleClick}>
        <h2>{snippet.title}</h2>
        {this.props.chosenCategoryVideos[this.props.randomNum]?  
          <div>
          <Redirect to ={`/categories/${this.props.chosenCategoryVideos[this.props.randomNum].id}`} />
          <Route   path={`/${this.props.routerProps.match.url}/${this.props.chosenCategoryVideos[this.props.randomNum].id}`} 
          render={() =>  {return <DisplayVideo chosenCategoryVideos={this.props.chosenCategoryVideos} 
          randomNum = {this.randomNum} 
          watched={this.props.watched} 
          transferVideoId={this.props.transferVideoId}/>}}/>
          </div> : ""}
      </div>
    )
  }
}
