import React, {useState} from "react";
import CustomLabel from "../../../FormElements/Label/Label";
import {Badge, Button, FormGroup, FormText, Input, Label} from "reactstrap";
import classes from "../../Forms.module.css";
import CustomInput from "../../../FormElements/Input/Input";

const ModifyStudentSectionForm = (props) => {
    const [showDetails, setShowDetails] = useState(false);
    const classNames = "border rounded pt-4 pb-5 mb-4 pr-3 pl-3 mb-3 " + classes.Form;
    let students = <li>No students in this section.</li>, state, details, showPresence,
        join = <Badge className='col-md-6 p-2'>You left the section.</Badge>;
    let attachments = <div>
        <CustomLabel label="attachments"
               content={<ul>
                   <li>aaaa</li>
               </ul>}/>
        <div className="form-row p-1">
            <div className="col-md-1"></div>
            <FormGroup className="p-2 col-md-6 mb-0">
                <Input type="file" name="file" onChange={props.fileChanged}/>
                <FormText color="muted">
                    Max file size is 50MB.
                </FormText>
            </FormGroup>
            <div className="col-md-1"></div>
            <Button className="btn-sm mt-3 mb-3"
                    onClick={props.fileUpload}
                    color='info'>Upload File</Button>
        </div>
    </div>;

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
            join = <Button className='col-md-4 mt-3 btn-sm' onClick={props.leaveSection}
                           color='danger'>Leave section</Button>
            showPresence = <Button className='col-md-6 shadow mt-5 mb-3 btn-light border'
                                   onClick={props.showPresence}>Show Presence</Button>
        }
        if (props.section.state === 'O') {
            attachments = null;
            state = 'Opened';
        } else if (props.section.state === 'F')
            state = 'Finished';
        else if (props.section.state === 'C')
            state = 'Closed';
    }

    if (showDetails) {
        details = (<React.Fragment>
            <div className="form-row p-1">
                <CustomLabel label="teacher"
                       groupclasses='col-md-6'
                       content={props.teacher.name + ' ' + props.teacher.surname}/>
                <CustomLabel label='teacher email'
                       groupclasses='col-md-6'
                       content={props.teacher.email}/>
            </div>

            <div className="form-row p-1">
                <CustomLabel label="topic"
                       groupclasses='col-md-6'
                       content={props.section.topic}/>

                <CustomLabel label="subject"
                       groupclasses='col-md-6 mr-auto ml-auto'
                       content={props.section.subject}/>
            </div>

            <div className="form-row p-1">
                <CustomLabel label="size"
                       groupclasses='col-md-3'
                       content={props.section.sizeOfSection}/>
                <CustomLabel label="semester"
                       groupclasses='col-md-3 mr-auto ml-auto'
                       content={props.section.semester.semester}/>
                <CustomLabel label="state"
                       groupclasses='col-md-3'
                       content={state}/>
            </div>
        </React.Fragment>)
    }

    return (
        <div className={classNames}>
            <h3 className="text-center">Section Options: </h3>
            <CustomLabel label='name' content={props.section.name}/>

            <div className="form-row p-1">
                <div className='col-md-4'></div>
                <Button className='col-md-4 shadow-sm btn-light btn-sm'
                        onClick={() => setShowDetails(!showDetails)}>
                    {showDetails ? 'Hide' : 'Show'} Details</Button>
                <div className='col-md-4'></div>
            </div>
            {details}

            <div>
                <CustomLabel label="members"
                       content={<ul>{students}</ul>}/>
            </div>
            {attachments}

            <div className="form-row p-1">
                <CustomLabel label="grade"
                       groupclasses='col-md-6'
                       content={props.grade ? props.grade : 'No grade yet.'}/>
                {showPresence}
            </div>

            <div className="form-row p-1">
                <div className='col-md-4'></div>
                {join}
                <div className='col-md-4'></div>
            </div>
        </div>
    );
};

export default ModifyStudentSectionForm;