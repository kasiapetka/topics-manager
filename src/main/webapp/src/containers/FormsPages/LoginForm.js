import React from 'react';
import {Badge} from 'reactstrap';
import {Redirect} from 'react-router-dom';
import auth from "../../Auth";
import LoginFormInputs from "../../components/Forms/FormsTemplates/LoginFormInputs";
import axios from 'axios'

class LoginForm extends React.Component {

    emptyUser = {
        token: '',
        email: '',
        password: ''
    };

    constructor(props) {
        super(props);
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
    };

      handleSubmit=async(event)=> {

        event.preventDefault();
        const {user} = this.state;

        const request = {
            headers: {
               // 'Authorization': 'Basic ' + btoa(user.email + ':' + user.password),
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        };

        axios.post('/api/login', JSON.stringify(user),request).then(response => {

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
                auth.login(response.data.role,user.token);
                this.setState({user});
                this.setState({role: response.data.role})
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
                             submit={this.handleSubmit}
                             change={this.handleChange}/>
        );
    }
};

export default LoginForm;