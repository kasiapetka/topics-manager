import React from 'react';
import classes from "../../../Forms.module.css";
import Label from "../../../../FormElements/Label/Label";

const viewPresenceForm = (props) => {
    const classNames = "border rounded pt-4 pb-5 mt-5 mb-4 pr-3 pl-3 " + classes.Form;
    let date = <p>No grades in the section yet.</p>, students;

    if(props.grades){
        date =props.grades.date;
    }

    if (props.grades.students) {
        if(props.grades.students.length === 0){
            students = <li>No students in this section</li>
        }else {

            students = props.grades.students.map((student) => {

                return <li key={student.album} className='form-row border-bottom w-75'>
                    <div className='col-md-4 pt-3'>{student.name}</div>
                    <div className='col-md-4 pt-3'>{student.surname}</div>
                    <div className='col-md-4 pt-3'>{student.grade ? student.grade : '-'}</div>
                </li>
            });
        }
    }

    return (
        <div className={classNames}>
            <h3 className="text-center mt-2">View Grades</h3>

            <Label label="date"
                   content={date}/>

            <Label label="grades"
                   content={<ul>{students}</ul>}/>
        </div>
    )
};

export default viewPresenceForm;