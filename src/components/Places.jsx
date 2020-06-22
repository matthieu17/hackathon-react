import React, { Component } from 'react'

function Place(props) {
    return <div>
         <p>Nom d'une places: <b>{props.name}</b></p>
         <p>Latitude: {props.lat}</p>
         <p>Longitude: {props.lon}</p></div>
} 

export default class Places extends Component{

    constructor(props){
        super (props)
        this.state = {
          places: [],
          init: true
        };
      }
    
      componentDidMount() {
        this.fetchData();
      }
    
    render() {
        return (
        <div>
            <h2>Affichage de 10 places</h2>
            <div>
                {this.state.init ? "loading" : 
                    <div>{this.state.places.slice(0, 10).map(location => <Place key={location.id}{...location}></Place>)}</div>
                }
            </div>
        </div>
        )
      }
    
      fetchData() {
        fetch('/api/places')
        .then((response) => {
          return response.json()
        })
        .then((obj) => {
          this.setState({
            places: obj,
            init: false
          })
        })
      }
    }
