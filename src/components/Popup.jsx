import React, { Component } from 'react' // Sans React dans le scope, pas de JSX

import croix from '../assets/img/croix.png'


export default class Popup extends Component {
  render(){


    return(
        <div className="contain-item">
        <section className="item">
          <section className="close" onClick={this.props.handleClick}><img src={croix} alt=""/></section>
    <h2>Merci <strong>{this.props.user.firstName}</strong> pour votre commande, elle vous sera livrée au <strong>{this.props.adresse}</strong>.</h2>
        </section>
      </div>
    )
  }
}

