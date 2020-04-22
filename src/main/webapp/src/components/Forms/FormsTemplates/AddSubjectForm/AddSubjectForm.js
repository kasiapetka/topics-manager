import React from 'react';
import {Button, Form, FormGroup, Input, Label} from "reactstrap";
import classes from "../Forms.module.css";


const addSubjectForm = (props) => {
    const classNames = "border rounded pt-4 pb-5 mt-5 pr-3 pl-3 " + classes.Form;

    return (
        <Form className={classNames} onSubmit={props.submit}>
            <h3 className="text-center">Fill in subject's form</h3>

            <FormGroup className="p-2 mb-2 mt-2">
                <Label for="exampleName" className="mr-2 pl-1"> Name</Label>
                <Input type="text" name="name" id="exampleName" placeholder="Enter Name"
                       value={props.subject.name || ''}
                       onChange={props.change}
                       invalid={props.emptyForm && props.subject.name===""}/>
            </FormGroup>
            <FormGroup className="p-2 mb-2 mt-2">
                <Label for="exampleText">Subject Summary</Label>
                <Input type="textarea" rows={4} name="text" id="exampleText"
                       value={props.subject.summary || ''}
                       onChange={props.change}/>
            </FormGroup>

            <div className="form-row text-center pt-3">
                <div className="col-md-12">
                    <Button type="submit" className="btn btn-primary mt-2">Add Subject</Button>
                </div>
            </div>
        </Form>
    )
};

export default addSubjectForm;