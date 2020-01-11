import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';

// core components
import Admin from "./layouts/Admin.jsx";
import Manager from "./layouts/Manager.jsx";
import Conductor from "./layouts/Conductor.jsx";
import RTL from "./layouts/RTL.jsx";
import WorkAssign from "./pages/work_assignmt";
import WorkDone from "./pages/work_done";
import AdvancePay from "./views/TableList/advancepay";
 import ContractPay from "./views/TableList/contractpay";
 import Expense from "./views/ManagerExpenses/misc";
 import Officers from "./views/ManagerExpenses/officerpay";
 import ManagerExpenses from "./views/ManagerExpenses/ManagerExpenses.jsx";
import Loan from "./views/TableList/loan";
import Weather from "./pages/weather.js"
import Login from "./pages/login.jsx"
import DailyWork from "./views/ConductorDailyWork/ConductorDailyWork.jsx"
import DailySummary from "./views/ManagerDailySummary/ManagerDailySummary.jsx"
import AddLabourer from "./views/AddLabourer/add_labourer.js";
import UpdateLabourer from "./views/AddLabourer/update_labourer.js";
import DeleteLabourer from "./views/AddLabourer/delete_labourer.js"
import TableList from "./views/TableList/TableList.jsx";
// import Division from "./views/Admin/Division.jsx";
import Field from "./views/Admin/Field.jsx";
import Man from "./views/Admin/Manager.jsx";
import Clerk from "./views/Admin/Clerk.jsx"

import AddDiv from "./views/Admin/add_division";
import UpdateDivision from "./views/Admin/update_division";
import DeleteDivision from "./views/Admin/delete_division";

import AddField from "./views/Admin/add_field";
import UpdateField from "./views/Admin/update_field";
import DeleteField from "./views/Admin/delete_field";

import AddManager from "./views/Admin/add_manager";
import UpdateManager from "./views/Admin/update_manager";
import DeleteManager from "./views/Admin/delete_manager";

import AddClerk from "./views/Admin/add_clerk";
import UpdateClerk from "./views/Admin/update_clerk";
import DeleteClerk from "./views/Admin/delete_clerk";


import "./assets/css/material-dashboard-react.css?v=1.6.0";

const hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route path="/manager" component={Manager} />
      <Route path="/admin" component={Admin} />
      <Route path="/conductor" component={Conductor} />
      <Route path="/rtl" component={RTL} />
      <Route exact path="/work_assignmt" component={WorkAssign}/>
      <Route exact path ="/work_done" component={WorkDone}/>
      <Route exact path ="/weather" component={Weather}/>
      {/* <Route exact path ="/admin/Division" component={Division}/> */}
      <Route exact path ="/add_division" component={AddDiv}/>
      <Route exact path ="/update_division" component={UpdateDivision}/>
      <Route exact path ="/delete_division" component={DeleteDivision}/>
      <Route exact path ="/admin/Field" component={Field}/>
      <Route exact path ="/add_field" component={AddField}/>
      <Route exact path ="/update_field" component={UpdateField}/>
      <Route exact path ="/delete_field" component={DeleteField}/>
      <Route exact path ="/admin/Manager" component={Man}/>
      <Route exact path ="/add_manager" component={AddManager}/>
      <Route exact path ="/update_manager" component={UpdateManager}/>
      <Route exact path ="/delete_manager" component={DeleteManager}/>
      <Route exact path ="/admin/Clerk" component={Clerk}/>
      <Route exact path ="/add_clerk" component={AddClerk}/>
      <Route exact path ="/update_clerk" component={UpdateClerk}/>
      <Route exact path ="/delete_clerk" component={DeleteClerk}/>
      <Route exact path ="/login" component={Login}/>
      <Route exact path ="/conductor/ConductorDailyWork" component={DailyWork}/>
      <Route exact path ="/conductor/ExpensesHandling" component={TableList}/>
      <Route exact path ="/conductor/AddLabourer" component={AddLabourer}/>
      <Route exact path ="/manager/ExpensesHandling" component={ManagerExpenses}/>
      <Route exact path ="/manager/DailySummary" component={DailySummary}/>
      <Route exact path="/advancepay" component={AdvancePay}/>
      <Route exact path="/contractpay" component={ContractPay}/>
      <Route exact path="/misc" component={Expense}/>
      <Route exact path="/loan" component={Loan}/>
      <Route exact path="/officerpay" component={Officers}/>
      <Route exact path="/add_labourer" component={AddLabourer}/>
      <Route exact path="/update_labourer" component={UpdateLabourer}/>
      <Route exact path="/delete_labourer" component={DeleteLabourer}/>?
      <Redirect from="/" to="/login" />
    </Switch>
  </Router>,
  document.getElementById("root")



  );



  


  