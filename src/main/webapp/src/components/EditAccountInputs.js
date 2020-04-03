import React from 'react';
import { FaUserAlt } from "react-icons/fa";
import {Button, Form, FormGroup, Input, Label} from "reactstrap";

const EditAccountInputs =(props)=> {

    return (
        <Form onSubmit={props.submit}>
            <h4 className="text-center"><FaUserAlt className="accountIcon"></FaUserAlt></h4>
            <h3 className="text-center">Your Account</h3>
            <FormGroup className="mr-sm-2  mt-2">
                <Label for="album" className="mr-sm-2 pl-1">Your Album</Label>
                <div color="light" id= "album" className="col-12 pt-2 pb-2 pl-2 pr-2 border rounded text-left" pill>{props.student.album}</div>
            </FormGroup>
            <FormGroup className="mr-sm-2  mt-2">
                <Label for="name" className="mr-sm-2 pl-1">Your Name</Label>
                <div color="light" id= "name" className="col-12 pt-2 pb-2 pl-2 pr-2 border rounded text-left" pill>{props.student.name}</div>
            </FormGroup>
            <FormGroup className="mr-sm-2  mt-2">
                <Label for="surname" className="mr-sm-2 pl-1">Your Surname</Label>
                <div color="light" id= "surname" className="col-12 pt-2 pb-2 pl-2 pr-2 border rounded text-left" pill>{props.student.surname}</div>
            </FormGroup>

            <FormGroup className="mb-2 mr-sm-2 mb-sm-0 mt-3">
                <Label for="exampleEmail" className="mr-sm-2 pl-1">Email Address</Label>
                <Input type="email" name="email" id="exampleEmail" placeholder="Enter Email" value={props.student.email || ''}
                       onChange={props.change}/>
            </FormGroup>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0 mt-3">
                <Label for="examplePassword" className="mr-sm-2 pl-1">New Password</Label>
                <Input type="password" name="password" id="examplePassword" minLength="5" placeholder="Enter New Password"
                       value={props.student.password || ''} onChange={props.change}/>
            </FormGroup>
            {props.passwordChangedSuccess}
            <div className="form-row text-center pt-4">
                <div className="col-12">
                    <Button type="submit" className="btn btn-primary">Save Changes</Button>
                </div>
            </div>
        </Form>
    )
}

export default EditAccountInputs