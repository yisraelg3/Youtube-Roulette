import React, { Component } from 'react'

export default class Search extends Component {
  
  handleChange = (evt) => {
    this.props.changeSearchTerm(evt.target.value)
  }
  
  render() {
    return (
      <div className="ui search">
      <div className="ui icon input">
        <input className="prompt" onChange={this.handleChange} value={this.props.whatUserTyped}/>
        <i className="search icon" />
      </div>
    </div>
    )
  }
}
