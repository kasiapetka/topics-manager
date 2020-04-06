import React from 'react';
import PageNavbar from "../../components/PageNavbar";
import EditAccount from '../../containers/EditAccount';
import auth from '../../Auth'

const StudentAccountModification =()=> {
    const email =auth.getToken().sub();
    return (
        <div>
            <PageNavbar/>
            <EditAccount
            path="/api/student/modify"
            email={email}
            token={auth.getToken()}
            adminTeacherEdition={false}/>
        </div>
    );
};

export default StudentAccountModification;