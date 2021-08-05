import logo from './logo.svg';
import './App.css';
import Home from "./components/Home";
import Question from "./components/admin/Question";
import CreateQuestion from "./components/admin/CreateQuestion";
import React, {Component, Fragment} from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import EditQuestion from './components/admin/EditQuestion';
import Others from './components/admin/Others';
import CreateOthers from './components/admin/CreateOthers';
import EditOthers from './components/admin/EditOthers'
import EditSDG from './components/admin/EditSDG';
import CreateSDG from './components/admin/CreateSDG';
import SDGChoice from './components/admin/SDGChoice';

import Users from "./components/admin/Users";
import AddUser from "./components/admin/AddUser";
import EditUsers from './components/admin/EditUsers';

import Organizations from './components/admin/Organizations';
import AddOrganization from './components/admin/AddOrganization';
import EditOrganizations from './components/admin/EditOrganizations'

import SupplierGroup from "./components/admin/SupplierGroup";
import AddSupplierGroup from "./components/admin/AddSupplierGroup";
import EditSupplierGroup from './components/admin/EditSupplierGroup';

//Dashboard Attempt
import Dashboard from "./components/admin/Dashboard";



class App extends Component{
  render(){
    return(
      <BrowserRouter>
        <Fragment>
          <Switch>
            {/* <Route  exact path="/" components={Question} /> */}
            {/* Dashboard Attempt */}
            {/* Dashboard Attempt */}
            <Route exact path="/" component={Home} />

            <Route exact path="/admin" component={Dashboard} />

            <Route exact path="/admin/question" component={Question} />
            <Route exact path='/admin/question/create' component={CreateQuestion} />          
            <Route exact path="/admin/question/edit/:id" component={EditQuestion} />

            <Route exact path="/admin/organizations" component={Organizations} />
            <Route exact path='/admin/organizations/create' component={AddOrganization} />          
            <Route exact path="/admin/organizations/edit/:id" component={EditOrganizations} />

            {/* Others links */}
            <Route path="/admin/others/list" component={Others} />
            <Route path="/admin/others/create/sdg" component={CreateSDG} />
            <Route path="/admin/others/edit/sdg/:id" component={EditSDG} />
            <Route path="/admin/others/create/:type" component={CreateOthers} />
            <Route path="/admin/others/edit/:type/:id" component={EditOthers} />


            <Route exact path="/admin/suppliergroup" component={SupplierGroup} />
            <Route exact path='/admin/suppliergroup/add' component={AddSupplierGroup} />          
            <Route exact path="/admin/suppliergroup/edit/:id" component={EditSupplierGroup} />
            <Route path="/admin/sdg_choice/create" component={SDGChoice} />

            <Route exact path="/admin/users" component={Users} />
            <Route exact path='/admin/users/add' component={AddUser} />          
            <Route exact path="/admin/users/edit/:id" component={EditUsers} />

            </Switch>
        </Fragment>
      </BrowserRouter>
   
    );
  }
    
}

export default App;


