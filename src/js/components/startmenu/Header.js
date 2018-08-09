import React from 'react'
import { Link } from 'react-router-dom'
// import * as firebase from 'firebase'
import fire from '../../../fire'

export default class Header extends React.Component {
  constructor () {
    super()
    this.signout = this.signout.bind(this)
  }
  signout () {
    fire.auth().signOut().then(function () {
      console.log('signout')
    }, function (error) {
      console.error('Sign Out Error', error)
    })
  }
  render () {
    const containerStyle = {
      fontSize: '18px'
    }
    return (
      <div id='login' className='float-right'>
        <Link to='/login'><button type='submit' id='loginBtn' className='StandardButton' style={containerStyle}>Login</button></Link>
        <button type='submit' id='signoutBtn' onClick={this.signout} className='StandardButton' style={containerStyle}>Sign out</button>
      </div>
    )
  }
}
