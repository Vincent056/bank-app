import React from 'react';
import {BrowserRouter,Route,
    Switch} from 'react-router-dom';
import ReactDOM from 'react-dom';
import UserPage from './user_comp/usermain.js'
import OpenAcc from './user_comp/openbank.js'
import Billing from './user_comp/setbilling.js'
import UpdateInfo from './user_comp/update_Info.js'
import {LoginPage, id} from './login/loginpage.js'
import ManagerLogin from './login/managerlogin.js'
import SignUpForm from './user_comp/SignUpForm.js'
import Transfer from './user_comp/transaction.js'

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
                    <ManagerLogin cus_id = {id}></ManagerLogin>
                } />
                <Route exact path = "/usermain/" render = {() => 
                    <UserPage cus_id = {id} ></UserPage>
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
            </Switch>
        </main>
    )}
}

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
 document.getElementById("root"));

