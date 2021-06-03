import React, { Component } from 'react'

export default class UserLogin extends Component {
  
  state = {
    username: '',
    password: '',
    login: true
  }
  
  handleChange = (event) => {
    // console.log(event.target.value)
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleLogin = (event) => {
    event.preventDefault()
    fetch(`http://localhost:3000/users?user=${event.target.username.value}`)
    .then(res => res.json())
    .then(potentialArr => {
      if (potentialArr.length > 0) {
        if (potentialArr[0].password === event.target.password.value) {
          this.props.getUserId(potentialArr[0])
          alert(`${event.target.username.value} has logged in`)
        } else {
          alert ('Incorrect Password')
          this.setState({
            password: ''
          })
        }
      } else {
        this.setState({
          username: '',
          password: ''
        })
        alert ("Username doesn't exist")
      }
    })
  }

  handleNewUser = (event) => {
    event.preventDefault()
    const newUser = {
      user: event.target.username.value,
      password: event.target.password.value,
      watched: [],
      recent: [],
      favorites: []
    }
    console.log(newUser)
    fetch(`http://localhost:3000/users/`, {
      method: "POST",
      headers: {
      "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser)
      })
      .then((r) => r.json())
      .then((user) => {
        alert(`You have created the user ${user.user}!`)
        this.props.getUserId(user)})
        this.setState({
          username: '',
          password: ''
        })
  }

  handleClick = () => {
    const newLogin = !this.state.login
    this.setState({
      login: newLogin
    })
  }

  render() {
    return (
      <div>
        {this.state.login ?
        <div>
          <button onClick={this.handleClick}>New User? Click here!</button>
          <form onSubmit={this.handleLogin}>
            <input type='text' value={this.state.username} id='username' name='username' onChange={this.handleChange} placeholder='Enter Username'></input>
            <input type ='password' value={this.state.password} id='password' name='password' onChange={this.handleChange} placeholder='Enter Password'></input>
            <input type='submit' value='Login'></input>
          </form>
        </div>
        :
        <div>
          <button onClick={this.handleClick}>Existing User? Login Here</button>
          <form onSubmit={this.handleNewUser}>
            <input type='text' value={this.state.username} id='username' name='username' onChange={this.handleChange} placeholder='New Username'></input>
            <input type ='password' value={this.state.password} id='password' name='password' onChange={this.handleChange} placeholder='New Password'></input>
            <input type='submit' value='Create New User'></input>
          </form>
        </div>}
      </div>
    )
  }
}
