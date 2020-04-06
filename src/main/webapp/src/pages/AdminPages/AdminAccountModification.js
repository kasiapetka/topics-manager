import React from 'react';
import PageNavbar from "../../components/PageNavbar";
import EditAccount from '../../containers/EditAccount';
import auth from "../../Auth";

const AdminAccountModification =()=> {

    const email =auth.getToken().sub();
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