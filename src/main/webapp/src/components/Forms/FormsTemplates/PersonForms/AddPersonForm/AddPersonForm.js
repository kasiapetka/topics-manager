import React from 'react';
import {Badge, Form} from "reactstrap";
import classes from "../../Forms.module.css";
import ConfirmPasswordInput from "../../ConfirmPasswordInput/ConfirmPasswordInput";
import AddTeacherInputs from "./FormInputs/AddTeacherInputs";
import AddStudentInputs from "./FormInputs/AddStudentInputs";
import {withRouter} from "react-router-dom";
import Input from "../../../FormElements/Input/Input";
import Button from "../../../FormElements/Button/Button";

const addPersonForm = (props) => {
    const classNames = "border rounded pt-4 pb-5 mt-5 mb-4 pr-3 pl-3 " + classes.Form;
    let label;
    let content, wrongEmail;

    const role = props.match.params.role;

    if (role === 'T') {
        label = "Teacher";
        content = <AddTeacherInputs
            person={props.person}
            change={props.change}
            emptyForm={props.emptyForm}
            wrongEmail={props.wrongEmail}/>
    }
    if (role === 'S') {
        label = "Student";
        content = <AddStudentInputs
            person={props.person}
            change={props.change}
            emptyForm={props.emptyForm}/>
    }

    if (props.wrongEmail) {
        wrongEmail = <div className="form-row p-2">
            <Badge color="danger" className="col-md-6 p-2 ml-auto mr-auto">
                Email occupied</Badge>
        </div>
    }

    return (
        <Form className={classNames} onSubmit={props.submit}>
            <h3 className="text-center">Fill in {label}'s data</h3>

            <div className="form-row p-1">
                <Input type="text" name="newName" label={label + '\'s Name'}
                       groupclasses='col-md-6' placeholder="Enter Name"
                       value={props.person.newName || ''}
                       onChange={props.change}
                       invalid={props.emptyForm && props.person.newName === ''}/>

                <Input type="text" name="newSurname" label={label + '\'s Surname'}
                       placeholder="Enter Surname"
                       groupclasses='col-md-6'
                       value={props.person.newSurname || ''}
                       onChange={props.change}
                       invalid={props.emptyForm && props.person.newSurname === ''}/>
            </div>

            {content}
            {wrongEmail}

            <ConfirmPasswordInput
                credsChanged={props.changed}
                password={props.person.password}
                change={props.change}
                wrongPassword={props.wrongPassword}
                loggin={false}
            />

            <Button label={'Add ' + label} disabled={props.emptyForm}/>
        </Form>
    )
};

export default withRouter(addPersonForm);