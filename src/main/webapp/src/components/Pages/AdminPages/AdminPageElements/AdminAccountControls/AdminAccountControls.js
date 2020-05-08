import React, {useState} from "react";
import AccountControl from "../../../AccountControl/AccountControl";
import classes from './AdminAccountControls.module.css'
import addControlToList from "../../../AccountControl/createControlsList";
import {Nav} from "reactstrap";

const AdminAccountControls = (props) => {
    const teachers = [], students = [], sections = [], subjects = [], topics = [];
    addControlToList(teachers,
        ['/admin', '/admin/add/T', '/admin/editteachersinsubject'],
        ["List Teachers", 'Add Teacher', 'Edit Teachers In Subject']);
    addControlToList(students,
        ['/admin/students', '/admin/add/S'],
        ["List Students", 'Add Student']);
    addControlToList(sections,
        ['/admin/sections', '/admin/addsection'],
        ["List Sections", 'Add Section']);
    addControlToList(subjects,
        ['/admin/subjects', '/admin/addsubject'],
        ["List Subjects", 'Add Subject']);
    addControlToList(topics,
        ['/admin/topics', '/admin/addtopic'],
        ["List Topics", 'Add Topic']);
    return (
        <React.Fragment>
            <p className={classes.Caption}>Admin Options:</p>
            <Nav>
                <AccountControl
                    mainLabel='Teachers:'
                    controls={teachers}/>
                <AccountControl
                    mainLabel='Students:'
                    controls={students}/>
                <AccountControl
                    mainLabel='Sections:'
                    controls={sections}/>
                <AccountControl
                    mainLabel='Subjects:'
                    controls={subjects}/>
                <AccountControl
                    mainLabel='Topics:'
                    controls={topics}/>
            </Nav>
        </React.Fragment>
    );
};

export default AdminAccountControls;

