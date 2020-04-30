import React from 'react';
import {Badge} from 'reactstrap';
import {Redirect} from 'react-router-dom';
import auth from "../../../Auth";
import RegisterFormInputs from "../../../components/Forms/FormsTemplates/RegisterForm/RegisterForm";
import axios from 'axios'

export class Register extends React.Component {

    emptyUser = {
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
    }

    handleChange=(event)=>{
        const target = event.target;
        const value = target.value;
        const name = target.name;

        let user = {...this.state.user};
        user[name] = value;
        this.setState({
            user: user,
            wrongCred: false});
    };

    handleSubmit=(event)=>{
        event.preventDefault();

        for (let key in this.state.user) {
            if(this.state.user[key] === ''){
                this.setState({
                    wrongCred: true
                });
                return;
            }
        }

        const user =  {...this.state.user};
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
                redirectUser={redirectUser}
                user={user}
                submit={this.handleSubmit}
                change={this.handleChange}/>
        );
    }
}

export default Register;