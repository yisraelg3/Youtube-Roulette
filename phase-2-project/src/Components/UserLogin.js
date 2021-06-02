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
    this.props.getUserId(event)
    this.setState({
      username: '',
      password: ''
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
