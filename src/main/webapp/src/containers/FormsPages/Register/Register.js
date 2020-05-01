import React from 'react';
import {Badge} from 'reactstrap';
import {Redirect} from 'react-router-dom';
import auth from "../../../Auth";
import RegisterFormInputs from "../../../components/Forms/FormsTemplates/RegisterForm/RegisterForm";
import axios from 'axios'
import handleInputChange from "../validateForm";

export class Register extends React.Component {

    constructor(props) {
        super(props);
        let redirect = false;
        if (auth.isAuthenticated()) redirect = true;
        this.state = {
            user: {
                album: {
                    value: '',
                    validation: {
                        valid: false,
                        touched: false,
                        required: true,
                        minLength: 8,
                        maxLength: 8
                    }
                },
                code: {
                    value: '',
                    validation: {
                        valid: false,
                        touched: false,
                        required: true,
                    }
                },
                email: {
                    value: '',
                    validation: {
                        valid: true,
                        touched: false,
                        required: true
                    }
                },
                password:{
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
            redirectToReferrer: redirect,
        };
    }

    handleChange=(event)=>{
        const formProperties = handleInputChange(event, this.state.user);

        this.setState({
            user: formProperties.form,
            formValid: formProperties.formValid,
            wrongCreds: false
        });
    };

    handleSubmit=(event)=>{
        event.preventDefault();

        const user = {
            album: this.state.user.album.value,
            code: this.state.user.code.value,
            email: this.state.user.email.value,
            password: this.state.user.password.value,
        };

        axios.post('/api/register', user).then(response => {
            let user = {...this.state.user};
            user.token = response.data.token;
            auth.login(response.data.role, user.token);
            this.setState({user: user});
            this.setState({redirectToReferrer: true})
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
            });
    };

    render() {
        const {user} = this.state;
        const wrongCred = this.state.wrongCred;
        const redirectToReferrer = this.state.redirectToReferrer;

        let wrongCredentials, redirectUser;
        if (wrongCred) {
            wrongCredentials =
                <Badge color="danger" className="col-12 pt-2 pb-2 pl-2 pr-2 mt-4" pill>
                    Wrong Register Credentials</Badge>
        }

        if (redirectToReferrer) {
            redirectUser = <Redirect to='/student'/>;
        }

        return (
            <RegisterFormInputs
                wrongCreds={wrongCredentials}
                formValid={this.state.formValid}
                redirectUser={redirectUser}
                user={user}
                submit={this.handleSubmit}
                change={this.handleChange}/>
        );
    }
}

export default Register;