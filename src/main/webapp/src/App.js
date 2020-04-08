import React from 'react';
import {BrowserRouter as Router,
    Route,
    Switch} from 'react-router-dom';
import MainPage from "./components/pages";
import ErrorPage from "./components/pages/ErrorPage";
import LoginPage from "./components/pages/LoginPage";
import StudentPage from "./containers/studentPages/StudentPage";
import TeacherPage from "./containers/teacherPages/TeacherPage";
import AdminPage from "./containers/adminPages/AdminPage";
import PrivateStudentRoute from "./components/privateRoutes/PrivateStudentRoute";
import PrivateTeacherRoute from "./components/privateRoutes/PrivateTeacherRoute";
import PrivateAdminRoute from "./components/privateRoutes/PrivateAdminRoute";
import TeacherAccountModification from "./components/pages/teacherPages/TeacherAccountModification";
import StudentAccountModification from "./components/pages/studentPages/StudentAccountModification";
import AdminAccountModification from "./components/pages/adminPages/AdminAccountModification";

const App = () => {
        return(
                <Router>
                    <Switch>
                        <Route exact path ="/" component={MainPage}/>
                        <Route exact path ="/login" component={() => <LoginPage isLoginOnAct={true} />}/>
                        <Route exact path ="/register" component={() => <LoginPage isLoginOnAct={false}/>}/>
                        <PrivateStudentRoute exact path ="/student" component={() => <StudentPage/>}/>
                        <PrivateStudentRoute exact path ="/student/modifyAccount" component={() => <StudentAccountModification/>}/>

                        <PrivateTeacherRoute exact path ="/teacher" component={() => <TeacherPage/>}/>
                        <PrivateTeacherRoute exact path ="/teacher/modifyAccount" component={() => <TeacherAccountModification/>}/>

                        <PrivateAdminRoute exact path ="/admin" component={() => <AdminPage/>}/>
                        <PrivateAdminRoute exact path ="/admin/modifyAccount" component={() => <AdminAccountModification/>}/>

                        <Route component={ErrorPage}/>
                    </Switch>
                </Router>
        );
}

export default App;