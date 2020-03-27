import React from 'react';
import {
    Container, Col, Form,
    FormGroup, Label, Input,
    Button, Collapse, Badge,
} from 'reactstrap';
import { FaUserAlt } from "react-icons/fa";
import {Link, Redirect} from 'react-router-dom';
import auth from "../Auth";

export class LoginForm extends React.Component{

    emptyUser = {
        album: '',
        code: '',
        email: '',
        password: '',
    };


    constructor(props) {
        super(props);
        var redirect = false;
        if(auth.isAuthenticated()) redirect = true;
        this.state = {
            user: this.emptyUser,
            wrongCred: false,
            redirectToReferrer: redirect,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        let user = {...this.state.user};
        user[name] = value;
        this.setState({user});
    }

    async handleSubmit(event) {
        event.preventDefault();
        const {user} = this.state;
        console.log(JSON.stringify(user));

        let response = await fetch('/api/register', {
            method: 'POST',
            headers: {
                //'Authorization': 'Basic ' + btoa(user.email + ':' + user.password),
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });

        if (response.status === 401) {
            console.log("unauthorized")
            this.setState({
                wrongCred: true
            });
        } else if (response.status === 200) {
            console.log(response)
            auth.login();
            this.setState({
                redirectToReferrer: true
            });
        }
    }

    render() {
        const {user} = this.state;
        const wrongCred = this.state.wrongCred;
        const redirectToReferrer = this.state.redirectToReferrer;

        let wrongCredentials, redirectUser;
        if (wrongCred) {
            wrongCredentials =
                <Badge color="danger" className="col-12 pt-2 pb-2 pl-2 pr-2 mt-4" pill>
                    Wrong Login Credentials</Badge>
        }

        if (redirectToReferrer) {
            redirectUser = <Redirect to='/student' />;
        }

        return (
            <div className="col-6 container border rounded pt-4 pb-3 mt-5">
                <Form onSubmit={this.handleSubmit}>
                    <h3 className="text-center">Sign Up</h3>
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0 mt-3">
                        <Label for="exampleAlbum" className="mr-sm-2 pl-1">Your Album</Label>
                        <Input type="album" name="album" id="exampleAlbum" minLength="1" maxLength="7" placeholder="Enter Album" value={user.album || ''}
                               onChange={this.handleChange}/>
                    </FormGroup>
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0 mt-3 ">
                        <Label for="exampleCode" className="mr-sm-2 pl-1">Your Code</Label>
                        <Input type="code" name="code" id="exampleCode" minLength="1" maxLength="30" placeholder="Enter Code" value={user.code || ''}
                               onChange={this.handleChange}/>
                    </FormGroup>
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0 mt-3">
                        <Label for="exampleEmail" className="mr-sm-2 pl-1">Email Address</Label>
                        <Input type="email" name="email" id="exampleEmail" placeholder="Enter Email" value={user.email || ''}
                               onChange={this.handleChange}/>
                    </FormGroup>
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0 mt-3">
                        <Label for="examplePassword" className="mr-sm-2 pl-1">Password</Label>
                        <Input type="password" name="password" id="examplePassword" minLength="5" placeholder="Enter Password" value={user.password || ''}
                               onChange={this.handleChange}/>
                    </FormGroup>
                    {wrongCredentials}
                    {redirectUser}
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
            </div>
        );
    }
}

export default LoginForm;