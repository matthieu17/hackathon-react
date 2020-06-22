import React, { Component } from 'react'
import Menus from './Menus'
import PropTypes from 'prop-types'
import Parallax from 'parallax-js'

// Import des composants de React Router que l'on va utiliser
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'

// Import de nos composants
import Home from './Home'
import Valider from './Valider'
import MenuSite from './MenuSite'
import {Logout} from './Auth'


// Import du css
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/App.css'

// Composant affiché lorsqu'aucune route ne correspond à l'URL
const PageNotFound = ({history}) => <section txt="c">
  <h3>Page not found !</h3>
  {/*
    Quand on clique sur ce bouton, on revient en arrière dans l'historique
  */}
  <button onClick={() => history.go(-1)}>Go back</button>
</section>

PageNotFound.propTypes = {
  history: PropTypes.object.isRequired
}

export default class App extends Component{
  constructor(props){
    super (props)

    //Initialisation du State
    this.state = {
      users: [],
      places: [],
      isAuth: false,
      user: null,
      token : null,
      authError: false,
      command: null,
      selected: [],
      authLoading: true,
      price : '',
      nbOfDishes : 0,
    };

    this.handleLogin = this.handleLogin.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
    this.delete = this.delete.bind(this)
  }

  handleSelect(id) {
    const isSelected = this.state.selected.includes(id);
    console.log(isSelected)
    if (!isSelected) {
    this.setState({
        selected: [...this.state.selected, id]
    })}
    else this.setState({
        selected: this.state.selected.filter(leId => leId !== id)
    })
  }

  delete(id){
    this.setState({
      selected: this.state.selected.filter(leId => leId !== id)
  })
  }

  // Appelé lorsque le formulaire de login est envoyé avec son contenu
  handleLogin(user, password){
    console.log(user, password)
    fetch('/api/users/authenticate', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "login": user,
        "password": password
      })
    })
    .then((res) => {
      if (!res.ok) {
        throw new Error ('Error !')
      }
      return res.json()
    })
    .then((data)=> {
      this.setState({
        user : data.user,
        token : data.token,
        isAuth: true,
      })
      localStorage.setItem('token', data.token)
      console.log(user)
    })
    .catch(()=> {
      this.setState({
        authError : true,
      })
    })
  }

   // Appelé lorsque le bouton de la page logout est cliqué
   handleLogout(){
     localStorage.removeItem('token')
    this.setState({
      isAuth: false,
      user: null,
      token: null
    })
  }
  
  componentDidMount() {
    document.title = "FoodFirst | Accueil";
    const token = localStorage.getItem('token')
    this.checkToken(token)
  }
  
  checkToken(token){
    fetch('/api/users/me', {
      headers: {
        'Authorization': 'Bearer '+token
      }
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error ('Error !')
      }
      return response.json()
    })
    .then((obj) => {
      console.log(obj)
      this.setState({
        user: obj,
        authLoading: false,
        isAuth: true,
        token: token
      })
    }) 
    .catch(()=> {
      this.setState({
        authError : true,
        authLoading: false
      })
    })   
  }

  render() {
    console.log(this.state.isAuth);
    
    const { isAuth, authError, token} = this.state

    return (
      <div>
        <Router>

          {/* Affichage du menus */}
          <MenuSite
            isAuth={isAuth}
            onLogout={this.handleLogout} />

          {!this.state.authLoading ? <Switch>
            {/* La page de bienvenue */}
            <Route exact path="/" component={Home}  />

            { <Route path="/commander" render={props =>
              <Menus isAuth={isAuth}
                token={token}
                price={this.state.price}
                nbOfDishes={this.state.nbOfDishes}
                selected={this.state.selected} 
                handleSelect={this.handleSelect}
                delete={this.delete}
                onLogin={this.handleLogin}
                {...props}
              />}
            /> }
            {/* La page de connexion */}
            { <Route path="/login" render={props =>
              <Home isAuth={isAuth}
                authError={authError}
                onLogin={this.handleLogin}

                {...props}
                // {...props}
              />}
            /> }
            <Route path="/command/valid" render={props=>
              <Valider selected={this.state.selected} token={token} user={this.state.user}/>
            }
            />

 {/* La page de deconnexion */}
 <Route path="/logout" render={() => 
              <Logout isAuth={isAuth}
                onLogout={this.handleLogout}
              />}
            />

            <Route component={PageNotFound} />
          </Switch>: "loading"}
        </Router>
        <script>
          
        </script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/parallax/3.1.0/parallax.min.js"></script>
      </div>
      
    )
  }
}