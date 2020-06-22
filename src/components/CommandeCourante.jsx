import React, { Component } from 'react'
import croix from '../assets/img/croix.png'
import {
  Link,
} from 'react-router-dom'


export default class CommandeCourante extends Component{

constructor(props){
    super (props)
    this.state = {
      dishes: [],
      init: true,
      varInput: 5,
      laCommande: []
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  handleChange(event) {
    this.setState({
      varInput: event.target.value
    });
  }

render() {

    const reducer = (accumulator, id) => accumulator + this.state.dishes[id].price;
    return (
      <section  className="commande">
          <h2>Votre commande</h2>
          <div  className="bar"></div>
          <div  className="liste-commande">
          {this.props.selected.map(id => 
            // <div>
            //     <h2>{this.state.dishes[id].title}</h2>
            //     <img src={this.state.dishes[id].image} alt={this.state.dishes[id].title}/>
            //     <p><b>Type</b>: {this.state.dishes[id].type}</p>
            //     <p><b>Prix</b>: {this.state.dishes[id].price} euros</p>
            //     <p><b>Description</b>: {this.state.dishes[id].description}</p>
            //     <p><b>Ingrédients</b>:</p>
            //     <ul>
            //         {this.state.dishes[id].ingredients.map(ing => <li key={ing.id}>{ing}</li>)}
            //     </ul>
            //     <p><b>Tags</b>:</p>
            //     <ul>
            //         {this.state.dishes[id].tags.map(tag => <li key={tag.id}>{tag}</li>)}
            //     </ul>
            // </div>
            <div  className="plat-commande">
              <div style={{cursor: "pointer"}} onClick={() => this.props.delete(id)}>
                <img src={croix} width="15px" alt=""/>
              </div>
              <div  className="intit-commande">
                <h3>{this.state.dishes[id].title.length > 50 ? this.state.dishes[id].title.substring(0, 45).concat('', "..."):this.state.dishes[id].title}</h3>
                <h4>{this.state.dishes[id].type}</h4>
              </div>
              <div  className="prix-intit-commande">
                <h3>{this.state.dishes[id].price} €</h3>
              </div>
            </div>
            )}
          </div>
          <div  className="valider">
            <form>
              <input type="number" id="commandes" name="numero_commandes" value={this.state.varInput} onChange={this.handleChange} min="5" max="50"/>
              <Link to={{
                pathname: '/command/valid',
                state: {
                  selected: this.props.selected
                }
              }}><button type="submit" className="grosWid" form="form1" value="Submit">Commander</button></Link>
              <div  className="prix-commande">{this.props.selected.reduce(reducer, 0) * this.state.varInput} €</div>
            </form>
          </div>
        </section>
        /* <h3>Prix de votre commande: {this.props.selected.reduce(reducer, 0)} €</h3> */
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
      })
    })
  }
}