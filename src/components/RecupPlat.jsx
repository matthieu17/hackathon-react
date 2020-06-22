import React, { Component } from 'react'

  export default class RecupPlat extends Component{

    constructor(props){
        super (props)
        this.state = {
          plat: [],
          platIngredients : [],
        };
      }
    
      componentDidMount() {
        this.fetchData();
      }
    
    render() {
      console.log(this.state.plat.title);
      
        return (
        <>
        <div  className="image-plat" style={{background: 'url(' + this.state.plat.image + ') center',
                                            backgroundSize: 'cover'}}>
      </div>
      <div  className="texte-plat">
        <h4>{this.state.plat.title}</h4>
        <ul>
          {this.state.platIngredients.map(ing => <li key={ing.id}>{ing}</li>)}
        </ul>
        <p>{this.state.plat.description}</p>
        <h5>{this.state.plat.price} € <a href="#">?</a></h5>
      </div>
      </>
        )
      }
    
      fetchData() {
        fetch('/api/dishes/'+this.props.id, {
          headers: {
            'Authorization': 'Bearer '+ this.props.token
          }})
        .then((response) => {
          return response.json()
        })
        .then((obj) => {
          this.setState({
            plat: obj,
            platIngredients: obj.ingredients,
            init:false
          })
        })
      }
    }