import React, {Component} from 'react';
import {connect} from 'react-redux'
import * as actionTypes from '../../../store/actions'
import {Badge} from 'reactstrap';
import {Redirect} from 'react-router-dom';
import auth from "../../../Auth";
import LoginFormInputs from "../../../components/Forms/FormsTemplates/LoginForm/LoginForm";
import axios from 'axios'
import handleInputChange from "../validateForm";

class Login extends Component {

    constructor(props) {
        super(props);
        let role = auth.getRole();

        this.state = {
            user: {
                email: {
                    value: '',
                    validation: {
                        valid: true,
                        touched: false,
                        required: true
                    }
                },
                password: {
                    value: '',
                    validation: {
                        valid: true,
                        touched: false,
                        required: true,
                        minLength: 5
                    }
                }
            },
            formValid: false,
            wrongCred: false,
            error: null,
            role: role,
        };
    }

    handleChange = (event) => {
        const formProperties = handleInputChange(event, this.state.user);

        this.setState({
            user: formProperties.form,
            formValid: formProperties.formValid,
            wrongCreds: false
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const user = {
            email: this.state.user.email.value,
            password: this.state.user.password.value,
        };

        axios.post('/api/login', user).then(response => {
            auth.login(response.data.role, response.data.token);
            // this.props.onLogin(response.data.token,response.data.role);
            this.setState({role: response.data.role})
        })
            .catch(error => {
                if (error.response.status >= 400 && error.response.status <= 499) {
                    this.setState({
                        wrongCred: true
                    })
                } else {
                    this.setState({
                        error: error
                    });
                }
            })
    };

    render() {
        const {user} = this.state;
        const wrongCred = this.state.wrongCred;
        const role = this.state.role;
        const error = this.state.error;

        let wrongCredentials, serverProblem;
        if (wrongCred) {
            wrongCredentials =
                (<Badge color="danger" className="col-12 pt-2 pb-2 pl-2 pr-2 mt-4" pill>
                    Wrong Login Credentials</Badge>)
        }

        if (error) {
            serverProblem =
                (<Badge color="danger" className="col-12 pt-2 pb-2 pl-2 pr-2 mt-4" pill>
                    Internal Server Error <br/> {error.message} </Badge>)
        }

        if (role === 'S')
            return <Redirect to='/student'/>;
        if (role === 'T')
            return <Redirect to='/teacher'/>;
        if (role === 'A')
            return <Redirect to='/admin'/>;

        return (
            <LoginFormInputs wrongCreds={wrongCredentials}
                             serverProblem={serverProblem}
                             user={user}
                             formValid={this.state.formValid}
                             submit={this.handleSubmit}
                             change={this.handleChange}/>
        );
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onLogin: (token, role) => dispatch({type: actionTypes.LOGIN, payload: {token: token, role: role}}),
    };
};

export default connect(null, mapDispatchToProps)(Login);
