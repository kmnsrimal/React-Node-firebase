import React from "react";
import "./Dash.css";
import firebase from "../../config/firebase";
import PropTypes from "prop-types";
// react plugin for creating charts
import {Link, withRouter} from 'react-router-dom';
import ChartistGraph from "react-chartist";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
// core components
import GridItem from "../../components/Grid/GridItem.jsx";
import GridContainer from "../../components/Grid/GridContainer.jsx";
import Table from "../../components/Table/Table.jsx";
import Tasks from "../../components/Tasks/Tasks.jsx";
import CustomTabs from "../../components/CustomTabs/CustomTabs.jsx";
import Danger from "../../components/Typography/Danger.jsx";
import Card from "../../components/Card/Card.jsx";
import CardHeader from "../../components/Card/CardHeader.jsx";
import CardIcon from "../../components/Card/CardIcon.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import CardFooter from "../../components/Card/CardFooter.jsx";
import WorkAssign from "../../pages/work_assignmt.js";
import WorkDone from "../../pages/work_done.js";
import carfix from "./s.jpg";
import { bugs, website, server } from "../../variables/general.jsx";

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart
} from "../../variables/charts.jsx";

import dashboardStyle from "../../assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      div1:0,
      div2:0,
      div3:0,
      tableDiv1Data:[],
      tableDiv2Data:[],
      tableDiv3Data:[],
      counter: 0,
      fieldSum:0,
      today:'' ,
      yesterday:""
    };
    //this.handleClick = this.handleClick.bind(this);
  }


  componentWillMount = async() =>{
    this.setFieldData();
    //this.todayDate();
   // this.addDataTo7Day();
  }
  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  // fieldLimit(division,field){
  //   var ref=firebase.database().ref("7DayCropYeildLimit").child(division).child(field);
  //   ref.once('value',function (snapshot) {
  //     console.log(snapshot.val());
  //     return snapshot.val();      
  //   })
  // }

  // fieldYeildLimit(division,field){
  //   var ref1=firebase.database().ref("7_Day_Crop_Yeild_Limit").child(division).child(field);
        
  //   ref1.once('value',function (snapshot) {
  //        // console.log("current yeild",fieldSum);
  //     var limit=snapshot.val();    
  //     console.log("limt",limit);
  //   });
  //   return;

  // }

  setFieldData = async() => {
    // var uid=localStorage.getItem('currentUserDivision');
    // console.log(uid);
    
     var ref = firebase.database().ref("Daily Work Data").child("15-11-2019").child("division_1");
    var sum=0;
    var fieldSum=0;
    var count=0;
    var i=0;
    var data=[];
    // //var limit=0;
   
     await ref.once('value',function (snapshot) {                
      let feildData=snapshot.val();
      //console.log(feildData);
      snapshot.forEach(field=>{
        
        if(!field.val().total){
         if(true){
        field.forEach(laborer=>{
         
          if(laborer.val().work_assignmt=="Plucking"){
          count=count+1;
          fieldSum = fieldSum +laborer.val().amount;
          }
          
        });
        //this.setState({fieldSum:fieldSum});
        firebase.database().ref("Daily Work Data").child("15-11-2019").child("division_1").child(field.key).update({total:fieldSum});
        firebase.database().ref("Daily Work Data").child("15-11-2019").child("division_1").child(field.key).update({count:count});
      
     // this.fieldYeildLimit("division_1","field_1");
      var ref1=firebase.database().ref("7_Day_Crop_Yeild_Limit").child("division_1").child(field.key);
        var limit=0;
      ref1.once('value',function (snapshot) {
         // console.log("current yeild",fieldSum);
        limit=snapshot.val();    
        //localStorage.setItem('limit',limit);
        //console.log("limt",localStorage.getItem('limit'))
        console.log("limit",limit);
      });
      console.log("limit",limit);

//TESTING WITH TRANSACTION

      // var ref2=firebase.database().ref("7_Day").child("division_1").child(localStorage.getItem('currentEnd')).child(field.key);
      // ref2.once('value',function (snapshot) {
      //   if(snapshot.val()!=null){
      //     console.log("NOT NULL");
      //     var currentYeild=snapshot.val().yeild; 
      //     localStorage.setItem('currentYeild',currentYeild);
      //   }
      //   else{
      //     console.log("NULL");
      //     localStorage.setItem('currentYeild',0);
      //   }
      //   console.log("feild sum",this.state.fieldSum);
      //   console.log(field.key,parseInt(localStorage.getItem('currentYeild')));
           
      // });
      //var tot=fieldSum+parseInt(localStorage.getItem('currentYeild'));             //STILL NOT WORKING
      //console.log(field.key,tot,field.key);

     
         //console.log("limit");
       // var tot=fieldSum+parseInt(localStorage.getItem('currentYeild'));

       //**************DOESNT WORK PROPERLY************

      // var ref2=firebase.database().ref("7_Day").child("division_1").child(localStorage.getItem('currentEnd')).child(field.key).child("yeild");  
      // var tot=ref2.transaction(function (currentValue) {
        
      //   var updatedValue=0;
      //   if(currentValue){
      //     updatedValue=currentValue+fieldSum;
      //   }
      //   else{
      //     updatedValue=fieldSum
      //   }
      //   console.log("current val",currentValue);
      //  // console.log("fieldsum val",fieldSum);
      //   //console.log("updated val",updatedValue);
      //   return updatedValue;
      // });
      //   console.log(fieldSum,field.key,tot);

//************LIMIT DOESNT WORK*************//

        if(field.key!="weather"){
        firebase.database().ref("7_Day").child("division_1").child(localStorage.getItem('currentEnd')).child(field.key).update({yeild:fieldSum});
        firebase.database().ref("7_Day").child("division_1").child(localStorage.getItem('currentEnd')).child(field.key).update({date:localStorage.getItem('today')});
        console.log(field.key,localStorage.getItem('limit'));
        if(fieldSum>=localStorage.getItem('limit')){
          firebase.database().ref("7_Day").child("division_1").child(localStorage.getItem('currentEnd')).child(field.key).update({status:"Completed"});
        }
        else{
          firebase.database().ref("7_Day").child("division_1").child(localStorage.getItem('currentEnd')).child(field.key).update({status:"incompleted"});
        }
       // localStorage.removeItem('limit');
        localStorage.setItem('currentYeild',0);
      }
      }
    }
        //console.log(field.key,field.val().total,field.val().count);
        if(field.key!="weather"){
        data[i]=[field.key,field.val().total,field.val().count];
        sum=sum+field.val().total;
        fieldSum=0;
        
        count=0;
        i=i+1;
        }
      });
    });    
    // //firebase.database().ref("Dwork").child("2019-09-21").child("total").update({field1:sum}); 
    //console.log("total",sum); 
    this.setState({div1: sum});  
    this.setState({tableDiv1Data:data});
  
     
    var ref = firebase.database().ref("Daily Work Data").child("15-11-2019").child("division_2");
    var sum=0;
    var fieldSum=0;
    var count=0;
    var i=0;
    var data=[];
    // //var limit=0;
   
     await ref.once('value',function (snapshot) {                
      let feildData=snapshot.val();
      //console.log(feildData);
      snapshot.forEach(field=>{
        
         if(!field.val().total){
         
          field.forEach(laborer=>{
         
          if(laborer.val().work_assignmt=="Plucking"){
          count=count+1;
          fieldSum = fieldSum +laborer.val().amount;
          }
          
        });
        firebase.database().ref("Daily Work Data").child("15-11-2019").child("division_2").child(field.key).update({total:fieldSum});
        firebase.database().ref("Daily Work Data").child("15-11-2019").child("division_2").child(field.key).update({count:count});
      
      }

        console.log(field.key,field.val().total,field.val().count);
        if(field.key!="weather"){
        data[i]=[field.key,field.val().total,field.val().count];
        sum=sum+field.val().total;
        fieldSum=0;
        
        count=0;
        i=i+1;
        }
      });
    });    
    // //firebase.database().ref("Dwork").child("2019-09-21").child("total").update({field1:sum}); 
    //console.log("total",sum); 
    this.setState({div2: sum});  
    this.setState({tableDiv2Data:data});
     
    var ref = firebase.database().ref("Daily Work Data").child("15-11-2019").child("division_3");
    var sum=0;
    var fieldSum=0;
    var count=0;
    var i=0;
    var data=[];
    // //var limit=0;
   
     await ref.once('value',function (snapshot) {                
      let feildData=snapshot.val();
      //console.log(feildData);
      snapshot.forEach(field=>{
        
         if(!field.val().total){
         
        field.forEach(laborer=>{
         
          if(laborer.val().work_assignmt=="Plucking"){
          count=count+1;
          fieldSum = fieldSum +laborer.val().amount;
          }
          
        });
        firebase.database().ref("Daily Work Data").child("15-11-2019").child("division_3").child(field.key).update({total:fieldSum});
        firebase.database().ref("Daily Work Data").child("15-11-2019").child("division_3").child(field.key).update({count:count});
      
      }

        console.log(field.key,field.val().total,field.val().count);
        if(field.key!="weather"){
        data[i]=[field.key,field.val().total,field.val().count];
        sum=sum+field.val().total;
        fieldSum=0;
        
        count=0;
        i=i+1;
        }
      });
    });    
    // //firebase.database().ref("Dwork").child("2019-09-21").child("total").update({field1:sum}); 
   // console.log("total",sum); 
    this.setState({div3: sum});  
    this.setState({tableDiv3Data:data});

  }
  render() {
    const { classes } = this.props;
    return (
      <div
      className="App"
      style={{
        backgroundImage: `linear-gradient(0deg,rgba(20,100,20,0.5), rgba(9, 93, 225, 0.0)),url(${carfix})`
      }}>
         <div className="wrappe">
      <div>
       <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={6}>
            <Card chart>
              <CardHeader color="success">
                <ChartistGraph
                  className="ct-chart"
                  data={{
                    labels: [
                      "Division 1",
                      "Division 2",
                      "Division 3"
                    ],
                    series: [[this.state.div1,this.state.div2, this.state.div3]]
                  }}
                  type="Bar"
                  options={emailsSubscriptionChart.options}
                  responsiveOptions={emailsSubscriptionChart.responsiveOptions}
                  listener={emailsSubscriptionChart.animation}
                />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>Yesterday Field Summary</h4>
                <p className={classes.cardCategory}>
                  Crop Yeild
                </p>
              </CardBody>
            </Card>
          </GridItem>
         
        </GridContainer>
       
        
      </div>
      </div>
      <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={12}>
            <CustomTabs
              title="Division Summary:"
              headerColor="primary"
              tabs={[
                {
                  tabName: "Division 1",
                  tabIcon: BugReport,
                  tabContent: (
                    <Table
                  tableHeaderColor="primary"
                  tableHead={[ "Field#", "Yeild(kg)","# of Laborers at work"]}
                  tableData={this.state.tableDiv1Data}
                />
                  )
                },
                {
                  tabName: "Division 2",
                  tabIcon: Code,
                  tabContent: (
                    <Table
                  tableHeaderColor="primary"
                  tableHead={["Field#", "Yeild(kg)","# of Laborers at work"]}
                  tableData={this.state.tableDiv2Data}
                />
                  )
                },
                {
                  tabName: "Division 3",
                  tabIcon: Cloud,
                  tabContent: (
                    <Table
                  tableHeaderColor="primary"
                  tableHead={["Field#", "Yeild(kg)","# of Laborers at work"]}
                  //tableHead={[ "Field#", "Yeild(kg)","# of Laborers at work"]}
                  tableData={this.state.tableDiv3Data}
                />
                  )
                }
              ]}
            />
          </GridItem>
          
        </GridContainer>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Dashboard);