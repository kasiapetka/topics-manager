import React from 'react';
import {
    Container, Col, Form,
    FormGroup, Label, Input,
    Button, Collapse,
} from 'reactstrap';

export class LoginForm extends React.Component{

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container-fluid w-50 border rounded pt-4 pb-5 mt-5">
                <Form>
                    <h3 className="text-center">Sign In</h3>
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0 mt-3">
                        <Label for="exampleEmail" className="mr-sm-2">Email Address</Label>
                        <Input type="email" name="email" id="exampleEmail" placeholder="Enter Email"/>
                    </FormGroup>
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0 mt-3">
                        <Label for="examplePassword" className="mr-sm-2">Password</Label>
                        <Input type="password" name="password" id="examplePassword" placeholder="Enter Password"/>
                    </FormGroup>
                    <div className="form-row text-center pt-5">
                        <div className="col-12">
                            <Button type="submit" className="btn btn-primary w-25">Submit</Button>
                        </div>
                    </div>

                    <div className="form-row text-center pt-3">
                        <div className="col-12">
                            <p>You don't have an account yet? Create new account here:</p>
                            <Button type="submit" className="btn btn-primary w-25 mt-2">Sign Up</Button>
                        </div>
                    </div>
                </Form>
            </div>
        );
    }
};

export default LoginForm;