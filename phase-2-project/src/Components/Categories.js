import React, { Component } from 'react'
import CategoryCard from './CategoryCard'
import DisplayVideo from './DisplayVideo'

export default class Categories extends Component {

   YOUR_API_KEY = 

    state = {
      chosenCategoryVideos: [],
      randomNum: ""
    }

    handleChooseCategory = (category) => {
      // console.log(category)
      fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&regionCode=US&videoCategoryId=${category}&maxResults=50&key=${this.YOUR_API_KEY}`)
      .then(res => res.json())
      .then(chosenCategoryArray => {
        this.setState({
          chosenCategoryVideos: chosenCategoryArray.items,
          randomNum: Math.floor(Math.random() * this.state.chosenCategoryVideos.length)
        })})

    
        
    //     this.props.transferVideoId(categoryChosen[this.props.randomNum])
     }
  
    render() {
    // console.log(this.props.categories)
    const categoryCards = this.props.categories.map(category => <CategoryCard handleChooseCategory={this.handleChooseCategory} category={category} key={category.id}/>)
    
    

    return (
      <div>
         <DisplayVideo categoryChosen={this.state.chosenCategoryVideos} randomNum = {this.state.randomNum} watched={this.props.watched} transferVideoId={this.props.transferVideoId}/>
        {categoryCards}
      </div>
    )
  }
}
