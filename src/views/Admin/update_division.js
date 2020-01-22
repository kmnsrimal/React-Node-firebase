import React, { Component } from 'react';
import { render } from 'react-dom';
import carfix from "./SunrisePeekTeaEstate.jpg";
//  import "./UserProfile.css";
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
        conductor_name:null,
        conductor_id:null,
        no_of_feild:null,
        status:null,
        loaded:false,
       

        value: '',
        errors: {
        Division_no:'',
        search_Division_no:'',
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
        case 'conductor_id': 
          errors.conductor_id = 
            validEmailRegex.test(value)
              ? ''
              : ' is not valid!';
          break;
        case 'conductor_name': 
          errors.conductor_name = 
          validEmailRegex.test(value)
              ? 'Password must be 8 characters long!'
              : '';
          break;
          case 'no_of_feild': 
          errors.no_of_feild = 
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
    handleLoad = (event)  =>{
        event.preventDefault();
        const search_Division_no = this.state.search_Division_no;
 
        firebase.database().ref('Division').child(search_Division_no).once('value',(snapshot) => {
          if(snapshot.exists()){
          this.setState({
            Division_no     : search_Division_no,
            conductor_id    : snapshot.val().conductor_id,
            conductor_name  : snapshot.val().conductor_name,
            no_of_feild     : snapshot.val().no_of_feild,
            loaded          : true,
 
          })
          }
          else{
            alert('User not exist.');
            window.location.replace("/Admin/Division");
          }
        })
      }
    
    handleBack = () => {
      window.location.replace("/Admin/Division");
    
    }
    handleSubmit = (event) => {
      event.preventDefault();
      const{Division_no,search_Division_no,conductor,conductor_name,conductor_id,no_of_feild} = this.state;
       
      if(Division_no == null || conductor_id ==null ||conductor_name ==null || no_of_feild==null){
        alert("Please Complete all the details");
      }

      else{
        if(search_Division_no!==Division_no){
          firebase.database().ref("Division").child(search_Division_no).remove();
        }
       
        firebase.database().ref("Division").child(Division_no).update({
          
          conductor_name:conductor_name,
          conductor_id:conductor_id,
          no_of_feild:no_of_feild,
          Status:"Active",
          
        
        })
        .then(() => {
          this.setState({
            search_Division_no:'',
            conductor_id:'',
            conductor_name:'',
            no_of_feild:'',
            loaded:false,
          })
          alert("Division Updated");
          window.location.replace("/Admin/Division");
        })
        
        // .then(() => alert("success"))
        // .catch(() => alert("fail"))
        
      
      }
      
//       else(firebase.database().ref("Division").child(feild){
        
//         firebase.database().ref("Division").child(Division_no).update({
          
//           conductor_name:conductor_name,
//           conductor_id:conductor_id,
//           no_of_feild:no_of_feild,
          
          
        
//         })

//       }
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
        
        <h2 className="heading">Update Division</h2>
        
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
                                            (event) => this.setState({ search_Division_no: event.target.value })}
              placeholder="Division_no" required/>
               {errors.Division_no.length > 0 &&  
                 <span className='error'>{errors.Division_no}</span>} 
          </div>
        </div>
      </div>
       
      {this.state.loaded ?
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
      : null}

      {this.state.loaded ? 
      <div className="field">
        <label className="label"></label>
        <div className="field">
          <div className="control">
            <input value={this.state.conductor_id}
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
      :null}

      {this.state.loaded ? 
            <div className="field">
              <label className="label"></label>
              <div className="field">
                <div className="control">
                  <input value={this.state.no_of_feild}
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
            :null}
       
     


    
      
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
