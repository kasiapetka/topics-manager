import React, {useState} from 'react';
import {BrowserRouter as Router,
    Route,
    Switch,
    Link,
    Redirect} from 'react-router-dom';
import MainPage from "./pages";
import ErrorPage from "./pages/ErrorPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

class App extends React.Component{
    render(){
        return(
            <Router>
                <Switch>
                    <Route exact path ="/" component={MainPage}/>
                    <Route exact path ="/login" component={LoginPage}/>
                    <Route exact path ="/register" component={RegisterPage}/>
                    <Route component={ErrorPage}/>
                </Switch>
            </Router>
        );
    }
}

export default App;