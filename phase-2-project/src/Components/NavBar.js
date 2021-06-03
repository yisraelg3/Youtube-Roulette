import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

export default class NavBar extends Component {
  render() {
    return (
      <div>
        <NavLink to='/categories' style={{ marginRight: '30px' }} activeClassName="active" activeStyle={{fontWeight: "bold", color: "blue"}}>Categories</NavLink>
        <NavLink to='/recent' style={{ marginRight: '30px' }} activeClassName="active" activeStyle={{fontWeight: "bold", color: "blue"}}>Recent</NavLink>
        <NavLink to='/favorites' style={{ marginRight: '30px' }} activeClassName="active" activeStyle={{fontWeight: "bold", color: "blue"}}>Favorites</NavLink>
        <NavLink to='/' style={{ marginRight: '30px' }} onClick={this.props.logout}> Logout</NavLink>
      </div>
    )
  }
}
