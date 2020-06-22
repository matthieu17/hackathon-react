import React, { Component } from 'react' // Sans React dans le scope, pas de JSX
import {
  Link
} from 'react-router-dom'

// Import du logo
import logo from '../assets/img/logo-et-texte.svg'


export default class accueil extends Component {
  // constructor(props) {
  //  super(props)
  //}

  render(){
    return(
          <section>
            <img src={logo} alt=""/>
            <div>
                <p>Vos menus préférés, avec vos plats préférés pour vos personnes préférées ! Connectez vous pour commencer.</p>
            </div>
            {/* <button class="button-accueil" onClick={this.props.changeLogin}><p >Se connecter</p></button> */}
            <Link to="/login"><button class="button-accueil" onClick={this.props.changeLogin}><p >Se connecter</p></button> </Link>
          </section>
      
    )
  }
}