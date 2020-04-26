import React from 'react';
import {Badge, Button, Form, FormGroup, Input, Label} from "reactstrap";
import classes from "../Forms.module.css";
import ConfirmPasswordInput from "../ConfirmPasswordInput/ConfirmPasswordInput";
import AddTeacherInputs from "./FormInputs/AddTeacherInputs";
import AddStudentInputs from "./FormInputs/AddStudentInputs";
import {withRouter} from "react-router-dom";

const addPersonForm =(props)=>{
    const classNames = "border rounded pt-4 pb-5 mt-5 mb-4 pr-3 pl-3 " + classes.Form;
    let label;
    let content;

    const role = props.match.params.role;

    if(role === 'T') {
        label="Teacher";
        content=<AddTeacherInputs
        person={props.person}
        change={props.change}
        emptyForm={props.emptyForm}
        wrongEmail={props.wrongEmail}/>
    }
    if(role === 'S'){
        label="Student";
        content=<AddStudentInputs
            person={props.person}
            change={props.change}
            emptyForm={props.emptyForm}/>
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
                       invalid={props.emptyForm && props.person.newName===''}/>
            </FormGroup>
            <FormGroup className="col-md-6 mb-2 mt-3">
                <Label for="exampleSurname" className="mr-2 pl-1">{label}'s Surname</Label>
                <Input type="text" name="newSurname" id="exampleSurname" placeholder="Enter Surname"
                       value={props.person.newSurname || ''}
                       onChange={props.change}
                       invalid={props.emptyForm && props.person.newSurname===''}/>
            </FormGroup>
            </div>

            {content}
            {
                props.wrongEmail
                ?
                    <Badge color="danger" className="p-2 mb-2 mt-2">
                        Email occupied</Badge>
                :
                null
            }

            <ConfirmPasswordInput
                credsChanged={props.changed}
                password={props.person.password}
                change={props.change}
                wrongPassword={props.wrongPassword}
                loggin={false}
            />

            <div className="form-row text-center pt-3">
                <div className="col-md-12">
                        <Button type="submit" className="btn btn-primary mt-2">Add {label}</Button>
                </div>
            </div>
        </Form>
    )
};

export default withRouter(addPersonForm);