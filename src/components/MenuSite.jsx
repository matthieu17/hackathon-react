import React, { Component } from 'react' // Sans React dans le scope, pas de JSX
import {
  Link
} from 'react-router-dom'

// Import du logo
import user from '../assets/img/user.png'
import logoTexte from '../assets/img/logo-texte.svg'
import { Logout } from './Auth'


export default class Home extends Component {
  //constructor(props) {
    //super(props)
  //}

  render(){
    const { isAuth, onLogout } = this.props

    return(
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <Link to="/" class="navbar-brand header-logo"><img src={logoTexte} width="100%" alt="" /></Link>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          {isAuth ? 
            <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item dropdown ml-auto mr-1">
                <a class="nav-link" href="" id="navbarDropdown" role="button" data-toggle="dropdown"
                  aria-haspopup="true" aria-expanded="false">
                  <img src={user} alt="" width="20px"/>
                  <Link className="logout" to="/"><Logout isAuth={isAuth} onLogout={onLogout}/></Link>
                </a>
            </li>
          </ul>
          </div> : "" }
          
      </nav>
      
    )
  }
}



// { isAuth ?
//   <Link to="/logout">Logout</Link> :
//   <Link to="/login">Login</Link>
// }