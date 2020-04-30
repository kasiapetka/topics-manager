import React from 'react';
import {FaUserAlt} from "react-icons/fa";
import {Form, FormGroup, Label} from "reactstrap";
import EmailPasswordChangeInput from "./FormInputs/EmailPasswordChangeInput";
import ConfirmPasswordInput from "../ConfirmPasswordInput/ConfirmPasswordInput";
import classes from '../Forms.module.css'
import Button from "../../Button/Button";

const editAccountForm = (props) => {

    let nameDetails;
    const name = !props.person.name ? "Administrator" : props.person.name + " " + props.person.surname;

    nameDetails = (
        <FormGroup className="mb-2 mt-3 p-2">
            <div color="light" id="name"
                 className="col-md-12 pt-2 pb-2 pl-2 pr-2 border rounded text-center">
                {name}
            </div>
        </FormGroup>
    );

    console.log(props.wrongEmail)

    const classNames = "border rounded pt-4 pb-5 mt-5 mb-4 pr-3 pl-3 mb-5 " + classes.Form;

    return (
        <Form className={classNames} onSubmit={props.submit}>
            <h4 className="text-center"><FaUserAlt className="accountIcon"></FaUserAlt></h4>
            <h3 className="text-center">Your Account</h3>
            {nameDetails}
            {/*----------Account Email---------------------------*/}
            <div className="mb-2 mt-3 p-2">
                <Label for="actualEmail" className="mr-2 pl-1">
                    Your Email
                </Label>
                <div color="light" id="actualEmail"
                     className="col-md-12 pt-2 pb-2 pl-2 pr-2 border rounded text-left">
                    {props.person.email}
                </div>
            </div>
            {/*--------------------------------------------------------------*/}
            {/*-------Inputs for changing email and password-----------------*/}
            <EmailPasswordChangeInput
                change={props.change}
                wrongEmail={props.wrongEmail}
                newEmail={props.person.newEmail}
                newPassword={props.person.newPassword}
                emptyForm={props.emptyForm}/>
            {/*--------------------------------------------------------------*/}

            {props.credentialsChangedSuccess}
            <ConfirmPasswordInput
                credsChanged={props.credsChanged}
                password={props.person.password}
                change={props.change}
                wrongPassword={props.wrongPassword}
                loggin={true}
            />
            <Button label='save changes'/>
        </Form>
    )
};

export default editAccountForm;