import React, {Component} from 'react';
import auth from "../../Auth";
import {Badge, Alert} from "reactstrap";
import EditAccountInputs from "../../components/forms/EditAccountInputs";
import EditPersonInputs from "../../components/forms/EditPersonInputs";
import {Redirect} from "react-router-dom";

class EditAccount extends Component {

    emptyPerson = {
        id: '',
        password: '',
        newEmail: '',
        newPassword: '',
        name: '',
        surname: '',
        newName: '',
        newSurname: '',
    };

    constructor(props) {
        super(props);
        this.emptyPerson.id = props.id;

        this.state = {
            person: this.emptyPerson,
            token: props.token,
            serverError: false,
            changed: false,
            credsChanged: false,
            wrongPassword: false,
            emailChanged: false,
            wrongEmail: false,
            path: props.path,
            personEdition: props.personEdition
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    createRequest = () => {
        let user = {...this.state.person};
        let token = this.state.token;
        return (
            {
                method: 'PUT',
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user)
            }
        )
    };

    componentDidMount = async () => {
        if (!this.state.changed) {
            const request = this.createRequest();

            fetch(this.props.path, request).then(async response => {
                const data = await response.json();

                if (!response.ok) {
                    this.setState({serverError: true});
                } else {
                    let person = {...data};
                    this.setState({person: person});
                    console.log(this.state.person)
                }
            })
                .catch(error => {
                    this.setState({errorMessage: error});
                    console.error('There was an error!', error);
                });
        }
    };

    handleChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let person = {...this.state.person};
        person[name] = value;
        this.setState({person: person});
        this.setState({changed: true});
    };

    handleSubmit = async (event) => {
        event.preventDefault();
        this.setState({
            wrongEmail: false,
            wrongPassword: false
        });

        const request = this.createRequest();
        let user = {...this.state.person};
        if (user.password === '') {
            this.setState({wrongPassword: true});
            this.setState({changed: true});
            return;
        }

        fetch(this.props.path, request).then(async response => {
            const data = await response.json();

            if (!response.ok) {
                if (response.status === 406) {
                    this.setState({wrongPassword: true});
                } else if (response.status === 409) {
                    this.setState({wrongEmail: true});
                } else this.setState({serverError: true});
            } else {
                let person = {...data};
                this.setState({person: person});
                this.setState({person: person});
                if (data.email !== user.email) {
                    this.setState({emailChanged: true});
                }
                if (data !== user) {
                    this.setState({credsChanged: true});
                }
            }
        })
            .catch(error => {
                this.setState({errorMessage: error});
                console.error('There was an error!', error);
            });
    };

    render() {
        const {person} = this.state;
        const serverError = this.state.serverError;
        const credsChanged = this.state.credsChanged;
        const emailChanged = this.state.emailChanged;

        let credentialsChangedSuccess;

        if (serverError) {
            return (
                <Alert color="danger">
                    Server Error, Please Try Again.
                </Alert>
            )
        }

        if (emailChanged && !this.state.personEdition) {
            auth.logout();
            return (
                <Redirect to='/login'/>
            )
        }

        if (credsChanged && this.state.personEdition) {
            credentialsChangedSuccess = (
                <Badge color="success" className="col-11 pt-2 pb-2 mr-sm-4 ml-sm-4 pl-2 pr-2 mt-4">
                    Credentails Changed</Badge>)
        }

        return (
            this.state.personEdition
                ?
                <EditPersonInputs
                    credentialsChangedSuccess={credentialsChangedSuccess}
                    submit={this.handleSubmit}
                    change={this.handleChange}
                    person={person}
                    credsChanged={this.state.changed}
                    wrongPassword={this.state.wrongPassword}
                    wrongEmail={this.state.wrongEmail}
                />

                :
                <EditAccountInputs
                    credentialsChangedSuccess={credentialsChangedSuccess}
                    submit={this.handleSubmit}
                    change={this.handleChange}
                    person={person}
                    role={auth.getRole()}
                    credsChanged={this.state.changed}
                    wrongPassword={this.state.wrongPassword}
                    wrongEmail={this.state.wrongEmail}
                />
        );
    }
};

export default EditAccount;