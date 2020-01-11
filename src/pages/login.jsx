import React, {Component} from "react";
import "./App.css";
import { render } from 'react-dom';
import carfix from "./SunrisePeekTeaEstate.jpg";
import firebase from "../config/firebase.js";
//import DatePicker from "react-datepicker";
 
//date input
//import "react-datepicker/dist/react-datepicker.css";

//dropdown
//import ControlledOpenSelect from "../isuru-components/dropdown-button2.js"


class App extends Component {
  render() {
    return (
      <Register />
      
    );
  }
}

const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach(
    (val) => val.length > 0 && (valid = false)
  );
  return valid;
}

class Register extends Component{
    constructor(props) {
        super(props);
        this.state = { 
          email: '',
          password: '',
          error: null,
        };
      }

      onSubmit = event => {
        //console.log(this.state.email);
        const { email, password } = this.state;
        
          firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then(function(firebaseUser){
            //console.log("SUCCESS");
            var user = firebase.auth().currentUser;
            var ref = firebase.database().ref("Users").child(user.uid); 
            ref.once('value',function (snapshot) {  
              let type=snapshot.val().type;
              if(type=="manager"){
                //console.log("hERER");
                window.location.replace("/manager/DailySummary");
                
              }  

             else if(type=="admin"){
                //console.log("hERER");
                window.location.replace("/admin/Division");
                
              }  
              
               
              else if(type=="conductor"){           
             let division=snapshot.val().division;
             localStorage.setItem('currentUserDivision', division);
             var ref2=firebase.database().ref("7_Day").child(division).child("end_Date");
              ref2.on('value',function (snapshot) {       
                let data = snapshot.val();
                var currentEndDate=new Date(data).getDate();
                var currentEndMonth=new Date(data).getMonth();
                var currentEndYear=new Date(data).getFullYear();
                var currentEnd=currentEndDate+'-'+(currentEndMonth+1)+'-'+currentEndYear;
                localStorage.setItem('currentEnd',currentEnd);
              });
            
             
            var date=new Date().getDate();
            var month=new Date().getMonth()+1;
            var year=new Date().getFullYear();
            var today=date+'-'+month+'-'+year;
            localStorage.setItem('today', today);
      
          //  var uid=localStorage.getItem('currentUserDivision');
          //  console.log(uid);
           
    
            // this.props.history.push("/dashboard");
          //  return <Redirect to="/admin/dashboard"/>;
          window.location.replace("/conductor/ConductorDailyWork");
              }
            }); 
            
          }).catch(function(error) {
            console.log(error.code);
            alert(error.message);
         });
    
        event.preventDefault();
      };
      onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
      };

//   handleChange= (event)=> {
//     const { name, value } = event.target;
//     this.setState({ [name]: value });
//     console.log(name)
//     console.log(value)
//     console.log(this.state.labourer_id)
   

//     let errors = this.state.errors;
    
    
//     switch (name) {
//       case 'text1': 
//         errors.labourer_id = 
//           value.length < 0
//             ?'ID must be 4 characters long!'
//             : '';
//         break;
//       case 'text2': 
//         errors.work_assignmt = 
//         value.length < 0
//             ? 'this is not valid!'
//             : '';
//         break;
//       case 'text3': 
//         errors.amount = 
//           value.length < 0 
//             ? 'amount must be a number'
//             : '';
//         break;
//       default:
//         break;
//     }

    

//   }
/*
  handleLoad = async (e) => {
    e.preventDefault();
    const { labourer_id } = this.state;
    const date = this.getDate()
    const ref = firebase.database().ref("Daily Work Data").child(date);
    await ref.once('value', (snapshot) => {
      snapshot.forEach((field) => {
        ref.child(field.key).once('value', (data) => {
          if(data.hasChild(labourer_id)) {
            this.flag = true;
            this.setState({ field: field.key })
            this.fetchData(date, field.key, labourer_id);
            return ;
          }
        })
      })
    })
   
    
  }
  fetchData = async (date, field, labourer_id) => {
    console.log('OK')
    await firebase.database().ref("Daily Work Data").child(date).child(field).child(labourer_id).once('value', (snapshot) => {
      this.setState({
        work_assignmt: snapshot.val().work_assignmt,
        Ready: true,
      })
    })
  }
  */

