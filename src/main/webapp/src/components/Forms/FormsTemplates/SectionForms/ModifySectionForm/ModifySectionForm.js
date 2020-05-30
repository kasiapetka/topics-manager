import React from "react";
import Label from "../../../FormElements/Label/Label";
import {Badge, Button, Col, FormGroup, FormText, Row} from "reactstrap";
import classes from "../../Forms.module.css";
import Input from "../../../FormElements/Input/Input";

const modifySectionForm = (props) => {
    const classNames = "border rounded pt-4 pb-5 mt-5 mb-4 pr-3 pl-3 mb-3 " + classes.Form;
    let students = <li>No students in this section.</li>, modifyMembers, issue,
        view, sectionFinished;
    let options = <React.Fragment>
        <option value={'O'}>Opened</option>
        <option value={'C'}>Closed</option>
        <option value={'F'}>Finished</option>
    </React.Fragment>;
    let attachmentList= <span>No attachements.</span>;;

    if (props.files) {
        if (props.files.length === 0) {
            attachmentList = <span>No attachements.</span>;
        } else {
            attachmentList = props.files.map(file => {
                return <Row key={file.fileDownloadUri} className="p-1 mr-0 ml-0">
                    <Col xs="12"
                         onClick={()=>window.open(file.fileDownloadUri)}
                         className={classes.File}>{file.fileName}</Col>
                </Row>
            });
        }
    }
    let attachments = <Label label="attachments"
                     content={attachmentList}/>;

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
        attachments=null;
    } else if (props.section.state === 'C') {
        issue = <div className="form-row p-2">
            <div className='col-md-1'></div>
            <Button className='col-md-4'
                    onClick={props.onIssuePresence} outline> Issue Presence</Button>
            <div className='col-md-2'></div>
            <Button className='col-md-4'
                    onClick={props.onIssueGrades} outline> Issue Grades</Button>
            <div className='col-md-1'></div>
        </div>;

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
            <div className='col-md-3'></div>
            <Badge className='col-md-6 p-2'>This section is finished.</Badge>
            <div className='col-md-3'></div>
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
                    {options}
                </Input>
            </div>
            <div>
                <Label label="members"
                       content={<ul>{students}</ul>}/>
            </div>
            {modifyMembers}
            {attachments}
            {issue}
            {view}
            {sectionFinished}
        </div>
    );
};

export default modifySectionForm;