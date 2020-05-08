import React from 'react';
import {BrowserRouter as Router,
    Route,
    Switch} from 'react-router-dom';
import MainPage from "./components/Pages";
import ErrorPage from "./components/Pages/ErrorPage";
import LoginPage from "./components/Pages/LoginPage";
import StudentPage from "./containers/StudentPages/StudentPage";
import TeacherPage from "./containers/TeacherPages/TeacherPage";
import AdminPage from "./containers/AdminPages/AdminPage";
import PrivateStudentRoute from "./components/PrivateRoutes/PrivateStudentRoute";
import PrivateTeacherRoute from "./components/PrivateRoutes/PrivateTeacherRoute";
import PrivateAdminRoute from "./components/PrivateRoutes/PrivateAdminRoute";
import TeacherAccountModification from "./components/Pages/TeacherPages/TeacherAccountModification";
import StudentAccountModification from "./components/Pages/StudentPages/StudentAccountModification";
import AdminAccountModification from "./components/Pages/AdminPages/AdminAccountModification";

const App = () => {
        return(
                <Router>
                    <Switch>
                        <Route exact path ="/" component={MainPage}/>
                        <Route exact path ="/login" render={() => <LoginPage isLoginOnAct={true}/>}/>
                        <Route exact path ="/register" render={() => <LoginPage isLoginOnAct={false}/>}/>

                        <PrivateStudentRoute exact path ="/student/modifyaccount" component={StudentAccountModification}/>
                        <PrivateStudentRoute exact path ="/student" component={StudentPage}/>

                        <PrivateTeacherRoute exact path ="/teacher/modifyaccount" component={TeacherAccountModification}/>
                        <PrivateTeacherRoute path ="/teacher" component={TeacherPage}/>

                        <PrivateAdminRoute exact path ="/admin/modifyaccount" component={AdminAccountModification}/>
                        <PrivateAdminRoute path ="/admin" component={AdminPage}/>

                        <Route component={ErrorPage}/>
                    </Switch>
                </Router>
        );
};

export default App;