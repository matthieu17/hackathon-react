import React, { Component } from 'react'
import RecupPlat from './RecupPlat'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import './menus.css'
import CommandeCourante from './CommandeCourante'

function Menu(props) {
    /*var laDate = new Date(props.date);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = laDate.getFullYear();
    var month = months[laDate.getMonth()];
    var date = laDate.getDate();
    var time = month + ' ' + date + ' ' + year;*/
    return <div style={{height: '100%'}}> 
    {/* <h2>Menu numéro: {props.id + 1}</h2>
    <p><b>Date</b>: {time}</p>
    <p><b>Plat(s) inclu(s) dans le menu: </b></p>
    <ul>
        {props.choices.map(plat => <div className={(props.selected.includes(plat))  ? "selected":""} onClick={() => props.onSelect(plat)}><RecupPlat id = {plat}></RecupPlat></div>)}
    </ul>
    </div> */}
    
    <section  className="menu">
    <h2>Plats du menu sélectionné</h2>
    <div  className="bar"></div>
    <div  className="type">
      {props.choices.map(plat => <div className={"plat "+((props.selected.includes(plat))  ? "selected":"")} onClick={() => props.handleSelect(plat)}><RecupPlat id = {plat} token={props.token}></RecupPlat></div>)}
    </div>
    </section>
    </div>
}  

export default class Menus extends Component{

constructor(props){
    super (props)
    this.state = {
      menus: [],
      init: true,
      startDate: Date.now(),
      // selected: []
    };
  }

  componentDidMount() {
    this.fetchData();
  }


  handleChange = date => {
    date.setHours(12, 30, 0, 0)
    this.setState({
      startDate: date.getTime(),
    });
  };

render() {
  const { token } = this.props
    console.log(this.state.startDate)
    console.log(this.state.menuJour)   
    return (
    <div>
      <header className="connected">
        <h1>Faites nous confiance &<br/> faites vous livrer en un clic !</h1>
      </header>
      <section className="content">
      <section  className="date">
          <h2>Choisissez une date</h2>
          <div  className="bar"></div>
          <DatePicker calendarClassName="calendarPerso" selected={this.state.startDate} onChange={this.handleChange} inline />
      </section>
            {this.state.menus == null ? "loading" : 
                <div>{this.state.menus
                  .filter(menu => this.state.startDate === menu.date).map(menu => <Menu key={menu.id}{...menu} selected={this.props.selected} token={token} handleSelect={(id) => this.props.handleSelect(id)}></Menu>)}</div>
              }
        <CommandeCourante 
          token={token}
          price={this.props.price}
          nbOfDishes={this.props.nbOfDishes}
          selected={this.props.selected}
          delete={(id) => this.props.delete(id)}/>
        
        </section>
       
    </div>
    )
  }

  fetchData() {
    fetch('/api/menus', {
      headers: {
        'Authorization': 'Bearer '+ this.props.token
      }})
    .then((response) => {
      return response.json()
    })
    .then((obj) => {
      this.setState({
        menus: obj,
        init: false,
      })
    })
  }
}