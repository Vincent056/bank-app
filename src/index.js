import React from 'react';
import {BrowserRouter,Route,
    Switch} from 'react-router-dom';
import ReactDOM from 'react-dom';
import UserPage from './user_comp/usermain.js'
import OpenAcc from './user_comp/openbank.js'
import Billing from './user_comp/setbilling.js'
import UpdateInfo from './user_comp/update_Info.js'
import {LoginPage, id} from './login/loginpage.js'
import ForgotPassword from './login/forgotpassword.js'
import {ManagerLogin, manID,manuser} from './login/managerlogin.js'
import ManagerDashboard from './manager/managerdashboard.js'
import SignUpForm from './user_comp/SignUpForm.js'
import Transfer from './user_comp/transaction.js'
import MapContainer from './user_comp/BankMap.js'
import ATM from './user_comp/atm.js'
import ResetPassword from './user_comp/ResetPassword.js'
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
				<Route exact path = "/forgotpassword/" render = {() => 
                     <ResetPassword cus_id = {id}></ResetPassword>
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