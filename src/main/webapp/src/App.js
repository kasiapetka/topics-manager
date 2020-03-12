import React, {useState} from 'react';
import {BrowserRouter as Router,
    Route,
    Switch,
    Link,
    Redirect} from 'react-router-dom';
import MainPage from "./pages";
import ErrorPage from "./pages/ErrorPage";
import LoginPage from "./pages/LoginPage";

class App extends React.Component{
    render(){
        return(
            <Router>
                <Switch>
                    <Route exact path ="/" component={MainPage}/>
                    <Route exact path ="/login" component={LoginPage}/>
                    <Route component={ErrorPage}/>
                </Switch>
            </Router>
        );
    }
}

export default App;