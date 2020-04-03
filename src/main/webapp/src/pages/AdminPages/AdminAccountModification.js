import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import PageNavbar from "../../components/PageNavbar";
import EditAccount from '../../containers/EditAccount';

const AdminAccountModification =()=> {

    return (
        <div>
            <PageNavbar/>
            <EditAccount/>
        </div>
    );
};

export default AdminAccountModification;