//   handleSubmit = () => {
//     const { field, labourer_id, work_assignmt } = this.state;
//     const date = this.getDate();
// /*
//     firebase.database().ref("Daily Work Data").child(date).child(field).child(labourer_id).set({
//       labourer_id: parseInt(labourer_id),
//     })
//     */
    
//    const ref = firebase.database().ref("Daily Work Data");
//    ref.once('value', function(snapshot){
//     if (snapshot.hasChild(date)) { //if date exist
//       //alert('exists');
//       //console.log('exists-1');
//       if (snapshot.child(date).hasChild(field)) { //if field exist
//         //alert('exists');
//         //console.log('exists-1');
//         firebase.database().ref("Daily Work Data").child(date).child(field).update({
//           [labourer_id]:{
//             work_assignmt: work_assignmt
//           }
//         })
//         .then(() => alert("success"))
//         .catch(() => alert("fail"))
//       }
//       else{
//         firebase.database().ref("Daily Work Data").child(date).update({
//           [field]: {
//               [labourer_id]:{
//                work_assignmt: work_assignmt
//              }
//           }
//         })
//         .then(() => alert("success"))
//         .catch(() => alert("fail"))
//       }
//     }
//     else {
//       //alert('not-exists');
//       //console.log('not-exists-1');
//       firebase.database().ref("Daily Work Data").update({
//         [date]: {
//           [field]: {
//              [labourer_id]:{
//                work_assignmt: work_assignmt
//              }
//           }
//         }
//       })
//       //  .then(() => alert("success"))
//       //  .catch(() => alert("fail"))
//      }
//     }
//    );
//   }

   

//   getDate = () => {
//     let date = this.state.date;
//     let dd = date.getDate();
//     let mm = date.getMonth() + 1;
//     let yyyy = date.getFullYear();

//     if(dd < 10) {
//       dd = '0' + dd;
//     }

//     if(mm < 10) {
//       mm = '0' + mm;
//     }

//     let dateString = dd + '-' + mm + '-' + yyyy;

//     return dateString;
//   }

  

  // handleSubmit = (e) => {
  //   e.preventDefault();
  //   if(validateForm(this.state.errors)) {
  //     // console.info('Valid Form')
  //     alert("success");
  //   }else{
  //     // console.error('Invalid Form')
  //     alert("fail");
  //   }
  // }
     
  render() {
    const { email, password, error } = this.state;
    const isInvalid = password === '' || email === '';
  return (
    
    <div
      className="App"
      style={{
        backgroundImage: `linear-gradient(0deg,rgba(20,100,20,0.5), rgba(9, 93, 225, 0.0)),url(${carfix})`
      }}>
    
   
      
    <div className="wrapper">
  <h2 className="heading">Login</h2>

      <form onSubmit={this.onSubmit} >
      <div classname="input">
          
          <input className="input"
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        </div>
        <div classname="input">
          <input className="input"
          name="password"
          value={password}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
        />
        </div>
        <button disabled={isInvalid} type="submit">
          Sign In
        </button>
        {error && <p>{error.message}</p>}
      </form>
     
      
      {/* <div className="field">
        <label className="label">Email</label>
        <div className="field">
          <div className="control">
            <input value="Enter Email"
              name="labourer_id"
              className="input"
              type="text"
              onChange={(event) => this.setState({ labourer_id: event.target.value })}
              placeholder="Labourer ID" required/>
              {errors.labourer_id.length > 0 && 
                <span className='error'>{errors.labourer_id}</span>}
          </div>
        </div>
      </div> */}
      

    

      
      {/* <div className="field">
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
      </div> */}

      {/* <div classname="input">
        <select className="input" value = {this.state.work_assignmnt} onChange={(event) => this.setState({ work_assignmt: event.target.value })}>
          <option value="None"> </option>
          <option value="Plucking">Plucking</option>
          <option value="Cleaning">Cleaning</option>
          <option value="Drainage">Drainage</option>
        </select>
      
      </div>
      <DatePicker className="date" 
        selected={this.state.date}
        onChange={(date) => this.setState({ date })}
      /> */}

      {/*this.state.Ready ?
  /*    <div className="field">
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
              : null*/}
      
  
      {/* <div className='submit'>
              <button onClick={this.handleSubmit}>Submit</button>
            </div>
  
      
      </form> */}
      
      </div>
    </div>
    
  );
}

}
render(<App />, document.getElementById('root'))
export default App;