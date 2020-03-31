import React from 'react';
import {BrowserRouter as Router,
    Route,
    Switch} from 'react-router-dom';
import MainPage from "./pages";
import ErrorPage from "./pages/ErrorPage";
import LoginPage from "./pages/LoginPage";
import StudentPage from "./pages/StudentPages/StudentPage";
import TeacherPage from "./pages/TeacherPages/TeacherPage";
import AdminPage from "./pages/AdminPages/AdminPage";
import PrivateRoute from "./PrivateRoute";
import Radium, {StyleRoot}  from "radium";

const App = () => {
        return(
            <StyleRoot>
                <Router>
                    <Switch>
                        <Route exact path ="/" component={MainPage}/>
                        <Route exact path ="/login" component={() => <LoginPage isLoginOnAct={true} />}/>
                        <Route exact path ="/register" component={() => <LoginPage isLoginOnAct={false}/>}/>
                        <PrivateRoute exact path ="/student" component={() => <StudentPage/>}/>
                        <PrivateRoute exact path ="/teacher" component={() => <TeacherPage/>}/>
                        <PrivateRoute exact path ="/admin" component={() => <AdminPage/>}/>
                        <Route component={ErrorPage}/>
                    </Switch>
                </Router>
            </StyleRoot>
        );
}

export default Radium(App);