import React, { Component } from 'react'

export default class CategoryCard extends Component {
  
  handleClick = (evt) => {
    // debugger
    this.props.handleChooseCategory(this.props.category.id)
    
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
