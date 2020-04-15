import React from 'react';
import {FaUserAlt} from "react-icons/fa";
import {Button, Form, Label} from "reactstrap";
import PersonInfo from "../FormLabels/PersonInfo";
import EmailPasswordChangeInput from "../FormInputs/EmailPasswordChangeInput";
import NameSurnameChangeInput from "../FormInputs/NameSurnameChangeInput";
import ConfirmPasswordInput from "../FormInputs/ConfirmPasswordInput";
import classes from "./Forms.module.css";

const EditPersonInputs = (props) => {

    let label = props.personRole === 'T' ? 'Teachers' : 'Students';
    let albumDetails;
    if (props.personRole === 'S') {
        albumDetails = (
            <div className="mb-2 mr-sm-4 ml-sm-4 mb-sm-0 mt-3">
                <Label for="actualAlbum" className="mr-sm-2 pl-1">
                    {label} Album
                </Label>
                <div color="light" id="actualAlbum"
                     className="pt-2 pl-2 pb-2 border rounded text-left">
                    {props.person.id}</div>
            </div>)
    }
    const classNames = "border rounded pt-4 pb-5 mt-5 pr-3 pl-3 mb-3 " + classes.Form;

    return (
        <Form className={classNames} onSubmit={props.submit}>
            <h4 className="text-center"><FaUserAlt className="accountIcon"></FaUserAlt></h4>
            <h3 className="text-center">{label} Account</h3>
            {albumDetails}
            {/*----------Persons name and surname ---------------------------*/}
            <div className="form-row">
                <PersonInfo
                    label={label + " Name & Surname"}
                    content={props.person.name + " " + props.person.surname}/>
                <PersonInfo
                    label={label + " Email"}
                    content={props.person.email ? props.person.email : "No Account"}/>
            </div>
            {/*--------------------------------------------------------------*/}
            {/*---------Inputs for changing name and surname-----------------*/}
            <NameSurnameChangeInput
                change={props.change}
                newName={props.person.newName}
                newSurname={props.person.newSurname}/>
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
                loggin={false}
            />

            <div className="form-row text-center pt-4">
                <div className="col-12">
                    <Button type="submit" className="btn btn-primary">Save Changes</Button>
                </div>
            </div>
        </Form>
    )
};

export default EditPersonInputs;