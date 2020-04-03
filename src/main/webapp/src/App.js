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
import PrivateStudentRoute from "./privateRoutes/PrivateStudentRoute";
import PrivateTeacherRoute from "./privateRoutes/PrivateTeacherRoute";
import PrivateAdminRoute from "./privateRoutes/PrivateAdminRoute";

import StudentAccountModification from "./pages/StudentPages/StudentAccountModification";

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
                        <PrivateAdminRoute exact path ="/admin" component={() => <AdminPage/>}/>
                        <Route component={ErrorPage}/>
                    </Switch>
                </Router>
        );
}

export default App;