import React from 'react';
import { FaUserAlt } from "react-icons/fa";
import {Button, Form, FormGroup, Label} from "reactstrap";
import EmailPasswordChangeInput from "./formInputs/EmailPasswordChangeInput";
import ConfirmPasswordInput from "./formInputs/ConfirmPasswordInput";
import classes from './forms.module.css'

const EditAccountInputs =(props)=> {

    let nameDetails;
    const name = !props.person.name ? "Administrator" : props.person.name + " " + props.person.surname;
    nameDetails = (<FormGroup className="mb-2 mr-sm-4 ml-sm-4 mb-sm-0 mt-3">
                        <div color="light" id="name"
                        className="col-12  pt-2 pb-2 pl-2 pr-2 border rounded text-center">
                            {name}
                        </div>
                    </FormGroup>);
    const classNames = "border rounded pt-4 pb-5 mt-5 pr-3 pl-3 mb-5 " + classes.editAccountForm;

    return (
        <Form className={classNames} onSubmit={props.submit}>
            <h4 className="text-center"><FaUserAlt className="accountIcon"></FaUserAlt></h4>
            <h3 className="text-center">Your Account</h3>
            {nameDetails}
            {/*----------Account Email---------------------------*/}
            <div className="mb-2 mr-sm-4 ml-sm-4 mb-sm-0 mt-3">
                <Label for="actualEmail" className="mr-sm-2 pl-1">
                    Your Email
                </Label>
                <div color="light" id="actualEmail"
                     className="col-12  pt-2 pb-2 pl-2 pr-2 border rounded text-left">
                    {props.person.email}
                </div>
            </div>
            {/*--------------------------------------------------------------*/}
            {/*-------Inputs for changing email and password-----------------*/}
            <EmailPasswordChangeInput
                change={props.change}
                wrongEmail={props.wrongEmail}
                newEmail={props.person.newEmail}
                newPassword={props.person.newPassword}/>
            {/*--------------------------------------------------------------*/}

            {props.credentialsChangedSuccess}
            <ConfirmPasswordInput
                credsChanged={props.credsChanged}
                password={props.person.password}
                change={props.change}
                wrongPassword={props.wrongPassword}
                loggin={true}
            />
            <div className="form-row text-center pt-4">
                <div className="col-12">
                    <Button type="submit" className="btn btn-primary">Save Changes</Button>
                </div>
            </div>
        </Form>
    )
};

export default EditAccountInputs