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
      this.setState({
        categories: categoryObj.items
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

  transferVideoId = (videoObj) => {
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
          category: videoObj.snippet.categoryId,
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
    fetch(`http://localhost:3000/users/${this.state.userId}`, {
      method: "PATCH",
      headers: {
      "Content-Type": "application/json",
      },
      body: JSON.stringify({
        favorites: [...this.state.favorites, {
          title: videoObj.snippet.title,
          videoId: videoObj.id}]
        })
        })
      .then((r) => r.json())
      .then((userObj) => {
        this.setState({
          favorites: userObj.favorites
        })})
  }
  
  changeSearchTerm = (newTerm) => {
    this.setState({
      whatUserTyped: newTerm
    })}


  render () {
    // console.log(this.state)
    // filter for unavailable categories
   const categoryArr = this.state.categories.filter(category => category.snippet.assignable === true && !category.id.match(/19|29$/))
    // console.log(categoryArr.snippet)
 
   let filteredCategories = categoryArr.filter((categoryObj, idx) => {
      return categoryObj.snippet.title.toLowerCase().includes(this.state.whatUserTyped.toLowerCase())
    })
   
   return (
      <div className="App">
        {this.state.userId !== 1 ?
        <div>
        <button onClick = {() => this.setState({ userId: 1})}> Logout </button>
        <Search whatUserTyped={this.state.whatUserTyped} changeSearchTerm={this.changeSearchTerm}/>
        <Categories categories={filteredCategories} watched={this.state.watched} transferVideoId ={this.transferVideoId} newFavorite={this.newFavorite}/>
        <GenerateLists header='Recent' list={this.state.recent}/>
        <GenerateLists header='Favorites' list={this.state.favorites}/>
        </div>
        : <UserLogin getUserId={this.getUserId}/> }
      </div> 
    )
  }

}


export default App;
