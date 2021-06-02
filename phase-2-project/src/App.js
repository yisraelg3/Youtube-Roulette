import React from 'react';
// import logo from './logo.svg';
import './App.css';
import Categories from './Components/Categories';
import UserLogin from './Components/UserLogin';
import Search from './Components/Search';
import GenerateLists from './Components/GenerateLists';



class App extends React.Component {
  
  YOUR_API_KEY = 

  state = {
    categories: [],
    watched: [],
    recent: [],
    favorites: []
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
    fetch('http://localhost:3000/users/1')
    .then(res => res.json())
    .then(user => {
      // console.log(this.state)
      this.setState({
      watched: user.watched,
      recent: user.recent,
      favorites: user.favorites
    })})
  }

  transferVideoId = (videoObj) => {
    console.log(this.state)
    console.log(videoObj)
    fetch("http://localhost:3000/users/1", {
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
  
  render () {
    // filter for unavailable categories
   const categoryArr = this.state.categories.filter(category => category.snippet.assignable === true && !category.id.match(/19|29$/))
    return (
      <div className="App">
        <UserLogin />
        <Categories categories={categoryArr} watched={this.state.watched} transferVideoId ={this.transferVideoId}/>
        <Search />
        <GenerateLists header='Recent' list={this.state.recent}/>
        <GenerateLists header='Favorites' list={this.state.favorites}/>
      </div>
    )
  }

}


export default App;
