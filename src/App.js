import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';





class App extends Component {
  state = {
    countries: [],
    search: '',
    country1: '',
    country2: '',
    country3: '',

  }

  componentDidMount() {
    axios.get("http://206.189.7.127/countries/")
      .then(response => {
        this.setState({ countries: response.data })
      })
  }
  onChangeHandler = (event) => {
    this.setState({
      search: event.target.value
    })
  }

  onSubmitHandler = (event) => {
    console.log(event.target.country.value)
    event.preventDefault() 

    

    axios.get(`http://206.189.7.127/countries/${this.state.search}`)
      .then(response => {
        console.log(response)
        
      })
      
  }

  showPromiseAll =  () => {
    let c1 = 'Angola'
    let c2 = 'Thailand'
    let c3 = 'Italy'
    let totalResponse = []
    axios.get(`http://206.189.7.127/countries/${c1}`) 
      .then(response => {
        totalResponse.push(response.data) //First one is done 3s
        axios.get(`http://206.189.7.127/countries/${c2}`)
        .then(response => {
          totalResponse.push(response.data) //Second one is done 3s 
          axios.get(`http://206.189.7.127/countries/${c3}`)
           .then(response => {
            totalResponse.push(response.data) //Third one is done 3s 
            console.log('do what i want this all the data',totalResponse)
           })
        })
      })


    //Better approach.  Faster & Cleaner 
    let promise1 =  axios.get(`http://206.189.7.127/countries/${c1}`)
    let promise2 =  axios.get(`http://206.189.7.127/countries/${c2}`)    
    let promise3 =  axios.get(`http://206.189.7.127/countries/${c3}`)

    Promise.all([promise1,promise2,promise3])
      .then(data => {
        console.log('Promise data',data) 
      })



  }

  

  render() {
    return (
      <div className="App">

          {this.state.country1}
          {this.state.country2}
          {this.state.country3}

          <button onClick={this.showPromiseAll}>Get 3 Countries</button>

        <form onSubmit={this.onSubmitHandler}>
          <input type="text" name="country" onChange={(event) => this.onChangeHandler(event)}></input>
          
          <button>Search</button>
        </form>
        {this.state.countries.map((country, i) => <h1 key={i}>{country.name.common}</h1>)}

      </div>
    );
  }
}

export default App;



// const aFunction = () => {}

// function aFunction(){}


// axios.delete
// axios.put


// axios.post(`http//:localhost:3000/signup`, {email:'coolboy55@email', password:'flippingpancakes'})
// .then(response => {
//   console.log(response)
  
// })