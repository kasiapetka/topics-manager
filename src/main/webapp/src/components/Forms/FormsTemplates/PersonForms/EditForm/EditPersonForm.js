import React from 'react';
import {FaUserAlt} from "react-icons/fa";
import {Form, Label} from "reactstrap";
import PersonInfo from "../../../FormElements/Label/Label";
import EmailPasswordChangeInput from "./FormInputs/EmailPasswordChangeInput";
import NameSurnameChangeInput from "./FormInputs/NameSurnameChangeInput";
import ConfirmPasswordInput from "../../ConfirmPasswordInput/ConfirmPasswordInput";
import classes from "../../Forms.module.css";
import Button from "../../../FormElements/Button/Button";

const EditPersonForm = (props) => {

    let label = props.personRole === 'T' ? 'Teachers' : 'Students';
    let albumDetails;
    if (props.personRole === 'S') {
        albumDetails = (
            <PersonInfo
                label={label + " Album"}
                content={props.person.id}/>)
    }
    const classNames = "border rounded pt-4 pb-5 mt-5 mb-4 pr-3 pl-3 mb-3 " + classes.Form;
    return (
        <Form className={classNames} onSubmit={props.submit}>
            <h4 className="text-center"><FaUserAlt className="accountIcon"></FaUserAlt></h4>
            <h3 className="text-center">{label} Account</h3>
            {albumDetails}
            {/*----------Persons name and surname ---------------------------*/}
            <div className="form-row p-1">
                <PersonInfo
                    label={label + " Name & Surname"}
                    groupclasses="col-md-6 ml-auto mr-auto"
                    content={props.person.name + " " + props.person.surname}/>
                <PersonInfo
                    label={label + " Email"}
                    groupclasses="col-md-6 ml-auto mr-auto"
                    content={props.person.email ? props.person.email : "No Account"}/>
            </div>
            {/*--------------------------------------------------------------*/}
            {/*---------Inputs for changing name and surname-----------------*/}
            <NameSurnameChangeInput
                change={props.change}
                newName={props.person.newName}
                newSurname={props.person.newSurname}
                emptyForm={props.emptyForm}/>
            {/*--------------------------------------------------------------*/}
            {/*-------Inputs for changing email and password-----------------*/}
            {
                props.person.email
                    ?
                    <EmailPasswordChangeInput
                        change={props.change}
                        wrongEmail={props.wrongEmail}
                        newEmail={props.person.newEmail}
                        newPassword={props.person.newPassword}
                        emptyForm={props.emptyForm}/>
                    :
                    null
            }
            {/*--------------------------------------------------------------*/}
            {props.credentialsChangedSuccess}
            <ConfirmPasswordInput
                credsChanged={props.credsChanged}
                password={props.person.password}
                change={props.change}
                wrongPassword={props.wrongPassword}
                loggin={false}
            />

            <Button label='save changes' disabled={props.emptyForm}/>
        </Form>
    )
};

export default EditPersonForm;