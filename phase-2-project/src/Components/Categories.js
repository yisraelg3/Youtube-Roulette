import React, { Component } from 'react'
import CategoryCard from './CategoryCard'
import DisplayVideo from './DisplayVideo'

export default class Categories extends Component {

   YOUR_API_KEY = 

    state = {
      chosenCategoryVideos: []
    }

    handleChooseCategory = (category) => {
      console.log(category)
      fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&regionCode=US&videoCategoryId=${category}&maxResults=50&key=${this.YOUR_API_KEY}`)
      .then(res => res.json())
      .then(chosenCategoryArray => {console.log(chosenCategoryArray.items)
        this.setState({
          chosenCategoryVideos: chosenCategoryArray.items
        })})
    }
  
    render() {
    console.log(this.props.categories)
    const categoryCards = this.props.categories.map(category => <CategoryCard handleChooseCategory={this.handleChooseCategory} category={category} key={category.id}/>)

    return (
      <div>
         <DisplayVideo categoryChosen={this.state.chosenCategoryVideos} watched={this.props.watched}/>
        {categoryCards}
      </div>
    )
  }
}
