import React, {useState} from 'react';
import {BrowserRouter as Router,
    Route,
    Switch,
    Link,
    Redirect} from 'react-router-dom';
import MainPage from "./pages";
import ErrorPage from "./pages/ErrorPage";
import LoginPage from "./pages/LoginPage";
import StudentPage from "./pages/StudentPages/StudentPage";
import {PrivateRoute} from "./PrivateRoute";
import auth from "./Auth";

class App extends React.Component{
    constructor(props) {
        super(props);
    }
    render(){
        return(
            <Router>
                <Switch>
                    <Route exact path ="/" component={MainPage}/>
                    <Route exact path ="/login" component={() => <LoginPage isLoginOnAct={true} />}/>
                    <Route exact path ="/register" component={() => <LoginPage isLoginOnAct={false}/>}/>
                    <PrivateRoute exact path ="/student" component={() => <StudentPage/>}/>
                    <Route component={ErrorPage}/>
                </Switch>
            </Router>
        );
    }
}

export default App;