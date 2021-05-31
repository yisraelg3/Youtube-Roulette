import React, { Component } from 'react'
import CategoryCard from './CategoryCard'

export default class Categories extends Component {
  
    render() {
    console.log(this.props.categories)
    const categoryCards = this.props.categories.map(category => <CategoryCard category={category} key={category.id}/>)

    return (
      <div>
        {categoryCards}
      </div>
    )
  }
}
