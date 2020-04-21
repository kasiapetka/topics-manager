import React from 'react';
import PageNavbar from "../../UI/Layout/PageNavbar";
import EditAccount from '../../../containers/FormsPages/EditAccount/EditAccount';
import auth from "../../../Auth";

const StudentAccountModification =()=> {
    const email = auth.parseJwt(auth.getToken()).sub;

    return (
        <div>
            <PageNavbar/>
            <EditAccount
                path="/api/teacher/modify"
                email={email}
                token={auth.getToken()}
                adminTeacherEdition={false}/>
        </div>
    );
};

export default StudentAccountModification;