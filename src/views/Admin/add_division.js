import React, { Component } from 'react';
import { render } from 'react-dom';
import carfix from "./SunrisePeekTeaEstate.jpg";
import "./UserProfile.css";
import "../../pages/App.css";
import firebase from "../../config/firebase.js";


class App extends Component {
    render() {
      return (  
        <Register />
      );
    }
  }
  
  
  const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach(
    (val) => val.length > 0 && (valid = false)
  );
  return valid; 
}

class Register extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        
        Division_no:null,
        // conductor:null,
        conductor_name:null,
        conductor_id:null,
        no_of_feild:null,
        status:null,
       
       

        value: '',
        errors: {
        Division_no:'',
        // conductor:"",
        conductor_name:"",
        conductor_id:"",
        no_of_feild:'',
        status:''
      
        
          }
    };
     
    }
    handleChange = (event) => {
      event.preventDefault();
      const { name, value } = event.target;
      let errors = this.state.errors;
  
      switch (name) {
        case 'Division_no': 
          errors.Division_no = 
          validEmailRegex.test(value)
              ? 'Phone_number must be 10 characters long!'
              : '';
          break;
        case 'feild_no': 
          errors.feild_no = 
          validEmailRegex.test(value)
              ? 'Full Name must be  characters long!'
              : '';
          break;
        case 'Last_name': 
          errors.Last_name = 
            validEmailRegex.test(value)
              ? ''
              : ' is not valid!';
          break;
        case 'Address': 
          errors.Address = 
          validEmailRegex.test(value)
              ? 'Password must be 8 characters long!'
              : '';
          break;
          case 'Status': 
          errors.Status = 
          validEmailRegex.test(value)
              ? 'Password must be 8 characters long!'
              : '';
          break;

        default:
          break;
      }
  
      this.setState({errors, [name]: value});
    }
  
    
    handleBack = () => {
      window.location.replace("/Admin/Division");
    
    }
    handleSubmit = () => {
     
      const{Division_no,conductor,conductor_name,conductor_id,no_of_feild} = this.state;
     
      
       if(firebase.database().ref("Division")) {
        firebase.database().ref("Division").child(Division_no).update({
          
          conductor_name:conductor_name,
          conductor_id:conductor_id,
          no_of_feild:no_of_feild,
          status:"Active",
          
        
        })
        alert("Division Added");
        window.location.replace("/Admin/Division");
        // .then(() => alert("success"))
        // .catch(() => alert("fail"))
        
      
      }
      
      
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
        
        <h2 className="heading">Add Division</h2>
        
        <form name="myForm" >
        
        <div className="field">
        <label className="label"></label>
        <div className="field">
          <div className="control">
            <input value={this.state.Division_no}
              name="Division_no"
              className="input"
              type="text"
              onChange={(event) => this.setState({ Division_no: event.target.value })}
              placeholder="Division_no" required/>
               {errors.Division_no.length > 0 &&  
                 <span className='error'>{errors.Division_no}</span>} 
          </div>
        </div>
      </div>

      <div className="field">
        <label className="label"></label>
        <div className="field">
          <div className="control">
            <input value={this.state.conductor_name}
              name="conductor_name"
              className="input"
              type="text"
              onChange={(event) => this.setState({ conductor_name: event.target.value })}
              placeholder="conductor_name" required/>
               {errors.conductor_name.length > 0 &&  
                 <span className='error'>{errors.conductor_name}</span>} 
          </div>
        </div>
      </div>

      <div className="field">
        <label className="label"></label>
        <div className="field">
          <div className="control">
            <input value={this.state.feild_no}
              name="conductor_id"
              className="input"
              type="text"
              onChange={(event) => this.setState({ conductor_id: event.target.value })}
              placeholder="conductor_id" required/>
               {errors.conductor_id.length > 0 &&  
                 <span className='error'>{errors.conductor_id}</span>} 
          </div>
        </div>
      </div>

    // add no_of_field 

          <div className="field">
        <label className="label"></label>
        <div className="field">
          <div className="control">
            <input value={this.state.feild_no}
              name="no_of_feild"
              className="input"
              type="text"
              onChange={(event) => this.setState({ no_of_feild: event.target.value })}
              placeholder="no_of_feild" required/>
               {errors.no_of_feild.length > 0 &&  
                 <span className='error'>{errors.no_of_feild}</span>} 
          </div>
        </div>
      </div>

      <div className='submit'>
              <button onClick={this.handleSubmit}>Submit</button>
       </div>
         
        </form>
        </div>>
        </div>
        
      );
    }
  }

  render(<App/>, document.getElementById('root'))
 export default App;
