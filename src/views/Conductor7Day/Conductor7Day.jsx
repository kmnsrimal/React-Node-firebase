import React from "react";
import PropTypes from "prop-types";
// react plugin for creating charts
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
import { bugs, website, server } from "../../variables/general.jsx";
import firebase from "../../config/firebase.js";
import carfix from "./s.jpg";
import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart
} from "../../variables/charts.jsx";
import Calendar from '@lls/react-light-calendar'
import '@lls/react-light-calendar/dist/index.css' // Default Style
import dashboardStyle from "../../assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import { container, card } from "../../assets/jss/material-dashboard-react.jsx";

//const useStyles = makeStyles(styles);
const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};
class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    const date = new Date()
    const startDate = date.getTime();
    this.state = {
      startDate, // Today
      endDate: new Date(startDate).setDate(date.getDate() + 5), // Today + 6 days
      chartVal:[0,0],
      tableData:[]
    }
    
  }
  componentWillMount = async() =>{
    this.setNewEndDate();
    this.setEndDate();
    
   // this.setChartVal();
    this.setTableValues();
  }

  setEndDate = async() => {    
    var ref = firebase.database().ref("7_Day").child(localStorage.getItem('currentUserDivision')).child("end_Date"); 
    var key="";
    await ref.once('value',function (snapshot) {       
      key = snapshot.val();
      console.log(snapshot.val());      
       
      }); 
      var end=new Date(key).getTime();
         
      this.setState({endDate:end}); 
      //console.log(new Date("Tue Oct 31 2019 23:51:44 GMT+0530 (India Standard Time)").getTime());  
     
   
    }
    setNewEndDate = async() => {    
      var ref = firebase.database().ref("7_Day").child(localStorage.getItem('currentUserDivision')).child("end_Date"); 
      await ref.on('value',function (snapshot) {       
        let data = snapshot.val();
        console.log(data);
        //console.log(new Date(data).getDate());
        var currentEndDate=new Date(data).getDate();
        var currentEndMonth=new Date(data).getMonth();
        var currentEndYear=new Date(data).getFullYear();
        var Today=new Date().getDate();
        var thisMonth=new Date().getMonth();
        var thisYear=new Date().getFullYear();
        var todaytime = new Date().getTime();
        var newEnd= new Date(new Date().setDate(new Date().getDate()+6)); //today+6 days
        var newEndDate=newEnd.getDate()+'-'+(newEnd.getMonth()+1)+'-'+newEnd.getFullYear();
        var currentEnd=currentEndDate+'-'+(currentEndMonth+1)+'-'+currentEndYear;
        var currentDate=Today+'-'+(thisMonth+1)+'-'+thisYear;
        console.log(currentEnd,currentDate);
        localStorage.setItem('currentEnd',currentEnd);
        firebase.database().ref("7_Day").child(localStorage.getItem('currentUserDivision')).update({pendingModule:currentEnd});
        if(thisYear>currentEndYear){
          firebase.database().ref("7_Day").child(localStorage.getItem('currentUserDivision')).update({end_Date:newEnd});
          firebase.database().ref("7_Day").child(localStorage.getItem('currentUserDivision')).update({pendingModule:currentEnd});
          firebase.database().ref("7_Day").child(localStorage.getItem('currentUserDivision')).child(newEndDate).update({status:"pending"});
          firebase.database().ref("7_Day").child(localStorage.getItem('currentUserDivision')).child(newEndDate).child("field1").update({status:"incomplete"});
        }
        else if(thisMonth>currentEndMonth){ //have to fix
          firebase.database().ref("7_Day").child(localStorage.getItem('currentUserDivision')).update({end_Date:newEnd});
          firebase.database().ref("7_Day".child(localStorage.getItem('currentUserDivision'))).update({pendingModule:currentEnd})
          firebase.database().ref("7_Day").child(localStorage.getItem('currentUserDivision')).child(newEndDate).update({status:"pending"});
          firebase.database().ref("7_Day").child(localStorage.getItem('currentUserDivision')).child(newEndDate).child("field1").update({status:"incomplete"});
          console.log(newEnd);
        }
        else if(Today>currentEndDate && thisMonth==currentEndMonth){
          firebase.database().ref("7_Day").child(localStorage.getItem('currentUserDivision')).update({end_Date:newEnd});
          firebase.database().ref("7_Day").child(localStorage.getItem('currentUserDivision')).update({pendingModule:currentEnd})
          firebase.database().ref("7_Day").child(localStorage.getItem('currentUserDivision')).child(newEndDate).update({status:"pending"});
          firebase.database().ref("7_Day").child(localStorage.getItem('currentUserDivision')).child(newEndDate).child("field1").update({status:"incomplete"});
          console.log("less than today");
        }
        else{
          //firebase.database().ref("7Day").child(currentEnd).child(currentDate).update({created:true});
        }
        
        }); 
      }

    //     setChartVal = async() =>{
    //       var ref = firebase.database().ref("7Day").child("pendingModule"); 
    //       await ref.on('value',function (snapshot) {       
    //         let data = snapshot.val();
    //         console.log(data);
    //         var ref2=firebase.database().ref("7Day").child(data);
            
    //         var sum=[];
    //         var i=0;
    //       ref2.once('value',function (snapshot2) {                
    //         snapshot2.forEach(element => {
    //           if(i<2){
    //           console.log(element.val().field1);
    //           sum[i]= element.val().field1;   
    //           i+=1;  
    //           }         
    //       });  
    //       console.log(sum);
          
    //        });         

    // //var ref = firebase.database().ref("Dwork").child("2019-09-20").child("Field2"); 
    // //sum=0;
    //       }); 
    //     }
        setTableValues = async()=>{
          var data=[];
          console.log(localStorage.getItem('currentEnd'));
          var ref=firebase.database().ref("7_Day").child(localStorage.getItem('currentUserDivision')).child(localStorage.getItem('currentEnd'));
          await ref.once('value',function (snapshot) {                
            var i=0;
            snapshot.forEach(field=>{
              if(field.key!="status"){
               data[i]=[field.key,field.val().date,field.val().yeild,field.val().status];
               i=i+1;
              }
             })
      
           });
          this.setState({tableData:data});   
        }

        //console.log(new Date("Tue Oct 31 2019 23:51:44 GMT+0530 (India Standard Time)").getTime());  
       
     
      
  onChange = (startDate, endDate) => this.setState({ startDate, endDate })

  render() {

    
    const { startDate,endDate } = this.state;
    console.log(this.state.endDate);
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
            <Card>
            <Calendar startDate={startDate} endDate={this.state.endDate} onChange={this.onChange} />
            
            </Card>
          </GridItem>
        </GridContainer>
          
        {/* <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={6}>
            <Card chart>
              <CardHeader color="success">
                <ChartistGraph
                  className="ct-chart"
                  data={{
                    labels: ["M", "T", "W", "T", "F", "S", "S"],
                    series: [[10, 0, 7, 17, 23, 18, 38]]
                  }}
                  type="Line"
                  options={dailySalesChart.options}
                  listener={dailySalesChart.animation}
                />
              </CardHeader>
              <CardBody>
                <h4 >Last 7 Day Summary</h4>
                <p >
                  <span >
                    Target Completed
                  </span>{" "}
                 </p>
              </CardBody> 
               <CardFooter chart>
                <div >
                  <AccessTime /> updated 4 minutes ago
                </div>
              </CardFooter> 
            </Card>
          </GridItem>
          </GridContainer> */}
          <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={12}>
            <CustomTabs
              title="Division Summary:"
              headerColor="primary"
              tabs={[
                {
                  tabName: localStorage.getItem('currentUserDivision'),
                  tabIcon: BugReport,
                  tabContent: (
                    <Table
                  tableHeaderColor="primary"
                  tableHead={[ "Field#","Date", "Yeild(kg)","Status"]}
                  tableData={this.state.tableData}
                />
                  )
                }
              ]}
            />
          </GridItem>
          
        </GridContainer>
           </div> 
           </div> 
           </div>     
     
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Dashboard);