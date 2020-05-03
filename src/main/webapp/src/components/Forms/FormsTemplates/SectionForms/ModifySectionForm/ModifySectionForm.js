import React from "react";
import Label from "../../../FormElements/Label/Label";
import {Form, Button} from "reactstrap";
import SubmitButton from "../../../FormElements/Button/Button";
import classes from "../../Forms.module.css";
import Input from "../../../FormElements/Input/Input";


const modifySectionForm = (props) => {
    const classNames = "border rounded pt-4 pb-5 mt-5 mb-4 pr-3 pl-3 mb-3 " + classes.Form;
    let students;

    if (props.students) {
        students = props.students.map(student => {
            return <li key={student.album}>
                {student.name + ' ' + student.surname}
            </li>
        });
    } else {
        students = <li>No students in this section</li>
    }

    return (
        <Form className={classNames} onSubmit={props.submit}>
            <h3 className="text-center">Section Options: </h3>

            <Label label='name' content={props.section.name}/>

            <div className="form-row p-1">
                <Label label="size"
                       groupclasses='col-md-3'
                       content={props.section.sizeOfSection}/>

                <Label label="semester"
                       groupclasses='col-md-3 mr-auto ml-auto'
                       content={props.section.semester.semester}/>

                <Input type='select' label="state" name='state'
                       groupclasses='col-md-3'
                       content={props.section.state}
                       onChange={props.onStateChange}
                       value={props.section.state}>
                    <option value={'O'}>Opened</option>
                    <option value={'C'}>Closed</option>
                    <option value={'F'}>Finished</option>
                </Input>
            </div>

            <div>
                <Label label="members"
                       content={<ul>{students}</ul>}/>
            </div>

            <div className="form-row p-2">
                <div className='col-md-1'></div>
                <Button className='col-md-4' outline>Issue Presence</Button>
                <div className='col-md-2'></div>
                <Button className='col-md-4' outline>Issue Grades</Button>
                <div className='col-md-1'></div>
            </div>
            <div className="form-row p-2">
                <div className='col-md-1'></div>
                <Button className='col-md-4' outline>Show Presence</Button>
                <div className='col-md-2'></div>
                <Button className='col-md-4' outline>Show Grades</Button>
                <div className='col-md-1'></div>
            </div>
        </Form>
    );
};

export default modifySectionForm;