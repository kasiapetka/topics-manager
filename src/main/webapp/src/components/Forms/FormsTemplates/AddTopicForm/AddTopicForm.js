import React from 'react';
import {Button, Form, FormGroup, Input, Label} from "reactstrap";
import classes from "../Forms.module.css";

const addTopicForm = (props) => {
    const classNames = "border rounded pt-4 pb-5 mt-5 pr-3 pl-3 " + classes.Form;

    const subjectOptions = props.subjects.map(subject => {
        return <option
            value={subject.id}
            key={subject.id}>
            {subject.name}
        </option>
    });

    return (
        <Form className={classNames} onSubmit={props.onSubmit}>
            <h3 className="text-center mt-2">Add New Topic</h3>
            {/*--------------------Subject Topic and Name---------------------------------- */}
            <FormGroup className="p-2 mb-2 mt-2">
                <Label for="exampleSubject" className="mr-2 pl-1">Subject</Label>
                <Input type="select" name="subject" id="exampleSubject"
                       defaultValue='default' onChange={props.onChange}
                       invalid={props.emptyForm && props.topic.subject===null}>
                    <option disabled={true} value='default'>Choose Subject</option>
                    {subjectOptions}
                </Input>
            </FormGroup>

            <FormGroup className="p-2 mb-2 mt-2">
                <Label for="exampleName" className="mr-2 pl-1">Name</Label>
                <Input type="text" name="name" id="exampleName"
                       minLength="5" placeholder="Enter Section Name"
                       onChange={props.onChange} value={props.topic.name || ''}
                       invalid={props.wrongName || props.emptyForm && props.topic.name===''}/>
            </FormGroup>

            <FormGroup className="p-2 mb-2 mt-2">
                <Label for="exampleText">Topic Summary</Label>
                <Input type="textarea" rows={4} name="summary" id="exampleText"
                       value={props.topic.summary || ''}
                       onChange={props.onChange}/>
            </FormGroup>

            <div className="form-row text-center pt-4">
                <div className="col-md-12">
                    <Button type="submit" className="btn btn-primary">Create Topic</Button>
                </div>
            </div>
        </Form>
    )
};

export default addTopicForm;