import React, { Component } from 'react'
import CategoryCard from './CategoryCard'
import DisplayVideo from './DisplayVideo'


export default class Categories extends Component {

   YOUR_API_KEY = "AIzaSyBtTrBQ5N39_5eeq5FItBh0C2I8a6XRcUk"
    
   randomNum = ''
   state = {
      chosenCategoryVideos: [],
    }

    handleChooseCategory = (category) => {
      fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&regionCode=US&videoCategoryId=${category}&maxResults=50&key=${this.YOUR_API_KEY}`)
      .then(res => res.json())
      .then(chosenCategoryArray => {
        // console.log(chosenCategoryArray)
        const unwatchedList = chosenCategoryArray.items.filter(videoObj => {
          return !this.props.watched.find(watchedVideo => videoObj.id === watchedVideo.videoId)
        })
        // console.log(unwatchedList)
        this.randomNum = Math.floor(Math.random() * unwatchedList.length)
        // console.log('Click arguments',category,this.randomNum)
        this.props.transferVideoId(unwatchedList[this.randomNum])
        this.setState({
          chosenCategoryVideos: unwatchedList,
        })})

     }
  
    render() {
    // console.log(this.props.categories)

    // console.log('render',this.randomNum)
    
    const categoryCards = this.props.categories.map(category => {
      return <CategoryCard 
        handleChooseCategory={this.handleChooseCategory} 
        category={category} key={category.id}
        transferVideoId={this.props.transferVideoId}
        chosenCategoryVideos={this.state.chosenCategoryVideos}
        randomNum={this.randomNum}
        watched={this.props.watched}
        routerProps={this.props.routerProps}
      />
    })
    
    return (
      <div>
         <DisplayVideo categoryChosen={this.state.chosenCategoryVideos} 
         randomNum = {this.randomNum} 
         watched={this.props.watched} 
         transferVideoId={this.props.transferVideoId}
         newFavorite={this.props.newFavorite}
         />
        {categoryCards}
      </div>
    )
  }
}
