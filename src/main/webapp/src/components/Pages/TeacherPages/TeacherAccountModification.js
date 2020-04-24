import React from 'react';
import PageNavbar from "../../Navigation/Navbar/Navbar";
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