import React from 'react';
import {Button, Form, FormGroup, Input, Label} from "reactstrap";
import classes from "../Forms.module.css";

const sectionFormInputs = (props) => {
    const classNames = "border rounded pt-4 pb-5 mt-5 pr-3 pl-3 " + classes.Form;

    const subjectOptions = props.subjects.map(subject => {
        return <option
            value={subject.id}
            key={subject.id}>
            {subject.name}
        </option>
    });

    let topicOptions;

    if (props.topics) {
        if (props.topics.length !== 0) {
            topicOptions = props.topics.map(subject => {
                return <option
                    value={subject.id}
                    key={subject.id}>
                    {subject.name}
                </option>
            })

        } else {
            topicOptions = <option disabled={true} value='default'>No Topics in this Subject</option>;
        }
    }

    return (
        <Form className={classNames}>
            <h3 className="text-center mt-2">Add New Section</h3>
            {/*--------------------Subject Topic and Name---------------------------------- */}
            <FormGroup className="mb-2 ml-auto mr-auto mt-3 p-2">
                <Label for="exampleSubject" className="mr-2 pl-1">Subject</Label>
                <Input type="select" name="subject" id="exampleSubject"
                       defaultValue='default' onChange={props.onSubjectChange}>
                    <option disabled={true} value='default'>Choose Subject</option>
                    {subjectOptions}
                </Input>
            </FormGroup>

            {
                props.topics
                    ?
                    <FormGroup className="mb-2 ml-auto mr-auto mt-3 p-2">
                        <Label for="exampleTopic" className="mr-2 pl-1">Topic</Label>
                        <Input type="select" name="topic" id="exampleTopic" defaultValue='default'>
                            {topicOptions}
                        </Input>
                    </FormGroup>
                    :
                    null
            }

            <FormGroup className="mb-2 ml-auto mr-auto mt-3 p-2">
                <Label for="exampleName" className="mr-2 pl-1">Name</Label>
                <Input type="text" name="name" id="exampleName" minLength="5" placeholder="Enter Section Name"
                />
            </FormGroup>
            {/*-------------------------------------------------------------------------------------- */}
            <div className="form-row p-2">
                <FormGroup className="mb-2 mt-3 col-md-3">
                    <Label for="exampleSize" className="mr-2 pl-1">Size</Label>
                    <Input type="number" name="size" id="exampleSize" min='1'/>
                </FormGroup>
                <FormGroup className="mb-2 mt-3 col-md-3 mr-auto ml-auto">
                    <Label for="exampleSem" className="mr-2 pl-1">Semester</Label>
                    <Input type="number" name="semester" id="exampleSem" min='1' max='7'/>
                </FormGroup>
                <FormGroup className="mb-2 mt-3 col-md-3">
                    <Label for="exampleState" className="mr-2 pl-1">State</Label>
                    <Input type="select" name="state" id="exampleSate">
                        <option value={true}>Opened</option>
                        <option value={false}>Closed</option>
                    </Input>
                </FormGroup>
            </div>
            <div className="form-row text-center pt-4">
                <div className="col-md-12">
                    <Button type="submit" className="btn btn-primary">Create Section</Button>
                </div>
            </div>
        </Form>
    )
};

export default sectionFormInputs;