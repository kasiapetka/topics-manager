import React from 'react';
import {Link} from 'react-router-dom';
import {Button, Form, FormGroup, Input, Label} from "reactstrap";

const RegisterFormInputs =(props)=> {

    return (
        <Form onSubmit={props.submit}>
            <h3 className="text-center">Sign Up</h3>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0 mt-3">
                <Label for="exampleAlbum" className="mr-sm-2 pl-1">Your Album</Label>
                <Input type="number" name="album" id="exampleAlbum" minLength="1" maxLength="7" placeholder="Enter Album" value={props.user.album || ''}
                       onChange={props.change}/>
            </FormGroup>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0 mt-3 ">
                <Label for="exampleCode" className="mr-sm-2 pl-1">Your Code</Label>
                <Input type="text" name="code" id="exampleCode" minLength="1" maxLength="30" placeholder="Enter Code" value={props.user.code || ''}
                       onChange={props.change}/>
            </FormGroup>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0 mt-3">
                <Label for="exampleEmail" className="mr-sm-2 pl-1">Email Address</Label>
                <Input type="email" name="email" id="exampleEmail" placeholder="Enter Email" value={props.user.email || ''}
                       onChange={props.change}/>
            </FormGroup>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0 mt-3">
                <Label for="examplePassword" className="mr-sm-2 pl-1">Password</Label>
                <Input type="password" name="password" id="examplePassword" minLength="5" placeholder="Enter Password" value={props.user.password || ''}
                       onChange={props.change}/>
            </FormGroup>
            {props.wrongCreds}
            {props.redirectUser}
            <div className="form-row text-center pt-5">
                <div className="col-12">
                    <Button type="submit" className="btn btn-primary">Sign Up</Button>
                </div>
            </div>

            <div className="form-row text-center pt-3">
                <div className="col-12">
                    <p>You already have an account? Log in here:</p>
                    <Link to="/login">
                        <Button className="btn btn-primary mt-2">Sign In</Button>
                    </Link>
                </div>
            </div>
        </Form>
    )

}

export default RegisterFormInputs