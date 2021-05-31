import React from 'react';
// import logo from './logo.svg';
import './App.css';
import Categories from './Components/Categories';
import UserLogin from './Components/UserLogin';
import Search from './Components/Search';
import GenerateLists from './Components/GenerateLists';
import DisplayVideo from './Components/DisplayVideo'



class App extends React.Component {
  

  state = {
    categories: [],
    chosenCategoryVideos: []
  }
  
  componentDidMount(){
    fetch(`https://youtube.googleapis.com/youtube/v3/videoCategories?part=snippet&regionCode=US&key=${this.YOUR_API_KEY}`)
    .then(res => res.json())
    .then(categoryObj => {
      console.log(categoryObj)
      this.setState({
        categories: categoryObj.items
      })
    })
  }
  // ${category}
  handleChooseCategory = (category) => {
    fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&regionCode=US&videoCategoryId=1&maxResults=50&key=${this.YOUR_API_KEY}`)
    .then(res => res.json())
    .then(chosenCategoryArray => {console.log(chosenCategoryArray.items)
      this.setState({
        chosenCategoryVideos: chosenCategoryArray.items
      })})
  }
  render () {
    // this.handleChooseCategory()
    return (
      <div className="App">
        <UserLogin />
        <Categories categories={this.state.categories} />
        <Search />
        <GenerateLists />
        <DisplayVideo categoryChosen={this.state.chosenCategoryVideos}/>
      </div>
    )
  }

}


export default App;
