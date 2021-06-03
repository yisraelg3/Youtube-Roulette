import React from 'react';
// import logo from './logo.svg';
import './App.css';
import Categories from './Components/Categories';
import UserLogin from './Components/UserLogin';
import Search from './Components/Search';
import GenerateLists from './Components/GenerateLists';
import NavBar from './Components/NavBar'
import { Route, Switch, Redirect } from 'react-router-dom'
import { Button, Icon, Label, Header } from 'semantic-ui-react'


class App extends React.Component {
  
  YOUR_API_KEY = "AIzaSyBL7hy0u6_uaA_ZyIj2zDig7NEkX-60S0Q"

  state = {
    categories: [],
    watched: [],
    recent: [],
    favorites: [],
    userId: 1,
    whatUserTyped: "",
    userName: ""
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
    this.setState({
      watched: user.watched,
      recent: user.recent,
      favorites: user.favorites,
      userId: user.id,
      userName: user.user
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
    console.log(videoObj)
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
    
    logout = () => {
      // console.log(this.state.userId)
      this.setState({userId: 1})
    }

  render  () {
    const redirect = () => {
      if (this.state.userId > 1) {
      return  (
      <>
      <Route path='/' render={routerProps => <NavBar logout={this.logout}/>}/>
      <Switch>
      <Redirect from='/' to='/categories'/> 
      </Switch>
      </>)
      }
    }
    
   // filter for Search
   let filteredCategories = this.state.categories.filter((categoryObj, idx) => {
      return categoryObj.snippet.title.toLowerCase().includes(this.state.whatUserTyped.toLowerCase())
    })
    
    console.log(this.state.userId)
    // console.log(timesCategoryWatched)
   return (
      <div className="App">
        {this.state.userId !== 1 ?
        <div>
        {redirect()}
        <Route path='/categories' render={routerProps => { return(
        <>
        <Button as='div' labelPosition='left' floated='right' >
          <Label as='a' basic>
            {this.state.userName}
          </Label>
          <Button onClick = {() => this.setState({ userId: 1})}>
            Logout
          </Button>
        </Button> 
        <Header as='h1' textAlign='center'>
          <Icon name='youtube' color='red'/>
          <Header.Content>
            Youtube Roulette
            <Header.Subheader>A New YouTube Experience</Header.Subheader>
          </Header.Content>
        </Header> 
        <Search whatUserTyped={this.state.whatUserTyped} changeSearchTerm={this.changeSearchTerm}/>
        <Categories categories={filteredCategories} watched={this.state.watched} 
        transferVideoId ={this.transferVideoId} newFavorite={this.newFavorite} userId={this.state.userId}/>
        </>)}}/>
        <Route exact path='/' render={routerProps => <UserLogin userId={this.state.userId} getUserId={this.getUserId}/> }/> 
        <Route path='/recent' render={routeProps => <GenerateLists header='Recent' list={this.state.recent} deleteItem={this.deleteItem}/>}/>
        <Route path='/favorites' render={routerProps => <GenerateLists header='Favorites' list={this.state.favorites} deleteItem={this.deleteItem}/>}/>

        </div>
        : 
        <UserLogin getUserId={this.getUserId}/> }
      </div> 
    )
  }

}


export default App;
