import React from 'react';
import {FaUserAlt} from "react-icons/fa";
import {Link} from 'react-router-dom';
import {Form, Button} from "reactstrap";
import classes from "../Forms.module.css";
import Input from "../../FormElements/Input/Input";
import SubmitButton from "../../FormElements/Button/Button";

const loginForm = (props) => {
    const classNames = "border rounded pt-4 pb-5 mt-5 pr-3 pl-3 " + classes.Form;

    return (
        <Form className={classNames} onSubmit={props.submit}>
            <h4 className="text-center"><FaUserAlt className="accountIcon"></FaUserAlt></h4>
            <h3 className="text-center">Sign In</h3>

            <Input type="email" name="email" label="email"
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
            {props.serverProblem}
            <SubmitButton label='sign in' disabled={!props.formValid}/>

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