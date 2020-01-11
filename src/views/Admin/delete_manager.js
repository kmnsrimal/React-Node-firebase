import React, { Component } from 'react';
import { render } from 'react-dom';
import carfix from "./SunrisePeekTeaEstate.jpg";
// import "./UserProfile.css";
import "../../pages/App.css";
 import firebase from "../../config/firebase.js";


class App extends Component {
    render() {
      return (
        <Register />
      );
    }
  }
  
  class Register extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        Manager:null,
        Phone_number:null,
        First_name: null,
        Last_name : null,
        Address: null,
        Status:null,
        Ready: false,
        value: '',

        errors: {
        Manager:'',
        Phone_number:'',
        First_name: '',
        Last_name : '',
        Address: '',
        Status:'',
          }
    };
  
     
    }

    handleSubmit = (event) => {
        // alert('A name was submitted: ' + this.state.value);
         event.preventDefault();
         
        const{Phone_number,First_name,Last_name,Address,Status} = this.state;
        if(Phone_number==null){
          alert("Please enter a Phone number");
          window.location.reload();
        }
        else if(Phone_number.length!=10){
          alert("Wrong Phone Number");
          window.location.reload();
        }
                
        else{
          
        firebase.database().ref("Manager").child(Phone_number).update({
          
         
          Status:"Deleted"
        
        })
        
          alert("Manager Deleted");
          window.location.replace("/Admin/Manager");
      
      
        
      }
     
      
      }

      handleBack = () => {
        window.location.replace("/Admin/Manager");
      
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
    <h1 className="title">Delete Manager</h1>
  
        <form name="myForm" >
        
        <div className="field">
          <label className="label"></label>
          <div className="field">
            <div className="control">
              <input value={this.state.Phone_number}
                name="Phone_number"
                className="input"
                type="text"
                onChange={(event) => this.setState({ Phone_number: event.target.value })}
                placeholder="Phone_number" required/>
                {errors.Phone_number.length > 0 && 
                  <span className='error'>{errors.Phone_number}</span>}
            </div>
          </div>
        </div>
       
  
        {!this.state.Ready ?
        <div className='submit'>
                <button onClick={(e) => this.handleSubmit(e)}>Delete</button>
              </div>
              : null}
  
       
  
        
        </form>
        
        </div>
      </div>
          
        );
      }
    }
  
    render(<App/>, document.getElementById('root'))
   export default App;