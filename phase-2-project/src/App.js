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
  
  render () {
   const categoryArr = this.state.categories.filter(category => category.snippet.assignable === true && !category.id.match(/19|29$/))
    return (
      <div className="App">
        <UserLogin />
        <Categories categories={categoryArr} />
        <Search />
        <GenerateLists />
      </div>
    )
  }

}


export default App;
