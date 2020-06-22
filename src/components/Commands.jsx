import React, { Component } from 'react'
import RecupPlat from './RecupPlat'

function Command(props) {
    var laDate = new Date(props.date);
    var months = ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'];
    var year = laDate.getFullYear();
    var month = months[laDate.getMonth()];
    var date = laDate.getDate();
    var time = date + ' ' + month + ' ' + year;
    return <div key={props.id}> 
    <h2>Commande numéro: {props.id + 1}</h2>
    <p><b>Date</b>: {time}</p>
    <p><b>Plat de la commande</b>:</p>
    <ul>
        {props.dishes.map(dish => <RecupPlat id = {dish}></RecupPlat>)}
    </ul>
    <p><b>Utilisateur</b>: {props.user.firstName}</p>
    <p><b>Livraison</b>: {props.place.name}</p>
    </div>
}

export default class Commands extends Component{

constructor(props){
    super (props)
    this.state = {
      commands: [],
      init: true
    };
  }

  componentDidMount() {
    this.fetchData();
  }

render() {
    return (
    <div>
        <h2>Affichage de 10 commandes</h2>
        <div>
            {this.state.init ? "loading" : 
                <div>{this.state.commands.slice(0, 10).map(commande => <Command key={commande.id} {...commande}></Command>)}</div>
            }
        </div>
    </div>
    )
  }

  fetchData() {
    fetch('/api/commands?_expand=user&_expand=place')
    .then((response) => {
      return response.json()
    })
    .then((obj) => {
        console.log(obj)
      this.setState({
        commands: obj,
        init: false
      })
    })
  }
}