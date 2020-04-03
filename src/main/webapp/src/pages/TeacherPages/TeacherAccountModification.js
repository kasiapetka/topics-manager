import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import PageNavbar from "../../components/PageNavbar";
import EditAccount from '../../containers/EditAccount';

const StudentAccountModification =()=> {

    return (
        <div>
            <PageNavbar/>
            <EditAccount/>
        </div>
    );
};

export default StudentAccountModification;