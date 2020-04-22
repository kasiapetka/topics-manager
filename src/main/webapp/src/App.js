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
                        <Route exact path ="/login" component={() => <LoginPage isLoginOnAct={true} />}/>
                        <Route exact path ="/register" component={() => <LoginPage isLoginOnAct={false}/>}/>
                        
                        <PrivateStudentRoute exact path ="/student" component={() => <StudentPage/>}/>
                        <PrivateStudentRoute exact path ="/student/modifyAccount" component={() => <StudentAccountModification/>}/>

                        <PrivateTeacherRoute path ="/teacher" component={() => <TeacherPage/>}/>
                        <PrivateTeacherRoute exact path ="/teacher/modifyAccount" component={() => <TeacherAccountModification/>}/>


                        <PrivateAdminRoute path ="/admin" component={() => <AdminPage/>}/>
                        <PrivateAdminRoute exact path ="/admin/modifyAccount" component={() => <AdminAccountModification/>}/>

                        <Route component={ErrorPage}/>
                    </Switch>
                </Router>
        );
}

export default App;