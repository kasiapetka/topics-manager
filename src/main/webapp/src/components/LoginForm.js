import React from 'react';
import {
    Container, Col, Form,
    FormGroup, Label, Input,
    Button, Collapse, Badge
} from 'reactstrap';
import { FaUserAlt } from "react-icons/fa";
import {Link, Redirect, withRouter} from 'react-router-dom';
import auth from "../Auth";
import Radium from "radium";

class LoginForm extends React.Component {

    emptyUser = {
        token:'',
        email: '',
        password: ''
    };

    constructor(props) {
        super(props);
        let redirect = false;
        let role = auth.getRole();

        this.state = {
            user: this.emptyUser,
            wrongCred: false,
            serverError: false,
            role: role,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (event) => {
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
        let response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Authorization': 'Basic ' + btoa(user.email + ':' + user.password),
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });

        console.log(response.ok)
        console.log(response.headers)
        console.log(response.body)
        console.log(response)

        if (response.status >= 400 && response.status <= 499) {
            this.setState({
                wrongCred: true
            });
        } else if (response.status >= 500 && response.status <= 599 ) {
            this.setState({
                serverError: true
            });
        } else if (response.status === 210) {
            auth.login('S');
            this.setState({role: 'S'});
        } else if (response.status === 211) {
            auth.login('T');
            this.setState({role: 'T'});
        } else if (response.status === 212) {
            auth.login('A');
            this.setState({role: 'A'});
        }

    }

    render() {
        const {user} = this.state;
        const wrongCred = this.state.wrongCred;
        const role = this.state.role;
        const serverError = this.state.serverError;

        let wrongCredentials, serverProblem;
        if (wrongCred) {
            wrongCredentials =
                (<Badge color="danger" className="col-12 pt-2 pb-2 pl-2 pr-2 mt-4" pill>
                    Wrong Login Credentials</Badge>)
        }

        if(serverError){
            serverProblem =
                (<Badge color="danger" className="col-12 pt-2 pb-2 pl-2 pr-2 mt-4" pill>
                    Internal Server Error</Badge>)
        }

        if(role === 'S')
            return  <Redirect to='/student' />;
        if(role === 'T')
            return  <Redirect to='/teacher' />;
        if(role === 'A')
            return  <Redirect to='/admin' />;

        const style={
            '@media(min-width: 600px)': {
                width: '600px'
            },
            '@media(max-width: 350px)': {
                width: '95%'
            }
        };

        return (
            <div className="container border rounded pt-4 pb-5 mt-5" style={style}>
                <Form onSubmit={this.handleSubmit}>
                    <h4 className="text-center"><FaUserAlt className="accountIcon"></FaUserAlt></h4>
                    <h3 className="text-center">Sign In</h3>
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0 mt-3">
                        <Label for="exampleEmail" className="mr-sm-2 pl-1">Email Address</Label>
                        <Input type="email" name="email" id="exampleEmail" placeholder="Enter Email" value={user.email || ''}
                               onChange={this.handleChange}/>
                    </FormGroup>
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0 mt-3">
                        <Label for="examplePassword" className="mr-sm-2 pl-1">Password</Label>
                        <Input type="password" name="password" id="examplePassword" minLength="5" placeholder="Enter Password"
                               value={user.password || ''} onChange={this.handleChange}/>
                    </FormGroup>
                    {wrongCredentials}
                    {serverProblem}
                    <div className="form-row text-center pt-4">
                        <div className="col-12">
                            <Button type="submit" className="btn btn-primary">Sign In</Button>
                        </div>
                    </div>
                    <div className="form-row text-center pt-3">
                        <div className="col-12">
                            <p>You don't have an account yet? Create new account here:</p>
                            <Link to="/register">
                                <Button className="btn btn-primary mt-2">Sign Up</Button>
                            </Link>
                        </div>
                    </div>
                </Form>
            </div>
        );
    }
};

export default Radium(LoginForm);