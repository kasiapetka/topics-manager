import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import PageNavbar from "../../components/PageNavbar";
import EditAccount from '../../components/EditAccount';

const StudentAccountModification =()=> {

    return (
        <div>
            <PageNavbar/>
            <EditAccount/>
        </div>
    );
};

export default StudentAccountModification;