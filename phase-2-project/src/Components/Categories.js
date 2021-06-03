import React, { Component } from 'react'
import CategoryCard from './CategoryCard'
import DisplayVideo from './DisplayVideo'

export default class Categories extends Component {

   YOUR_API_KEY = ""
    
   randomNum = ''
   state = {
      chosenCategoryVideos: [],
      sorted: false
    }

    handleChooseCategory = (category) => {
      // console.log(category)
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
        this.props.transferVideoId(unwatchedList[this.randomNum],category)
        this.setState({
          chosenCategoryVideos: unwatchedList,
        })})

     }
  
     handleChange= () => {
       const newSort = !this.state.sorted
       this.setState({sorted: newSort})
     }

    render() {
    // Logic for sorting by most times chosen
    const timesCategoryWatched = this.state.sorted ?
    this.props.categories.map(category => {
      return(
        Object.assign({}, category, {timesWatched:
        (this.props.watched.some(videoObj => videoObj.category === category.id)?
        this.props.watched.filter(videoObj => videoObj.category === category.id)
        .reduce((accum, videoObj) => videoObj.timesWatched + accum, 0) : 0)}
        )
      )
    }).sort(((a, b) => b.timesWatched - a.timesWatched))
    : this.props.categories
    
    //Create each Category Card 
    const categoryCards = timesCategoryWatched.map(category => {
      return <CategoryCard 
        handleChooseCategory={this.handleChooseCategory} 
        category={category} 
        key={category.id}
        transferVideoId={this.props.transferVideoId}
        chosenCategoryVideos={this.state.chosenCategoryVideos}
        sorted={this.state.sorted}
      />
    })
    
    
    return (
      <div>
       <DisplayVideo categoryChosen={this.state.chosenCategoryVideos} 
        randomNum = {this.randomNum} 
        watched={this.props.watched} 
        transferVideoId={this.props.transferVideoId}
        handleChooseCategory={this.handleChooseCategory}
        newFavorite={this.props.newFavorite}/>
        <label htmlFor='sort'>Sort by Most Watched</label>
        <input type='checkbox' checked={this.state.sorted} onChange={this.handleChange} id='sort'></input>
        {categoryCards}
      </div>
    )
  }
}
