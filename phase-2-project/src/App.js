import React from 'react';
// import logo from './logo.svg';
import './App.css';
import Categories from './Components/Categories';
import UserLogin from './Components/UserLogin';
import Search from './Components/Search';
import GenerateLists from './Components/GenerateLists';



class App extends React.Component {
  
  YOUR_API_KEY = ""

  state = {
    categories: [],
    watched: [],
    recent: [],
    favorites: [],
    userId: 1,
    whatUserTyped: ""
  }
  
  componentDidMount(){
    fetch(`https://youtube.googleapis.com/youtube/v3/videoCategories?part=snippet&regionCode=US&key=${this.YOUR_API_KEY}`)
    .then(res => res.json())
    .then(categoryObj => {
      // console.log(categoryObj)
      //filter for unavailable categories
      const categoryArr = categoryObj.items.filter(category => category.snippet.assignable === true && !category.id.match(/19|29$/))
      this.setState({
        categories: categoryArr
      })
    })
  }

  getUserId = (user) => {
    // console.log(this.state)
    this.setState({
      watched: user.watched,
      recent: user.recent,
      favorites: user.favorites,
      userId: user.id
    })
  }

  transferVideoId = (videoObj,category) => {
    // console.log(this.state)
    // console.log(videoObj)
    fetch(`http://localhost:3000/users/${this.state.userId}`, {
      method: "PATCH",
      headers: {
      "Content-Type": "application/json",
      },
      body: JSON.stringify({
        watched: [...this.state.watched,  {
          title: videoObj.snippet.title,
          timesWatched: 1,
          category: category,
          videoId: videoObj.id}],
        recent: [...this.state.recent, {
          title: videoObj.snippet.title,
          videoId: videoObj.id}]
        })
        })
      .then((r) => r.json())
      .then((userObj) => {
        this.setState({
          watched: userObj.watched,
          recent: userObj.recent
        })})
  }

  
  newFavorite = (videoObj) => {
    if (this.state.favorites.some(video => video.videoId === videoObj.videoId)) {
      alert('Video already in Favorites')
      return
    }
    fetch(`http://localhost:3000/users/${this.state.userId}`, {
      method: "PATCH",
      headers: {
      "Content-Type": "application/json",
      },
      body: JSON.stringify({
        favorites: [...this.state.favorites, {
          title: videoObj.title,
          videoId: videoObj.videoId}]
        })
        })
      .then((r) => r.json())
      .then((userObj) => {
        this.setState({
          favorites: userObj.favorites
        })})
  }

  deleteItem = (listName, videoObj) => {
    const list = listName.toLowerCase()
    fetch(`http://localhost:3000/users/${this.state.userId}`, {
      method: "PATCH",
      headers: {
      "Content-Type": "application/json",
      },
      body: JSON.stringify({
        [list]: this.state[list].filter(video => video.videoId !== videoObj.videoId)
        })
      })
      .then((r) => r.json())
      .then((userObj) => {
        this.setState({
          [list]: userObj[list]
        })})
  }
  
  changeSearchTerm = (newTerm) => {
    this.setState({
      whatUserTyped: newTerm
    })}

  render  () {
   // filter for Search
   let filteredCategories = this.state.categories.filter((categoryObj, idx) => {
      return categoryObj.snippet.title.toLowerCase().includes(this.state.whatUserTyped.toLowerCase())
    })
    
    // console.log(timesCategoryWatched)
   return (
      <div className="App">
        {this.state.userId !== 1 ?
        <div>
        <button onClick = {() => this.setState({ userId: 1})}> Logout </button>
        <Search whatUserTyped={this.state.whatUserTyped} changeSearchTerm={this.changeSearchTerm}/>
        <Categories categories={filteredCategories} watched={this.state.watched} transferVideoId ={this.transferVideoId} newFavorite={this.newFavorite}/>
        <GenerateLists header='Recent' list={this.state.recent} deleteItem={this.deleteItem}/>
        <GenerateLists header='Favorites' list={this.state.favorites} deleteItem={this.deleteItem}/>
        </div>
        : <UserLogin getUserId={this.getUserId}/> }
      </div> 
    )
  }

}


export default App;
