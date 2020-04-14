import React from 'react';
import {Badge} from 'reactstrap';
import {Redirect} from 'react-router-dom';
import auth from "../../Auth";
import RegisterFormInputs from "../../components/Forms/FormsTemplates/RegisterFormInputs";
import axios from 'axios'

export class RegisterForm extends React.Component {

    emptyUser = {
        album: '',
        code: '',
        email: '',
        password: '',
    };

    constructor(props) {
        super(props);
        let redirect = false;
        if (auth.isAuthenticated()) redirect = true;
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

    handleSubmit(event) {
        event.preventDefault();
        const {user} = this.state;

        const request = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        };

        axios.post('/api/register',JSON.stringify(user), request).then( response => {
            if (response.status >= 400 && response.status <= 499) {
                this.setState({
                    wrongCred: true
                })
            } else if (response.status !== 200) {
                this.setState({
                    serverError: true
                });
            } else {

                let user = {...this.state.user};
                user.token = response.data.token;
                auth.login(response.data.role, user.token);
                this.setState({user});
                this.setState({redirectToReferrer: true})
            }
        })
            .catch(error => {
                this.setState({errorMessage: error});
                console.error('There was an error!', error);
            });

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
            redirectUser = <Redirect to='/student'/>;
        }

        return (
            <RegisterFormInputs
                wrongCreds={wrongCredentials}
                redirectUser={redirectUser}
                user={user}
                submit={this.handleSubmit}
                change={this.handleChange}/>
        );
    }
}

export default RegisterForm;