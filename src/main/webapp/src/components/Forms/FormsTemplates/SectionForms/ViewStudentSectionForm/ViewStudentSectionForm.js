import React from "react";
import Label from "../../../FormElements/Label/Label";
import {Button} from "reactstrap";
import classes from "../../Forms.module.css";
import Input from "../../../FormElements/Input/Input";

const viewStudentSectionForm = (props) => {
    const classNames = "border rounded pt-4 pb-5 mt-5 mb-4 pr-3 pl-3 mb-3 " + classes.Form;
    let students = <li>No students in this section.</li>, state;

    if (props.students) {
        if (props.students.length === 0) {
            students = <li>No students in this section.</li>;
        } else {
            students = props.students.map(student => {
                return <li key={student.album}>
                    {student.name + ' ' + student.surname}
                </li>
            });
        }
    }

    if(props.section){
        if(props.section.state === 'O')
            state='Opened';
        else if(props.section.state === 'F')
            state='Finished';
        else if(props.section.state === 'C')
            state='Closed';
    }

    return (
        <div className={classNames}>
            <h3 className="text-center">Section Options: </h3>

            <Label label='name' content={props.section.name}/>

            <div className="form-row p-1">
                <Label label="size"
                       groupclasses='col-md-3'
                       content={props.section.sizeOfSection}/>

                <Label label="semester"
                       groupclasses='col-md-3 mr-auto ml-auto'
                       content={props.section.semester.semester}/>

                <Label label="semester"
                       groupclasses='col-md-3'
                       content={state}/>
            </div>

            <div>
                <Label label="members"
                       content={<ul>{students}</ul>}/>
            </div>

        </div>
    );
};

export default viewStudentSectionForm;