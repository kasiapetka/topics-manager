import React from 'react';
import {
    Container, Col, Form,
    FormGroup, Label, Input,
    Button, Collapse,
} from 'reactstrap';
import { FaUserAlt } from "react-icons/fa";
import {Link} from 'react-router-dom';

export class LoginForm extends React.Component{

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="col-6 container border rounded pt-4 pb-3 mt-5">
                <Form>
                    <h3 className="text-center">Sign Up</h3>
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0 mt-3">
                        <Label for="exampleName" className="mr-sm-2 pl-1">Your Name</Label>
                        <Input type="name" name="name" id="exampleName" minLength="1" maxLength="30" placeholder="Enter Name"/>
                    </FormGroup>
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0 mt-3 ">
                        <Label for="exampleSurname" className="mr-sm-2 pl-1">Your Surname</Label>
                        <Input type="name" name="surname" id="exampleSurname" minLength="1" maxLength="30" placeholder="Enter Surname"/>
                    </FormGroup>
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0 mt-3">
                        <Label for="exampleEmail" className="mr-sm-2 pl-1">Email Address</Label>
                        <Input type="email" name="email" id="exampleEmail" placeholder="Enter Email"/>
                    </FormGroup>
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0 mt-3">
                        <Label for="examplePassword" className="mr-sm-2 pl-1">Password</Label>
                        <Input type="password" name="password" id="examplePassword" minLength="5" placeholder="Enter Password"/>
                    </FormGroup>
                    <div className="form-row text-center pt-5">
                        <div className="col-12">
                            <Button type="submit" className="btn btn-primary">Sign Up</Button>
                        </div>
                    </div>

                    <div className="form-row text-center pt-3">
                        <div className="col-12">
                            <p>You already have an account? Log in here:</p>
                            <Link to="/login">
                                <Button type="submit" className="btn btn-primary mt-2">Sign In</Button>
                            </Link>
                        </div>
                    </div>
                </Form>
            </div>
        );
    }
}

export default LoginForm;