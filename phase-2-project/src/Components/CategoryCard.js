import React, { Component } from 'react'

export default class CategoryCard extends Component {
  render() {
    const {snippet} = this.props.category
    return (
      <div >
        <h2>{snippet.title}</h2>
      </div>
    )
  }
}
