import React from 'react';
// import logo from './logo.svg';
import './App.css';
import Categories from './Components/Categories';
import UserLogin from './Components/UserLogin';
import Search from './Components/Search';
import GenerateLists from './Components/GenerateLists';
import {Route} from 'react-router-dom'



class App extends React.Component {
  
  YOUR_API_KEY = "AIzaSyBtTrBQ5N39_5eeq5FItBh0C2I8a6XRcUk"

  state = {
    categories: [],
    watched: [],
    recent: [],
    favorites: [],
    userId: 0
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
    fetch(`http://localhost:3000/users/${this.state.userId}`)
    .then(res => res.json())
    .then(user => {
      // console.log(this.state)
      this.setState({
      watched: user.watched,
      recent: user.recent,
      favorites: user.favorites
    })})
  }

  getUserId = (event) => {
    const password = event.target.password.value
    fetch(`http://localhost:3000/users?user=${event.target.username.value}`)
    .then(res => res.json())
    .then(potentialArr => {
      if (potentialArr.length > 0) {
        console.log(potentialArr[0])
        if (potentialArr[0].password === password) {
          alert(`${potentialArr[0].user} has logged in`)
        fetch(`http://localhost:3000/users/${potentialArr[0].id}`)
        .then(res => res.json())
        .then(user => {
          // console.log(this.state)
          this.setState({
          watched: user.watched,
          recent: user.recent,
          favorites: user.favorites,
          userId: potentialArr[0].id
        })})
      } else {
        alert ('Incorrect Password')
      }
    } else {
      alert ("Username doesn't exist")
    }
    })
  }

  transferVideoId = (videoObj) => {
    console.log(this.state)
    console.log(videoObj)
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
  
  render () {
    // filter for unavailable categories
   const categoryArr = this.state.categories.filter(category => category.snippet.assignable === true && !category.id.match(/19|29$/))
    return (
      <div className="App">
        {this.state.userId !== 0 ?
        <div>
          <button onClick = {() => this.setState({ userId: 0})}> Logout </button>
          <Route exact path ='/search' render={routerProps => <Search {...routerProps} whatUserTyped={this.state.whatUserTyped} changeSearchTerm={this.changeSearchTerm}/>} />
          <Route exact path ='/categories' render={routerProps => <Categories {...routerProps} categories={categoryArr} watched={this.state.watched} transferVideoId ={this.transferVideoId} newFavorite={this.newFavorite}/>} />
          <Route exact path ='/recent' render={routerProps => <GenerateLists header='Recent' list={this.state.recent}/> }/>
          <Route exact path ='/favorites' render={routerProps => <GenerateLists header='Favorites' list={this.state.favorites}/>} />
        </div>
        : <Route exact path ='/' render={routerProps => <UserLogin {...routerProps} getUserId={this.getUserId}/>}/>}
      </div>
    )
  }

}


export default App;
