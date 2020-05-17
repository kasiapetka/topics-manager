import React from 'react';
import classes from './Messages.module.css';
import {Form, Button} from "reactstrap";
import SubmitButton from "../Forms/FormElements/Button/Button";
import Input from "../Forms/FormElements/Input/Input";
import ListPersons from "../../containers/Lists/ListPersons";
import Label from "../Forms/FormElements/Label/Label";

const newMessageForm = (props) => {
    const classNames = "border rounded pt-4 pb-5 mb-4 pr-3 pl-3 " + classes.Messages;
    let semPicker, receiverPicker, sectionPicker,receivers;
    const semesters = [2, 3, 4, 5, 6, 7];
    let semOptions = semesters.map(sem => {
        return <option key={sem}
                       value={sem}>{sem}</option>
    });
    if (props.receivers) {
        if (props.receivers.length === 0) {
            receivers = <li>No students in this section.</li>;
        } else {
            receivers = props.receivers.map(receiver => {
                return <li key={receiver}>
                    {receiver}
                </li>
            });
        }
    }
    if (props.reciever) {
        if (props.reciever !== 'teacher') {
            semPicker = <Input type="select" name="semester" id="exampleSem"
                               groupclasses="col-md-4"
                               label="Semester"
                               value={props.semester} onChange={props.onSemesterChange}>
                <option value='1'>1</option>
                {semOptions}
            </Input>
        }
        if (props.reciever === 'section') {
            sectionPicker = <Input type="select" name="section"
                                   groupclasses="col-md-4"
                                   label="Section" defaultValue='default'
                                   onChange={props.onSectionChange}>
                <option disabled={true} value='default'>Choose Section</option>
                {
                    props.sections.map(section => {
                        return <option key={section.id}
                                       value={section.id}>{section.name}</option>
                    })
                }
            </Input>
        }
    }
    if (props.showList) {
        if (props.reciever === 'student') {
            receiverPicker = <ListPersons path={"/api/common/students/" + props.semester} semester={props.semester}/>
        } else if (props.reciever === 'section') {
            receiverPicker = <ListPersons path={"/api/common/sections/" + props.section} semester={props.semester}/>
        } else if (props.reciever === 'teacher') {
            receiverPicker = <ListPersons path={"/api/common/teachers"}/>
        }
    }

    return (
        <Form className={classNames}>
            <h3 className="text-center mt-2">New Message</h3>
            <Label label="receivers"
                   content={<ul>{receivers}</ul>}/>
            <div className="form-row p-1">
                <Input type="email" name="subject"
                       groupclasses="col-md-10"
                       onChange={props.onChange}
                       value={props.person}
                       label="Send to" placeholder="To"/>
                <Button className="col-md-2 h-25 mt-5"
                        disabled={!props.addButton}
                        onClick={props.addPersonToList}>Add To List</Button>
            </div>
            <div className="form-row p-1">
                <Input type="select" name="receiver"
                       defaultValue='default' label="receiver"
                       groupclasses="col-md-4" onChange={props.changeReceivers}>
                    <option disabled={true} value='default'>Choose Receiver</option>
                    <option value='section'>Section</option>
                    <option value='teacher'>Teachers</option>
                    <option value='student'>Students</option>
                </Input>
                {semPicker}
                {sectionPicker}
            </div>
            {receiverPicker}

            <Input type="text" name="subject" placeholder="Subject"/>
            <Input type="textarea" rows={6} name="message"/>

            <SubmitButton label='send message'/>
        </Form>
    );
};

export default newMessageForm;