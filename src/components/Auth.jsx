import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'

// import logo
import logo from '../assets/img/logo.svg'

export class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount(){
    // On change le titre de la page
    document.title = "Login | FoodFirst";
    console.log(this.state.username);
  }

  // Appelé lorsque le formulaire est soumis
  handleSubmit(e){
    // On évite que la page se rafraîchisse
    e.preventDefault()

    console.log(this.state.username, this.state.password)
    // On appelle la prop onLogin avec les informations du formulaire
    this.props.onLogin(this.state.username, this.state.password)

  }

  // Appelé lorsque le champs est modifié
  handleChange(e){
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  render(){
    // // On vérifie si il y a un state passé dans le routeur
    // const { from } = this.props.location.state || { from: { pathname: "/" } }

    const { authError } = this.props

    // Si on est authentifié, on redirige l'utilisateur
    return(
    //  this.props.isAuth ? <Redirect to={from} /> : 
    // <section>
        /* Sinon, on affiche le formulaire */
        /* <form onSubmit={this.handleSubmit}>
          <label htmlFor="user">Username</label>
          <input type="text" name="user" id="user" value={username} onChange={this.handleChange} />
          <input type="submit" value="Se connecter" />
        </form>
    </section> */
    <section className="login">
      <div>
        <img src={logo} alt=""/>
      </div>
      <div>
        <form onSubmit={this.handleSubmit}>
          <h2>Connectez vous</h2>
          <input type="text" placeholder="Username" name="username" id="user" value={this.state.username} onChange={this.handleChange} required />

          <input type="password" placeholder="Password" name="password" id="password" value={this.state.password} onChange={this.handleChange} required />

          <button type="submit">Connexion</button>

          { authError ? <p>Mauvais identifiant ou mauvais mot de passe</p> : ''}
          

          <p>Vous n'avez pas de compte ? <a href="/">Inscrivez-vous !</a></p>
        </form>
      </div>
      { this.props.isAuth ? <Redirect to="/"/> : ""}
    </section>
  
    )
  }
}


// Login.propTypes = {
//   isAuth: PropTypes.bool.isRequired,
//   onLogin: PropTypes.func.isRequired,
//   location: PropTypes.object
// }


export class Logout extends Component{

  handleSubmit(e){
    e.preventDefault();
    this.props.onLogout();
  }

  render(){
    const {onLogout, isAuth} = this.props
    return <section txt="c">
      {/* <h4>Sure you want to logout ?</h4> */}
      { isAuth ?
        // Un clic sur le bouton appelle la prop onLogout
        <button onClick={onLogout}>Logout</button>
        // On redirige l'utilisateur lorsqu'il n'est plus connecté
        : <Redirect to="/" />
      }
    </section>
  }
}

Logout.propTypes = {
  onLogout: PropTypes.func.isRequired,
  isAuth: PropTypes.bool.isRequired
}