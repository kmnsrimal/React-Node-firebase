import React ,{Component} from "react";
import "./pay.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import carfix from "./SunrisePeekTeaEstate.jpg";
import DatePicker from "react-datepicker"; 
import "react-datepicker/dist/react-datepicker.css";
import firebase from "../../config/firebase.js";


export default class AdvancePay extends Component {
    
  constructor(props) {
    super(props);
  
    this.state = {
      date: new Date(),
      labourer_id:null,
      advance:null,
      division:localStorage.getItem('currentUserDivision'),
      labourers: [{labourer_id: '', advance: ''}],
      Ready: false,
      errors: {
        labourer_id: '',
        advance: '',
        division:'division_1',
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
      case 'text1': 
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
  

  handleSubmit = () => {
    const { division, labourers } = this.state;
    const date = this.getDate();
  
    labourers.forEach((labourer) => {
      firebase.database().ref("Weekly_advance").child(date).child(division).child(labourer.labourer_id).update({
        advance: labourer.advance
      });
    })
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


  handleAddInput = (e) => {
    e.preventDefault();
    this.setState({
      labourers: this.state.labourers.concat([{labourer_id: '', advance: ''}])
    })
  }


  handleRemoveInput = (event, index) => {
    event.preventDefault();
    let labourers = this.state.labourers;
    labourers.splice(index, 1);
    this.setState({ labourers })
  }


  handleOnChangeLabourerID = (event, index) => {
    event.preventDefault();
    let labourers = this.state.labourers.slice();
    labourers[index].labourer_id = event.target.value;
    this.setState({ labourers })
  }


  handleOnChangeAdvance = (event, index) => {
    event.preventDefault();
    let labourers = this.state.labourers.slice();
    labourers[index].advance = event.target.value;
    this.setState({ labourers })
  }
  handleBack = () => {
    window.location.replace("/conductor/ExpensesHandling");
  
  }

    render () {
      let { labourers } = this.state;

      return (
       
        <div
      className="App"
      style={{
        backgroundImage: `url(${carfix})`
      }}
      
    >

      <br/>
      <br/>
      <br/>
        <DatePicker className="date1" 
        selected={this.state.date}
        onChange={(date) => this.setState({ date })}
      />

<div className='submit'>
              <button onClick={this.handleBack}>Back</button>
            </div>
<div className="wrap" > 
  <h2 className="title">Advance Payments</h2>
          <form className="form">
            <hr/>
  
  
 
 
  {
    this.state.labourers.map((labourer, index) => {
      return(
        <div className="form-row" key={index}>
    <div className="form-group-col-md-6" >
      
    <div className="field">
        <label className="label"></label>
        <div className="field">
          <div className="control">
            <input value={this.state.labourer_id}
             type="number"
              name="labourer_id"
              className="form-control"
              type="text"
              onChange={(event) => this.handleOnChangeLabourerID(event, index)}
              placeholder="Labourer ID" required/>
         
          </div>
        </div>
      </div>
    </div>
    <div className="form-group-col-md-6">
      <div className="field">
        <label className="label"></label>
        <div className="field">
          <div className="control">
             <input value={this.state.advance}
             type="text"
              name="advance"
              className="form-control"
              type="text"
              onChange={(event) => this.handleOnChangeAdvance(event, index)}
              placeholder="Advance" required/>
             
          </div>
        </div>
      </div>
    </div>

    <div className="form-group-col-md-6">
      <div className="field">
        <label className="label"></label>
        <div className="field">
          <button type="submit" className="btn-btn-success" onClick={(event) => this.handleRemoveInput(event, index)}>Remove</button>
        </div>
      </div>
    </div>

    

  </div>

      )
    })
  }
  
  
      
      
  
  <button type="submit" className="btn-btn-success2" onClick={this.handleAddInput}>Add</button>
  <button type="submit" className="btn-btn-success3" onClick={this.handleSubmit}>Send</button>
  {/* {this.state.Ready ?
    
      : null} */}

 
</form>
      </div>
      </div>       
      );      
    }
  }