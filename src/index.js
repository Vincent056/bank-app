import React from 'react';
import {BrowserRouter,Route,
    Switch} from 'react-router-dom';
import ReactDOM from 'react-dom';
import UserPage from './user_comp/usermain.js'
import OpenAcc from './user_comp/openbank.js'
import Billing from './user_comp/setbilling.js'
import UpdateInfo from './user_comp/update_Info.js'
import {LoginPage, username} from './login/loginpage.js'
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
                <Route exact path = "/usermain/" render = {() => 
                    <UserPage user = {username} ></UserPage>
                } />
                <Route exact path = "/update/" render = {() => 
                    <UpdateInfo user = {username}></UpdateInfo>
                } />
                <Route exact path = "/openacc/" render = {() => 
                    <OpenAcc user = {username}></OpenAcc>
                } />
                <Route exact path = "/billing/" render = {() => 
                    <Billing user = {username}></Billing>
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

