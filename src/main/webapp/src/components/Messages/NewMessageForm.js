import React from 'react';
import classes from './Messages.module.css';
import {Form, FormGroup} from "reactstrap";
import Button from "../Forms/FormElements/Button/Button";
import Input from "../Forms/FormElements/Input/Input";
import ListPersons from "../../containers/Lists/ListPersons";

const newMessageForm = (props) => {
    const classNames = "border rounded pt-4 pb-5 mb-4 pr-3 pl-3 " + classes.Messages;
    let semPicker, receiverPicker, sectionPicker;
    const semesters = [2, 3, 4, 5, 6, 7];
    let semOptions = semesters.map(sem => {
        return <option key={sem}
                       value={sem}>{sem}</option>
    });

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
            sectionPicker = <Input type="select" name="semester"
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
            receiverPicker=  <ListPersons path={"/api/common/sections/" + props.section} semester={props.semester}/>
        } else if (props.reciever === 'teacher') {
            receiverPicker= <ListPersons path={"/api/common/teachers"}/>
        }
    }

    return (
        <Form className={classNames}>
            <h3 className="text-center mt-2">New Message</h3>
            <Input type="text" name="subject" label="Send to" placeholder="To"/>

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

            <Button label='send message'/>
        </Form>
    );
};

export default newMessageForm;