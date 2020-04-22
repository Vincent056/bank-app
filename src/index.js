Skip to content
Search or jump to…

Pull requests
Issues
Marketplace
Explore
 
@amalachirayil 
Vincent056
/
bank-app
1
02
 Code Issues 0 Pull requests 1 Actions Projects 0 Wiki Security 0 Insights
bank-app/src/index.js /
@amalachirayil amalachirayil imported map and atm components
eea5b44 3 hours ago
@trandang210@tkglassey@amalachirayil
68 lines (64 sloc)  2.41 KB
  
Code navigation is available!
Navigate your code with ease. Click on function and method calls to jump to their definitions or references in the same repository. Learn more

import React from 'react';
import {BrowserRouter,Route,
    Switch} from 'react-router-dom';
import ReactDOM from 'react-dom';
import UserPage from './user_comp/usermain.js'
import OpenAcc from './user_comp/openbank.js'
import Billing from './user_comp/setbilling.js'
import UpdateInfo from './user_comp/update_Info.js'
import {LoginPage, id} from './login/loginpage.js'
import {ManagerLogin, manID,manuser} from './login/managerlogin.js'
import ManagerDashboard from './manager/managerdashboard.js'
import SignUpForm from './user_comp/SignUpForm.js'
import Transfer from './user_comp/transaction.js'
import MapContainer from './user_comp/BankMap.js'
import ATM from './user_comp/atm.js'
import './index.css';

//connect to database here

class App extends React.Component{
    
    render(){
    return (
        <main>
            <Switch>
				<Route exact path = "/" render = {() => 
                    <LoginPage/>
                } />
				<Route exact path = "/signUp/" render = {() => 
                     <SignUpForm cus_id = {id}></SignUpForm>
                } />
				<Route exact path = "/managerlogin/" render = {() => 
                    <ManagerLogin/>
                } />
				<Route exact path = "/managerdashboard/" render = {() => 
                    <ManagerDashboard man_id = {manID} man_user ={manuser}></ManagerDashboard>
                } />
                <Route path = "/usermain/" render = {(props) => 
                    <UserPage cus_id = {id} {...props} ></UserPage>
                } />
                <Route exact path = "/update/" render = {() => 
                    <UpdateInfo cus_id = {id}></UpdateInfo>
                } />
                <Route exact path = "/openacc/" render = {() => 
                    <OpenAcc cus_id = {id}></OpenAcc>
                } />
                <Route exact path = "/billing/" render = {() => 
                    <Billing cus_id = {id}></Billing>
                } />
                 <Route exact path = "/transfer/" render = {() => 
                    <Transfer cus_id = {id}></Transfer>
                } />
                <Route exact path="/map/" render = {(props) => 
                  <MapContainer {...props}/>
                } />
                <Route exact path="/atm/" render = {(props) => 
                  <ATM {...props}/>
                } />
            </Switch>
        </main>
    )}
}

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
 document.getElementById("root"));
© 2020 GitHub, Inc.
Terms
Privacy
Security
Status
Help
Contact GitHub
Pricing
API
Training
Blog
About
