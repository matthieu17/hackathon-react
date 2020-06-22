import React, { Component } from 'react' // Sans React dans le scope, pas de JSX
import {
  Redirect
} from 'react-router-dom'

// Import de nos composants
import Accueil from './Accueil'
import {Login} from './Auth'

export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLogin: false
    }
    this.handleLoginPage = this.handleLoginPage.bind(this)
  }
  
  handleLoginPage() {
    this.setState({
      isLogin: true,
    })
  }
  
  
  render(){
    const { isLogin, isAuth, username, password, authError} = this.props
    console.log(authError);

    return (
      <header>
        
        {this.state.isLogin ? <Login isAuth={isAuth} authError={authError} username={username} password={password} onLogin={this.props.onLogin}/> : <Accueil isLogin={isLogin} changeLogin={this.handleLoginPage}/>}
        {this.props.isAuth ? <Redirect to="/commander"/> : ""}      
      </header>
    )
    // return(
    //   <div>
    //     <Accueil />
    //     }
    //   </div>
    // )
  }
}