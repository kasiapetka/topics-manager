import React from "react";
import Label from "../../../FormElements/Label/Label";
import {Badge, Button} from "reactstrap";
import classes from "../../Forms.module.css";
import Input from "../../../FormElements/Input/Input";

const modifySectionForm = (props) => {
    const classNames = "border rounded pt-4 pb-5 mt-5 mb-4 pr-3 pl-3 mb-3 " + classes.Form;
    let students = <li>No students in this section.</li>, modifyMembers, issue, view, sectionFinished;

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

    if (props.section.state === 'O') {
        modifyMembers = <div className="form-row p-2">
            <div className='col-md-3'></div>
            <Button className='col-md-6'
                    onClick={props.onModifyMembers} outline>
                Modify Section Members</Button>
            <div className='col-md-3'></div>
        </div>
    } else if (props.section.state === 'C') {
        issue = <div className="form-row p-2">
            <div className='col-md-1'></div>
            <Button className='col-md-4'
                    onClick={props.onIssuePresence} outline> Issue Presence</Button>
            <div className='col-md-2'></div>
            <Button className='col-md-4'
                    onClick={props.onIssueGrades} outline> Issue Grades</Button>
            <div className='col-md-1'></div>
        </div>

        view = <div className="form-row p-2">
            <div className='col-md-1'></div>
            <Button className='col-md-4'
                    onClick={props.onViewPresence} outline> View Presence</Button>
            <div className='col-md-2'></div>
            <Button className='col-md-4'
                    onClick={props.onViewGrades} outline> View Grades</Button>
            <div className='col-md-1'></div>
        </div>
    } else if (props.section.state === 'F') {
        sectionFinished = <div className="form-row p-2">
            <Badge className='col-md-6 p-2'>This section is finished.</Badge>;
        </div>
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

                <Input type='select' label="state" name='state'
                       groupclasses='col-md-3'
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
            {modifyMembers}
            {issue}
            {view}
            {sectionFinished}
        </div>
    );
};

export default modifySectionForm;