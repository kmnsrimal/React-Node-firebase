import React, {Component} from "react";
import "./App.css";
import { render } from 'react-dom';
import carfix from "./SunrisePeekTeaEstate.jpg";
import firebase from "../config/firebase.js";
import DatePicker from "react-datepicker";
 
import "react-datepicker/dist/react-datepicker.css";


class App extends Component {
  render() {
    return (
      <Register />
      
    );
  }
}

class Register extends Component{
  constructor(props) {
    super(props);
  
    this.state = {
      labourer_id: null,
      work_assignmt: null,
      status: null,
      amount: null,
      field: null,
      division:null,
      date: new Date(),
      Ready: false,
      errors: {
        field: '',
        labourer_id: '',
        work_assignmt: '',
        amount: '',
        date:'',
      }
    };
  }

  handleChange= (event)=> {
    const { name, value } = event.target;
    this.setState({ [name]: value });
    console.log(name)
    console.log(value)
    console.log(this.state.labourer_id)
   
  
    let errors = this.state.errors;
          
    switch (name) {
      case 'labourer_id': 
        errors.labourer_id = 
          value.length < 0
            ?'ID must be 4 characters long!'
            : '';
        break;
      case 'text2': 
        errors.work_assignmt = 
        value.length < 0
            ? 'this is not valid!'
            : '';
        break;
      case 'text3': 
        errors.amount = 
          value.length < 0 
            ? 'amount must be a number'
            : '';
        break;
      default:
        break;
    }
    
    

  }

  handleLoad = async (e) => {
    e.preventDefault();
    const { labourer_id } = this.state;
    const date = this.getDate()
    const ref = firebase.database().ref("Daily Work Data").child(date);

    await ref.once('value', (snapshot) => {
      snapshot.forEach((division) => {
        division.forEach((field) => {
          ref.child(division.key).child(field.key).child(labourer_id).once('value', (data) => {
            if(data.exists()) {
              this.setState({
                division: division.key,
                field: field.key
              })
              this.fetchData(date, division.key, field.key, labourer_id);
              return;
            }
          })
        })
      })
    })   
  }


  handleBack = () => {
    window.location.replace("/conductor/ConductorDailyWork");
  
  }
   

  fetchData = async (date, division, field, labourer_id) => {
    console.log('OK')
    await firebase.database().ref("Daily Work Data").child(date).child(division).child(field).child(labourer_id).once('value', (snapshot) => {
      this.setState({
        work_assignmt: snapshot.val().work_assignmt,

        Ready: true,
      })
    })
  }

  handleSubmit = () => {
    const { division,field, labourer_id, amount, status } = this.state;
    const date = this.getDate();

    if(status) {
      firebase.database().ref("Daily Work Data").child(date).child(division).child(field).child(labourer_id).update({
        status: status,
      })
      .then(() => alert("success"))
      .catch(() => alert("fail"))
    }
    else {
      firebase.database().ref("Daily Work Data").child(date).child(division).child(field).child(labourer_id).update({
        amount: parseInt(amount),
      })
      .then(() => alert("success"))
      .catch(() => alert("fail"))
    }

    
  }

  getDate = () => {
    let date = this.state.date;
    let dd = date.getDate();
    let mm = date.getMonth() + 1;
    let yyyy = date.getFullYear();

    if(dd < 10) {
      dd = '0' + dd;
    }

    if(mm < 10) {
      mm = '0' + mm;
    }

    let dateString = dd + '-' + mm + '-' + yyyy;

    return dateString;
  }

     
  render() {
    const {errors} = this.state;
  return (
    
    <div
      className="App"
      style={{
        backgroundImage: `linear-gradient(0deg,rgba(20,100,20,0.5), rgba(9, 93, 225, 0.0)),url(${carfix})`
      }}>

<div className='submit'>
              <button onClick={this.handleBack}>Back</button>
            </div>

    <div className="wrapper">
  <h1 className="title">Evening Summery</h1>

      <form name="myForm" >
      
      <div className="field">
        <label className="label"></label>
        <div className="field">
          <div className="control">
            <input value={this.state.labourer_id}
              name="labourer_id"
              className="input"
              type="text"
              onChange={(event) => this.setState({ labourer_id: event.target.value })}
              placeholder="Labourer ID" required/>
              {errors.labourer_id.length > 0 && 
                <span className='error'>{errors.labourer_id}</span>}
          </div>
        </div>
      </div>
      
     
      {!this.state.Ready ?
    <DatePicker className="date" 
        selected={this.state.date}
        onChange={(date) => this.setState({ date })}
      />
    : null}

      {!this.state.Ready ?
      <div className='submit'>
              <button onClick={(e) => this.handleLoad(e)}>Load</button>
            </div>
            : null}

      {this.state.Ready ?
      <div className="field">
        <label className="label"></label>
        <div className="field">
          <div className="control">
            <input value={this.state.work_assignmt}
              name="work_assignmt"
              className="input"
              type="text"
              onChange={(event) => this.setState({ work_assignmt: event.target.value })}
              placeholder="Work Assignmt" required/>
              {errors.work_assignmt.length > 0 && 
                <span className='error'>{errors.work_assignmt}</span>}
          </div>
        </div>
      </div>
      : null}

      {this.state.Ready ?
      <div className="field">
      <label className="label"></label>
      <div className="field">
        <div className="control">
          <input value={this.state.field}
            name="field"
            className="input"
            type="text"
            onChange={(event) => this.setState({ field: event.target.value })}
            placeholder="field" required/>
            {errors.field.length > 0 && 
              <span className='error'>{errors.field}</span>}
        </div>
      </div>
      </div>
      : null}

      {this.state.Ready && this.state.work_assignmt != 'Plucking' ?
      <div classname="input">
        <select className="input" value = {this.state.status} onChange={(event) => this.setState({ status: event.target.value })}>
          <option value="None"> </option>
          <option value="Completed">Completed</option>
          <option value="Not Completed">Not Completed</option>
        </select>
      </div>
      : null}

      {this.state.Ready && this.state.work_assignmt == 'Plucking' ?
      <div className="field">
        <label className="label" ></label>
        <div className="field">
          <div className="control">
            <input value={this.state.amount}
              name="amount"
              className="input"
              type="number"
              onChange={(event) => this.setState({ amount: event.target.value })}
              placeholder="amount (kg)" required/>
              {errors.amount.length > 0 && 
                <span className='error'>{errors.amount}</span>}
          </div>
        </div>
      </div>
      : null}
      
      {this.state.Ready ?
      <div className='submit'>
              <button onClick={this.handleSubmit}>Submit</button>
            </div>
      : null}

      
      </form>
      
      </div>
    </div>
    
  );
}

}
render(<App />, document.getElementById('root'))
export default App;
