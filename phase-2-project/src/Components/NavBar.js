import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

export default class NavBar extends Component {
  render() {
    return (
      <div>
        <NavLink to='/categories' style={{ marginRight: '50px', marginLeft: '30px', fontSize: '15pt', color:'black' }} activeClassName="active" activeStyle={{fontWeight: "bold", color: "black"}}>Categories</NavLink>
        <NavLink to='/recent' style={{ marginRight: '50px', fontSize: '15pt', paddingTop: '30px', color:'black' }} activeClassName="active" activeStyle={{fontWeight: "bold", color: "black"}}>Recent</NavLink>
        <NavLink to='/favorites' style={{ marginRight: '50px', fontSize: '15pt', paddingTop: '30px', color:'black' }} activeClassName="active" activeStyle={{fontWeight: "bold", color: "black"}}>Favorites</NavLink>
        <NavLink to='/' style={{ marginRight: '50px', fontSize: '15pt', color:'black' }} onClick={this.props.logout}> Logout</NavLink>
      </div>
    )
  }
}
