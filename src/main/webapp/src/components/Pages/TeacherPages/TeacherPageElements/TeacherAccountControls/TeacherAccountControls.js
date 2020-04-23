import React,{useState} from 'react'
import TeacherAccountControl from "./TeacherAccountControl/TeacherAccountControl";
import classes from './TeacherAccountControls.module.css'
import {Button} from "reactstrap";

const TeacherAccountControls = () => {
    const [showOptions, setShowOptions] = useState(true);

    return(
    <React.Fragment>
        <p  className={classes.Caption}>Teacher Options:</p>
        <div className={classes.Toggle}>
            <Button onClick={()=>setShowOptions(!showOptions)}>Teacher Options:</Button>
        </div>
        {
            showOptions
                ?
                <React.Fragment>
            <TeacherAccountControl
                firstLink='/teacher'
                firstButton="List Students"
            />
            <TeacherAccountControl
            firstLink='/teacher/subjects'
            firstButton="List Subjects"
            />

            <TeacherAccountControl
            firstLink='/teacher/topics'
            firstButton="List Topic"
            secondLink='/teacher/addtopic'
            secondButton='Add Topic'
            />

            <TeacherAccountControl
            firstLink='/teacher/sections'
            firstButton="List Sections"
            secondLink='/teacher/addsection'
            secondButton='Add Section'
            />
                </React.Fragment>
            :
            null
        }

    </React.Fragment>
    );
};


export default TeacherAccountControls;