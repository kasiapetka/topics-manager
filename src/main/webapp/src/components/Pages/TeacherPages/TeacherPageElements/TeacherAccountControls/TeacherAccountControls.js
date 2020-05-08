import React from 'react'
import AccountControl from "../../../AccountControl/AccountControl";
import classes from './TeacherAccountControls.module.css'
import addControlToList from "../../../AccountControl/createControlsList";

const TeacherAccountControls = () => {
    const students=[],sections=[],subjects=[],topics=[];

    addControlToList(students,
        ['/teacher'], ["List Students"]);
    addControlToList(sections,
        ['/teacher/sections','/teacher/addsection'],
        ["List Sections",'Add Section']);
    addControlToList(subjects,
        ['/teacher/subjects'],
        ["List Subjects"]);
    addControlToList(topics,
        ['/teacher/topics','/teacher/addtopic'],
        ["List Topics",'Add Topic']);

    return (
        <React.Fragment>
            <p className={classes.Caption}>Teacher Options:</p>
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

        </React.Fragment>
    );
};


export default TeacherAccountControls;