import React, { Component } from 'react'

export default class CategoryCard extends Component {
  
  handleClick = (evt) => {
    // console.log(this.props.category.id)
    this.props.handleChooseCategory(this.props.category.id)
    
  }
  
  render() {
    
    const {snippet,timesWatched} = this.props.category
    return (
      <div onClick ={this.handleClick}>
        <h2>{snippet.title}</h2>
        {this.props.sorted ? <p>Chosen {timesWatched} times</p> : ''}
      </div>
    )
  }
}
