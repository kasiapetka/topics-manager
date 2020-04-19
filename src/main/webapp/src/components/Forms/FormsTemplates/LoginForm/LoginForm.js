import React from 'react';
import { FaUserAlt } from "react-icons/fa";
import {Link} from 'react-router-dom';
import {Button, Form, FormGroup, Input, Label} from "reactstrap";
import classes from "../Forms.module.css";

const loginForm =(props)=>{
    const classNames = "border rounded pt-4 pb-5 mt-5 p-3 " + classes.Form;

    return(
            <Form className={classNames} onSubmit={props.submit}>
                <h4 className="text-center"><FaUserAlt className="accountIcon"></FaUserAlt></h4>
                <h3 className="text-center">Sign In</h3>
                <FormGroup className="mb-2 mr-2 mt-3">
                    <Label for="exampleEmail" className="mr-2 pl-1">Email Address</Label>
                    <Input type="email" name="email" id="exampleEmail" placeholder="Enter Email" value={props.user.email || ''}
                           onChange={props.change}/>
                </FormGroup>
                <FormGroup className="mb-2 mr-2 mt-3">
                    <Label for="examplePassword" className="mr-2 pl-1">Password</Label>
                    <Input type="password" name="password" id="examplePassword" minLength="5" placeholder="Enter Password"
                           value={props.user.password || ''} onChange={props.change}/>
                </FormGroup>
                {props.wrongCreds}
                {props.serverProblem}
                <div className="form-row text-center pt-4">
                    <div className="col-md-12">
                        <Button type="submit" className="btn btn-primary">Sign In</Button>
                    </div>
                </div>
                <div className="form-row text-center pt-3">
                    <div className="col-md-12">
                        <p>You don't have an account yet? Create new account here:</p>
                        <Link to="/register">
                            <Button className="btn btn-primary mt-2">Sign Up</Button>
                        </Link>
                    </div>
                </div>
            </Form>
    )
};

export default loginForm