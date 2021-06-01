import React, { Component } from 'react'

export default class CategoryCard extends Component {
  
  handleClick = (evt) => {
    // debugger
    console.log(this.props.chosenCategoryVideos) 
    this.props.handleChooseCategory(this.props.category.id)
    if (this.props.chosenCategoryVideos.length > 0) {
    this.props.transferVideoId(this.props.chosenCategoryVideos[this.props.randomNum])
    }
  }
  
  render() {
    // console.log(this.props)
    const {snippet} = this.props.category
    return (
      <div onClick ={this.handleClick}>
        <h2>{snippet.title}</h2>
      </div>
    )
  }
}
