import React from 'react';
import {FaUserAlt} from "react-icons/fa";
import {Link} from 'react-router-dom';
import {Button, Form, FormGroup, Input, Label} from "reactstrap";
import classes from "../Forms.module.css";

const sectionFormInputs = (props) => {
    const classNames = "border rounded pt-4 pb-5 mt-5 pr-3 pl-3 " + classes.Form;

    return (
        <Form className={classNames}>
            <h3 className="text-center mt-2">Add New Section</h3>
            <FormGroup className="mb-2 ml-auto mr-auto mt-3 p-2">
                <Label for="exampleSubject" className="mr-2 pl-1">Subject</Label>
                <Input type="select" name="select" id="exampleSubject">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                </Input>
            </FormGroup>

            <FormGroup className="mb-2 ml-auto mr-auto mt-3 p-2">
                <Label for="exampleTopic" className="mr-2 pl-1">Topic</Label>
                <Input type="password" name="password" id="exampleTopic" minLength="5" placeholder="Enter Topic"
                />
            </FormGroup>

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
                    <Label for="exampleSem" className="mr-2 pl-1">State</Label>
                    <Input type="select" name="semester" id="exampleSem">
                        <option value='O'>Opened</option>
                        <option value='C'>Closed</option>
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