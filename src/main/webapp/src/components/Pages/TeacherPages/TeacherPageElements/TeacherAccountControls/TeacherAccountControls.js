import React from 'react'
import TeacherAccountControl from "./TeacherAccountControl/TeacherAccountControl";
import classes from './TeacherAccountControls.module.css'

const TeacherAccountControls = () => {

    return (
        <React.Fragment>
            <p className={classes.Caption}>Teacher Options:</p>

            <TeacherAccountControl
                firstLink='/teacher'
                firstButton="List Students"
            />
            <TeacherAccountControl
                firstLink='/teacher/subjects'
                firstButton="List Subjects"
            />
            <TeacherAccountControl
                firstLink='/teacher/sections'
                firstButton="List Sections"
                secondLink='/teacher/addsection'
                secondButton='Add Section'
            />

            <TeacherAccountControl
                firstLink='/teacher/topics'
                firstButton="List Topic"
                secondLink='/teacher/addtopic'
                secondButton='Add Topic'
            />
            <TeacherAccountControl
                secondLink='/teacher/jointopic'
                secondButton='Join Topic'
            />

        </React.Fragment>
    );
};


export default TeacherAccountControls;