import React from 'react';
import {Badge} from 'reactstrap';
import {Redirect} from 'react-router-dom';
import auth from "../../../Auth";
import LoginFormInputs from "../../../components/Forms/FormsTemplates/LoginForm/LoginForm";
import axios from 'axios'
import handleInputChange from "../validateForm";

class Login extends React.Component {

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
            serverError: false,
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
            this.setState({role: response.data.role})
        })
            .catch(error => {
                if (error.response.status >= 400 && error.response.status <= 499) {
                    this.setState({
                        wrongCred: true
                    })
                } else {
                    this.setState({
                        serverError: true
                    });
                }
            })
    };

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

        if (serverError) {
            serverProblem =
                (<Badge color="danger" className="col-12 pt-2 pb-2 pl-2 pr-2 mt-4" pill>
                    Internal Server Error</Badge>)
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

export default Login;