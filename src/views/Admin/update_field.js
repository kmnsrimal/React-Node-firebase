import React, { Component } from 'react';
import { render } from 'react-dom';
import carfix from "./SunrisePeekTeaEstate.jpg";
// import "./UserProfile.css";
import "../../pages/App.css";
import firebase from "../../config/firebase.js";
import { firestore } from 'firebase';


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
        field_no:null,
        field_type:null,
        crop_type:null,
        replantation_date:null,
        status:null,
       
       

        value: '',
        errors: {
        Division_no:'' ,   
        // Field:'',
        search_Division_no:'',
        field_no:'',
        search_field_no:'',
        field_type:'',
        crop_type:'',
        replantation_date:'',
        status:'',
          }
    };
  
       this.handleChange = this.handleChange.bind(this);
      // this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange = (event) => {
      event.preventDefault();
      const { name, value } = event.target;
      let errors = this.state.errors;
  
      switch (name) {
        case 'Phone_number': 
          errors.Phone_number = 
          validEmailRegex.test(value)
              ? 'Phone_number must be 10 characters long!'
              : '';
          break;
        case 'First_name': 
          errors.First_name = 
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
      window.location.replace("/Admin/Field");
    
    
    }
    
     handleLoad = (event)  =>{
       event.preventDefault(); 
       const {search_Division_no,search_field_no} = this.state;

       firebase.database().ref('Division').child(search_Division_no).child(search_field_no).once('value',(snapshot) => {
         if(snapshot.exists()){
         this.setState({
           Division_no           : search_Division_no, 
           field_no              : search_field_no,
           field_type            : snapshot.val().field_type,
           crop_type             : snapshot.val().crop_type,
           replantation_date     : snapshot.val().replantation_date,
           loaded                : true,

         })
         }
         else{
           alert('User not exist.');
           window.location.replace("/Admin/Field");
         }
       })
     }

    handleSubmit = (event) => {
      // alert('A name was submitted: ' + this.state.value);
      event.preventDefault();
       
      const{Division_no,field_type,search_field_no,field_no,crop_type,replantation_date,status} = this.state;
      if(field_no==null|| field_type==null||crop_type==null||replantation_date==null){
        alert("Please Complete all the details");
       
      }
    //   else if(Phone_number.length!=10){
        
    //     alert("Wrong Phone Number");
    //     window.location.reload();
    //   }

      
      
      else{
        if(search_field_no!==field_no){
          firestore.database().ref("Division").child(Division_no).child(field_no).remove();
        }
      firebase.database().ref("Division").child(Division_no).child(field_no).update({
       
        field_no:search_field_no,
        field_type:field_type,
        crop_type:crop_type,
        replantation_date:replantation_date,
        status:"Active",
      
      })
      .then(() => {
        this.setState({
          field_no:'',
          field_type:'',
          crop_type:'',
          replantation_date:'',
          loaded:false,
        })
        alert("Field updated");
        window.location.replace("/Admin/Field");
      })
     
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
        
        <h2 className="heading">Update Field</h2>
        
        <form name="myForm" >

        <div className="field">
        <label className="label"></label>
        <div className="field">
          <div className="control">
            <input value={this.state.Division_no}
              name="Division_no"
              className="input"
              type="text"
              onChange={this.state.loaded ? (event) => this.setState({ Division_no: event.target.value }):
                                            (event) => this.setState({ search_Division_no: event.target.value})}
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
            <input value={this.state.field_no}
              name="field_no"
              className="input"
              type="text"
              onChange={this.state.loaded ? (event) => this.setState({ field_no: event.target.value }):
                                            (event) => this.setState({ search_field_no: event.target.value})}
              placeholder="field_no" required/>
               {errors.field_no.length > 0 &&  
                 <span className='error'>{errors.field_no}</span>} 
          </div>
        </div>
      </div>
       
      {this.state.loaded ? 
          <div className="field">
        <label className="label"></label>
        <div className="field">
          <div className="control">
            <input value={this.state.crop_type}
              name="crop_type"
              className="input"
              type="text"
              onChange={(event) => this.setState({ crop_type: event.target.value })}
              placeholder="crop_type" required/>
               {errors.crop_type.length > 0 &&  
                 <span className='error'>{errors.crop_type}</span>} 
          </div>
        </div>
      </div>
     : null}  

     {this.state.loaded ? 
      <div className="field">
        <label className="label"></label>
        <div className="field">
          <div className="control">
            <input value={this.state.field_type}
              name="field_type"
              className="input"
              type="text"
              onChange={(event) => this.setState({ field_type: event.target.value })}
              placeholder="field_type" required/>
               {errors.field_type.length > 0 &&  
                 <span className='error'>{errors.field_type}</span>} 
          </div>
        </div>
      </div>
    : null}
      
    {this.state.loaded ? 
      <div className="field">
        <label className="label"></label>
        <div className="field">
          <div className="control">
            <input value={this.state.replantation_date}
              name="replantation_date"
              className="input"
              type="text"
              onChange={(event) => this.setState({ replantation_date: event.target.value })}
              placeholder="replantation_date" required/>
               {errors.replantation_date.length > 0 &&  
                 <span className='error'>{errors.replantation_date}</span>} 
          </div>
        </div>
      </div>
    : null}
      
     
      
      
      {/* {this.state.loaded ? 
      <div className="field">
        <label className="label"></label>
        <div className="field">
          <div className="control">
            <input value={this.state.Address}
              name="Address"
              className="input"
              type="text"
              onChange={(event) => this.setState({ Address: event.target.value })}
              placeholder="Address" required/>
               {errors.Address.length > 0 &&  
                 <span className='error'>{errors.Address}</span>} 
          </div>
        </div>
      </div>
      : null}
       
      {this.state.loaded ?
       <div className="field">
        <label className="label"></label>
        <div className="field">
          <div className="control">
            <input value={this.state.Status}
              name="Status"
              className="input"
              type="text"
              onChange={(event) => this.setState({ Status: event.target.value })}
              placeholder="Status" required/>
               {errors.Address.length > 0 &&  
                 <span className='error'>{errors.Status}</span>} 
          </div>
        </div>
      </div>
      : null} */}

      {!this.state.loaded ?
         <div className='submit'>
              <button onClick={this.handleLoad}>Load</button>
            </div>
      : null}

      {this.state.loaded ?
         <div className='submit'>
              <button onClick={this.handleSubmit}>Submit</button>
            </div>
      : null}

        </form>
        </div>>
        </div>
        
      );
    }
  }

  render(<App/>, document.getElementById('root'))
 export default App;
