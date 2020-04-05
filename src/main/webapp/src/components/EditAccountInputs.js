import React from 'react';
import { FaUserAlt } from "react-icons/fa";
import {Button, Form, FormGroup, Input, Label} from "reactstrap";

const EditAccountInputs =(props)=> {

    let nameDetails='Administrator';

    if(props.role !== 'A') {
        nameDetails = (<FormGroup className="mr-sm-2  mt-2">
                <div color="light" id="name" className="col-12 pt-2 pb-2 pl-2 pr-2 border rounded text-center"
                     pill>{props.person.name +" "+ props.person.surname}</div>
            </FormGroup>
        )
    }

    return (
        <Form onSubmit={props.submit}>
            <h4 className="text-center"><FaUserAlt className="accountIcon"></FaUserAlt></h4>
            <h3 className="text-center">Your Account</h3>
            {nameDetails}
            <FormGroup className="mr-sm-2  mt-2">
                <Label for="actualEmail" className="mr-sm-2 pl-1">Your Email</Label>
                <div color="light" id="actualEmail" className="col-12 pt-2 pb-2 pl-2 pr-2 border rounded text-left"
                     pill>{props.person.email}</div>
            </FormGroup>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0 mt-3">
                <Label for="exampleEmail" className="mr-sm-2 pl-1">New Email Address</Label>
                <Input type="email" name="email" id="exampleEmail" placeholder="Enter New Email"
                       value={props.person.newEmail || ''}
                       onChange={props.change}/>
            </FormGroup>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0 mt-3">
                <Label for="examplePassword" className="mr-sm-2 pl-1">New Password</Label>
                <Input type="password" name="password" id="examplePassword" minLength="5"
                       placeholder="Enter New Password"
                       value={props.person.newPassword || ''} onChange={props.change}/>
            </FormGroup>
            {props.passwordChangedSuccess}
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0 mt-3">
                <Label for="examplePassword" className="mr-sm-2 pl-1">Confirm With Your Password</Label>
                <Input type="password" name="password" id="examplePassword" minLength="5"
                       placeholder="Enter Password"
                       value={props.person.password || ''} onChange={props.change}/>
            </FormGroup>
            <div className="form-row text-center pt-4">
                <div className="col-12">
                    <Button type="submit" className="btn btn-primary">Save Changes</Button>
                </div>
            </div>
        </Form>
    )
}

export default EditAccountInputs