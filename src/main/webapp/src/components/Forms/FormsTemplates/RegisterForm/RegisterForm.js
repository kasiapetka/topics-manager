import React from 'react';
import {Link} from 'react-router-dom';
import {Button, Form} from "reactstrap";
import classes from "../Forms.module.css";
import TextInput from "../../Inputs/TextInput/TextInput";

const registerForm =(props)=> {
    const classNames = "border rounded pt-4 pb-5 mt-5 pr-3 pl-3 mb-5 " + classes.Form;

    return (
        <Form className={classNames} onSubmit={props.submit}>
            <h3 className="text-center">Sign Up</h3>

            <TextInput type="text" name="code" label="code" minLength="1"
                       maxLength="30" placeholder="Enter Code"
                       value={props.user.code || ''}
                       onChange={props.change}/>

            <TextInput type="email" name="email" label='email'
                       placeholder="Enter Email" value={props.user.email || ''}
                       onChange={props.change}/>

            <TextInput type="password" name="password" label="password"
                       minLength="5" placeholder="Enter Password"
                       value={props.user.password || ''} onChange={props.change}/>

            {props.wrongCreds}
            {props.redirectUser}
            <div className="form-row text-center pt-5">
                <div className="col-md-12">
                    <Button type="submit" className="btn btn-primary">Sign Up</Button>
                </div>
            </div>

            <div className="form-row text-center pt-3">
                <div className="col-md-12">
                    <p>You already have an account? Log in here:</p>
                    <Link to="/login">
                        <Button className="btn btn-primary mt-2">Sign In</Button>
                    </Link>
                </div>
            </div>
        </Form>
    )
};

export default registerForm