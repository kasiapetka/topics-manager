import React from 'react';
import classes from "../../../Forms.module.css";
import Label from "../../../../FormElements/Label/Label";
import Input from "../../../../FormElements/Input/Input";
import Button from "../../../../FormElements/Button/Button";
import Form from "react-bootstrap/Form";

const issuePresenceForm = (props) => {
    const classNames = "border rounded pt-4 pb-5 mt-5 mb-4 pr-3 pl-3 " + classes.Form;
    let students = <li>No students in this section</li>;

    if (props.students) {
        if(props.students.length === 0){
            students = <li>No students in this section</li>
        }else {
            students = props.students.map((student, index) => {
                return <li key={student.album} className='form-row'>
                    <div className='col-md-5 pt-3'>{student.name + ' ' + student.surname}</div>
                    <div className='col-md-2'></div>
                    <Input type='select' name='state'
                           groupclasses='col-md-3 d-inline-block'
                           onChange={(event) => props.onPresenceChange(event, index)}
                           value={student.present}>
                        <option value={true}>Present</option>
                        <option value={false}>Absent</option>
                    </Input>
                    <div className='col-md-2'></div>
                </li>
            });
        }
    }

    return (
        <Form className={classNames} onSubmit={props.onIssuePresenceSubmit}>
            <h3 className="text-center mt-2">Issue Presence</h3>

            <Input type='date' name='date' label='date'
                   onChange={props.onDateChange}
                   value={props.date}
            />

            <div className="form-row">
                <Label label="members"
                       groupclasses='col-md-12'
                       content={<ul>{students}</ul>}/>
            </div>

            <Button label='issue presence'/>
        </Form>
    )
};

export default issuePresenceForm;