import React, { Component } from 'react'

export default class UserLogin extends Component {
  
  state = {
    username: '',
    password: ''
  }
  
  handleChange = (event) => {
    console.log(event.target.value)
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    fetch(`http://localhost:3000/users?user=${event.target.username.value}`)
    .then(res => res.json())
    .then(potentialArr => {
      if (potentialArr.length > 0) {
        if (potentialArr[0].password === event.target.password.value) {
          this.props.getUserId(potentialArr[0].id)
          alert(`${event.target.username.value} has logged in`)
        } else {
          alert ('Incorrect Password')
        }
        this.setState({
          username: '',
          password: ''
        })
      } else {
        this.setState({
          username: '',
          password: ''
        })
        alert ("Username doesn't exist")
      }
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type='text' value={this.state.username} id='username' name='username' onChange={this.handleChange} placeholder='Enter Username'></input>
          <input type ='password' value={this.state.password} id='password' name='password' onChange={this.handleChange} placeholder='Enter Password'></input>
          <input type='submit' value='login'></input>
        </form>
      </div>
    )
  }
}
