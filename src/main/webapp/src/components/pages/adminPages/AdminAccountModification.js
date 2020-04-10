import React from 'react';
import PageNavbar from "../../layout/PageNavbar";
import EditAccount from '../../../containers/formsPages/EditAccount';
import auth from "../../../Auth";

const AdminAccountModification =()=> {

    const email = auth.parseJwt(auth.getToken()).sub;

    return (
        <div>
            <PageNavbar/>
            <EditAccount
                path="/api/admin/modify"
                email={email}
                token={auth.getToken()}
                adminTeacherEdition={false}/>
        </div>
    );
};

export default AdminAccountModification;