import React, { Component } from 'react'
import Popup from './Popup'
import Parallax from 'parallax-js'

import Pizza from '../assets/img/pizz.png'

export default class Valider extends Component{

constructor(props){
    super (props)
    this.state = {
      dishes: [],
      init: true,
      varInput: 5,
      adresse: '',
      isFull: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleClick = this.handleClick.bind(this)

  }

 
  

  handleSubmit(e){
    this.setState({
      isFull: true,
    })
    e.preventDefault()
  }

  handleClick(){
    this.setState({
      isFull: false,
    })
  }

  handleChange(e){
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  componentDidMount() {
    this.fetchData();
  }


render() {
    const reducer = (accumulator, id) => accumulator + (!this.state.init ? this.state.dishes[id].price: "Loading");
    return (
      <>
         <header className="livraison">

         <img className="pizz" src={Pizza} alt=""/>
         <section>
           <h1>Votre commande</h1>
           <div className="bar"></div>
           <nav>
           {!this.state.init ? <ul>
            {this.props.selected.map(id => 
               <li>
                 <div>
                   <h3>{this.state.dishes[id].title.length > 50 ? this.state.dishes[id].title.substring(0, 50).concat('', "..."):this.state.dishes[id].title}</h3>
                   <p>{this.state.dishes[id].type}</p>
                 </div>
                 <div className="price">
                 {this.state.dishes[id].price}€
                 </div>
               </li>
              )}
             </ul>  : "Loading"}

           </nav>
           <div className="prix">
             <p>Prix total:</p>
             <h3>{this.props.selected.reduce(reducer, 0) * this.state.varInput} €</h3>
           </div>
           <div>
           <form onSubmit={this.handleSubmit}>
             <input value={this.state.adresse} onChange={this.handleChange} name="adresse" required type="text" placeholder="Votre adresse de livraison"></input>
             <button class="button-valid" type="submit">Valider la commande</button>
           </form>
           </div>
         </section>
     </header>
     { this.state.isFull ? <Popup handleClick={this.handleClick} user={this.props.user} adresse={this.state.adresse}/> : ""}
     </>
    )
  }

  fetchData() {
    fetch('/api/dishes', {
      headers: {
        'Authorization': 'Bearer '+ this.props.token
      }})
    .then((response) => {
      return response.json()
    })
    .then((obj) => {
      this.setState({
        dishes: obj,
        init: false
      })
    })
  }
}