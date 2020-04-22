import React from 'react';
import {Link} from 'react-router-dom';
import {Button, Form, FormGroup, Input, Label} from "reactstrap";
import classes from "../Forms.module.css";
import ConfirmPasswordInput from "../ConfirmPasswordInput/ConfirmPasswordInput";
import AddTeacherInputs from "./FormInputs/AddTeacherInputs";
import AddStudentInputs from "./FormInputs/AddStudentInputs";

const addPersonForm =(props)=>{
    const classNames = "border rounded pt-4 pb-5 mt-5 pr-3 pl-3 " + classes.Form;
    let label;
    let content;

    if(props.personRole === 'T') {
        label="Teacher";
        content=<AddTeacherInputs
        person={props.person}
        change={props.change}
        invalid={props.emptyForm}/>
    }
    if(props.personRole === 'S'){
        label="Student";
        content=<AddStudentInputs
            person={props.person}
            change={props.change}
            invalid={props.emptyForm}/>
    }

    return(
        <Form className={classNames} onSubmit={props.submit}>
            <h3 className="text-center">Fill in {label}'s data</h3>

            <div className="form-row p-2">
            <FormGroup className="col-md-6 mb-2 mt-3">
                <Label for="exampleName" className="mr-2 pl-1">{label}'s Name</Label>
                <Input type="text" name="newName" id="exampleName" placeholder="Enter Name"
                       value={props.person.newName || ''}
                       onChange={props.change}
                       invalid={props.emptyForm}/>
            </FormGroup>
            <FormGroup className="col-md-6 mb-2 mt-3">
                <Label for="exampleSurname" className="mr-2 pl-1">{label}'s Surname</Label>
                <Input type="text" name="newSurname" id="exampleSurname" placeholder="Enter Surname"
                       value={props.person.newSurname || ''}
                       onChange={props.change}
                       invalid={props.emptyForm}/>
            </FormGroup>
            </div>

            {content}

            <ConfirmPasswordInput
                credsChanged={props.changed}
                password={props.person.password}
                change={props.change}
                wrongPassword={props.wrongPassword}
                loggin={false}
            />

            <div className="form-row text-center pt-3">
                <div className="col-md-12">
                    <Link to="/register">
                        <Button type="submit" className="btn btn-primary mt-2">Add {label}</Button>
                    </Link>
                </div>
            </div>
        </Form>
    )
};

export default addPersonForm;