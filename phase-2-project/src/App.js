import React from 'react';
import logo from './logo.svg';
import './App.css';
import Categories from './Components/Categories';
import UserLogin from './Components/UserLogin';
import Search from './Components/Search';
import GenerateLists from './Components/GenerateLists';


class App extends React.Component {

  componentDidMount(){
    fetch("http://localhost:3000/pokemon")
    .then(res => res.json())
    .then(pokemonArr => {
      this.setState({
        pokemons: pokemonArr
      })
    })
  }

  render () {
   
    return (
      <div classname="App">
        <UserLogin />
        <Categories />
        <Search />
        <GenerateLists />
      </div>
    )
  }

}


export default App;
