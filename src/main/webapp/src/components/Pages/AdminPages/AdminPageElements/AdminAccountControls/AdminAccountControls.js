import React from "react";
import AdminAccountControl from "./AdminAccountControl/AdminAccountControl";
import classes from './AdminAccountControls.module.css'


const AdminAccountControls = (props) => {
    return (
        <React.Fragment>
            <p className={classes.Caption}>Admin Options:</p>
            <AdminAccountControl
                firstLink='/admin'
                firstButton="List Teachers"
                secondLink={'/admin/add/T'}
                secondButton='Add Teacher'
                onClick={props.addPerson}/>
            <AdminAccountControl
                firstLink='/admin/students'
                firstButton="List Students"
                secondLink={'/admin/add/S'}
                secondButton='Add Student'
                onClick={props.addPerson}/>

            <AdminAccountControl
                firstLink='/admin/sections'
                firstButton="List Sections"
                secondLink='/admin/addsection'
                secondButton='Add Section'/>

            <AdminAccountControl
                firstLink='/admin/subjects'
                firstButton="List Subjects"
                secondLink='/admin/addsubject'
                secondButton='Add Subject'/>

            <AdminAccountControl
                secondLink='/admin/editteachersinsubject'
                secondButton='Edit Teachers In Subject'/>

            <AdminAccountControl
                firstLink='/admin/topics'
                firstButton="List Topics"
                secondLink='/admin/addtopic'
                secondButton='Add Topics'/>

        </React.Fragment>
    );
};

export default AdminAccountControls;

