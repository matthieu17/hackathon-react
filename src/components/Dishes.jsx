import React, { Component } from 'react'

function Dish(props) {
    return <div> 
    <h2>{props.title}</h2>
    <img src={props.image} alt={props.title}/>
    <p><b>Type</b>: {props.type}</p>
    <p><b>Prix</b>: {props.price} euros</p>
    <p><b>Description</b>: {props.description}</p>
    <p><b>Ingrédients</b>:</p>
    <ul>
        {props.ingredients.map(ing => <li key={ing.id}>{ing}</li>)}
    </ul>
    <p><b>Tags</b>:</p>
    <ul>
        {props.tags.map(tag => <li key={tag.id}>{tag}</li>)}
    </ul>
    </div>
}  

export default class Dishes extends Component{

constructor(props){
    super (props)
    this.state = {
      dishes: [],
      init: true
    };
  }

  componentDidMount() {
    this.fetchData();
  }

render() {
    return (
    <div>
        <h2>Affichage de 10 plats</h2>
        <div>
            {this.state.init ? "loading" : 
                <div>{this.state.dishes.slice(0, 10).map(plat => <Dish key={plat.id}{...plat}></Dish>)}</div>
            }
        </div>
    </div>
    )
  }

  fetchData() {
    fetch('/api/dishes')
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