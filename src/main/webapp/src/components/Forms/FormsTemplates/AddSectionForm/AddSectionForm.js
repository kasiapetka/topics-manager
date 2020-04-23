import React from 'react';
import {Button, Form, FormGroup, Input, Label} from "reactstrap";
import classes from "../Forms.module.css";
import SizeSemStateInputs from "./FormInputs/SizeSemStateInputs";

const addSectionForm = (props) => {
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
            topicOptions = props.topics.map(topic => {
                return <option
                    value={topic.id}
                    key={topic.id}>
                    {topic.name}
                </option>
            })

        } else {
            topicOptions = <option disabled={true} value=''>No Topics in this Subject</option>;
        }
    }

    return (
        <Form className={classNames} onSubmit={props.onSubmit}>
            <h3 className="text-center mt-2">Add New Section</h3>
            {/*--------------------Subject Topic and Name---------------------------------- */}
            <FormGroup className="p-2 mb-2 mt-2">
                <Label for="exampleSubject" className="mr-2 pl-1">Subject</Label>
                <Input type="select" name="subject" id="exampleSubject"
                       defaultValue='default' onChange={props.onSubjectChange}
                       invalid={props.emptyForm && props.section.subject===''}>
                    <option disabled={true} value='default'>Choose Subject</option>
                    {subjectOptions}
                </Input>
            </FormGroup>

            {
                props.topics
                    ?
                    <FormGroup className="p-2 mb-2 mt-2">
                        <Label for="exampleTopic" className="mr-2 pl-1">Topic</Label>
                        <Input type="select" name="topic" id="exampleTopic"
                               defaultValue='default' onChange={props.onChange}
                               invalid={props.emptyForm && props.section.topic===''}>
                            <option disabled={true} value='default'>Choose Topic</option>
                            {topicOptions}
                        </Input>
                    </FormGroup>
                    :
                    null
            }

            <FormGroup className="p-2 mb-2 mt-2">
                <Label for="exampleName" className="mr-2 pl-1">Name</Label>
                <Input type="text" name="name" id="exampleName"
                       minLength="5" placeholder="Enter Section Name"
                       onChange={props.onChange} value={props.section.name || ''}
                       invalid={props.emptyForm && props.section.name===''}/>
            </FormGroup>
            {/*-------------------------------------------------------------------------------------- */}
            <SizeSemStateInputs
                onChange={props.onChange}
                section={props.section}
                emptyForm={props.emptyForm}/>

            <div className="form-row text-center pt-4">
                <div className="col-md-12">
                    <Button type="submit" className="btn btn-primary">Create Section</Button>
                </div>
            </div>
        </Form>
    )
};

export default addSectionForm;