import React from 'react';
import {
    Container, Col, Form,
    FormGroup, Label, Input,
    Button, Collapse,
} from 'reactstrap';
import { FaUserAlt } from "react-icons/fa";
import {Link} from 'react-router-dom';

export class LoginForm extends React.Component {

    emptyUser = {
        email: '',
        password: ''
    };

    constructor(props) {
        super(props);
        this.state = {
            user: this.emptyUser,
            isAuthenticated: false
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

        console.log(user.email)
        console.log(user.password)
    }

    async handleSubmit(event) {
        event.preventDefault();
        const {user} = this.state;

        let response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Authorization': 'Basic '+btoa(user.email+':'+user.password),
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),

            //jak wraca z bledem to mu wyisze ze zle dane jak wraca z ok to go przenies na inna strone
        });

       // let commits = await response.json();
        console.log(response)
    }

    render() {
        const {user} = this.state;

        return (
            <div className="col-6 container border rounded pt-4 pb-5 mt-5 ">
                <Form onSubmit={this.handleSubmit}>
                    <h4 className="text-center"><FaUserAlt className="accountIcon"></FaUserAlt></h4>
                    <h3 className="text-center">Sign In</h3>
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0 mt-3">
                        <Label for="exampleEmail" className="mr-sm-2 pl-1">Email Address</Label>
                        <Input type="text" name="email" id="exampleEmail" placeholder="Enter Email" value={user.email || ''}
                               onChange={this.handleChange}/>
                    </FormGroup>
                    <FormGroup className="mb-2 mr-sm-2 mb-sm-0 mt-3">
                        <Label for="examplePassword" className="mr-sm-2 pl-1">Password</Label>
                        <Input type="password" name="password" id="examplePassword" minLength="5" placeholder="Enter Password"
                               value={user.password || ''} onChange={this.handleChange}/>
                    </FormGroup>
                    <div className="form-row text-center pt-5">
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

export default LoginForm;