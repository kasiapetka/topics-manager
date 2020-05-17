import React, {useState} from "react";
import Label from "../../../FormElements/Label/Label";
import {Badge, Button} from "reactstrap";
import classes from "../../Forms.module.css";

const ModifyStudentSectionForm = (props) => {
    const [showDetails, setShowDetails] = useState(false);
    const classNames = "border rounded pt-4 pb-5 mb-4 pr-3 pl-3 mb-3 " + classes.Form;
    let students = <li>No students in this section.</li>, state, details,showPresence,
        join = <Badge className='col-md-6 p-2'>You left the section.</Badge>;

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

    if (props.section) {
        if (props.isInSection) {
            join = <Button className='col-md-6' onClick={props.leaveSection}
                           color='danger'>Leave section</Button>
            showPresence = <Button className='col-md-6 shadow-sm mt-5 mb-3'
                                   onClick={props.showPresence}>Show Presence</Button>
        }
        if (props.section.state === 'O') {
            state = 'Opened';
        } else if (props.section.state === 'F')
            state = 'Finished';
        else if (props.section.state === 'C')
            state = 'Closed';
    }

    if (showDetails) {
        details = (<React.Fragment>
            <div className="form-row p-1">
                <Label label="teacher"
                       groupclasses='col-md-6'
                       content={props.teacher.name + ' ' + props.teacher.surname}/>
                <Label label='teacher email'
                       groupclasses='col-md-6'
                       content={props.teacher.email}/>
            </div>

            <div className="form-row p-1">
                <Label label="topic"
                       groupclasses='col-md-6'
                       content={props.section.topic}/>

                <Label label="subject"
                       groupclasses='col-md-6 mr-auto ml-auto'
                       content={props.section.subject}/>
            </div>

            <div className="form-row p-1">
                <Label label="size"
                       groupclasses='col-md-3'
                       content={props.section.sizeOfSection}/>
                <Label label="semester"
                       groupclasses='col-md-3 mr-auto ml-auto'
                       content={props.section.semester.semester}/>
                <Label label="state"
                       groupclasses='col-md-3'
                       content={state}/>
            </div>
        </React.Fragment>)
    }

    return (
        <div className={classNames}>
            <h3 className="text-center">Section Options: </h3>
            <Label label='name' content={props.section.name}/>

            <div className="form-row p-1">
                <div className='col-md-4'></div>
                <Button className='col-md-4 btn-sm' outline
                    onClick={() => setShowDetails(!showDetails)}>
                    {showDetails ? 'Hide' : 'Show'} Details</Button>
                <div className='col-md-4'></div>
            </div>
            {details}

            <div>
                <Label label="members"
                       content={<ul>{students}</ul>}/>
            </div>

            <div className="form-row p-1">
                <Label label="grade"
                       groupclasses='col-md-6'
                       content={props.grade ? props.grade : 'No grade yet.'}/>
                {showPresence}
            </div>

            <div className="form-row p-1">
                <div className='col-md-3'></div>
                {join}
                <div className='col-md-3'></div>
            </div>
        </div>
    );
};

export default ModifyStudentSectionForm;