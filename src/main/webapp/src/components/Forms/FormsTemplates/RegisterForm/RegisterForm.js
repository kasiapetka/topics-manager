import React from 'react';
import {Link} from 'react-router-dom';
import {Form, Button} from "reactstrap";
import classes from "../Forms.module.css";
import Input from "../../FormElements/Input/Input";
import SubmitButton from "../../FormElements/Button/Button";

const registerForm = (props) => {
    const classNames = "border rounded pt-4 pb-5 mt-5 pr-3 pl-3 mb-5 " + classes.Form;

    return (
        <Form className={classNames} onSubmit={props.submit}>
            <h3 className="text-center">Sign Up</h3>

            <Input type="text" name="code" label="code"
                   placeholder="Enter Code"
                   value={props.user.code.value}
                   onChange={props.change}
                   isinvalid={props.user.code.validation}/>

            <Input type="number" name="album" label="album"
                    placeholder="Enter Album"
                   value={props.user.album.value}
                   onChange={props.change}
                   isinvalid={props.user.album.validation}/>

            <Input type="email" name="email" label='email'
                   placeholder="Enter Email"
                   value={props.user.email.value}
                   onChange={props.change}
                   isinvalid={props.user.email.validation}/>

            <Input type="password" name="password" label="password"
                   placeholder="Enter Password"
                   value={props.user.password.value}
                   onChange={props.change}
                   isinvalid={props.user.password.validation}/>

            {props.wrongCreds}
            {props.redirectUser}
            <SubmitButton label='sign up' disabled={!props.formValid}/>

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