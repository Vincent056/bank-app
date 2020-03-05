import React from 'react';
import {BrowserRouter,Route,
    Switch} from 'react-router-dom';
import ReactDOM from 'react-dom';
import {UserPage,myaccounts} from './user_comp/usermain.js'
import OpenAcc from './user_comp/openbank.js'
import Billing from './user_comp/setbilling.js'
import UpdateInfo from './user_comp/update_Info.js'
import './index.css';

//connect to database here

class App extends React.Component{
    
    render(){
    return (
        <main>
            <Switch>
                <Route exact path = "/" render = {() => 
                    <UserPage accounts = {myaccounts}></UserPage>
                } />
                <Route exact path = "/update/" render = {() => 
                    <UpdateInfo/>
                } />
                <Route exact path = "/openacc/" render = {() => 
                    <OpenAcc/>
                } />
                <Route exact path = "/billing/" render = {() => 
                    <Billing/>
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

