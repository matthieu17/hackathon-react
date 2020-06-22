import React, { Component } from 'react'

function Users(props) {
  return <div>
    <h3><b>Utilisateur</b> : {props.firstName} {props.lastName}</h3>
    <p><b>Informations de compte</b> : <b>mail:</b> {props.email} / <b>mdp:</b> {props.password}</p>
    <p><b>role</b> : {props.role}</p>
    </div>
 }

  export default class User extends Component{

    constructor(props){
        super (props)
        this.state = {
          users: [],
          init: true
        };
      }
    
      componentDidMount() {
        this.fetchData();
      }
    
    render() {
        return (
        <div>
            <h2>Affichage de 10 utilisateurs</h2>
            <div>
              {this.state.init ? "loading" : 
                <div>{this.state.users.slice(0, 10).map(utilisateur => <Users key={utilisateur.id}{...utilisateur}></Users>)}</div>
              }
            </div>
        </div>
        )
      }
    
      fetchData() {
        fetch('/api/users')
        .then((response) => {
          return response.json()
        })
        .then((obj) => {
          this.setState({
            users: obj,
            init: false
          })
        })
      }
    }