import React, {Component} from 'react';
import auth from "../../Auth";
import {Badge, Alert} from "reactstrap";
import EditAccountInputs from "../../components/Forms/FormsTemplates/EditAccountInputs";
import EditPersonInputs from "../../components/Forms/FormsTemplates/EditPersonInputs";
import {Redirect} from "react-router-dom";
import axios from 'axios'

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
            serverError: false,
            changed: false,
            credsChanged: false,
            wrongPassword: false,
            redirect: false,
            wrongEmail: false,
            path: props.path,
            personEdition: props.personEdition,
            emptyForm: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount = async () => {
        let user = {...this.state.person};

        if (!this.state.changed) {

            axios.put(this.props.path, JSON.stringify(user)).then(response => {
                    let person = {...response.data};
                    this.setState({person: person});
            })
                .catch(error => {
                    this.setState({serverError: true});
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
        this.setState({emptyForm: false});
    };

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({
            wrongEmail: false,
            wrongPassword: false
        });


        let user = {...this.state.person};
        if (user.password === '' ||
            (user.newEmail === '' && user.newPassword === '' &&
                user.newName === '' && user.newSurname === '')) {
            this.setState({wrongPassword: true});
            this.setState({emptyForm: true})
            this.setState({changed: true});
            return;
        }

        axios.put(this.props.path,user).then(response => {
                let person = {...response.data};
                this.setState({person: person});
                this.setState({credsChanged: true});
                if (response.data.email !== user.email && !this.state.personEdition) {
                    this.setState({redirect: true});
                }
        })
            .catch(error => {
                console.log(error.response.status);

                if (error.response.status === 406) {
                    this.setState({wrongPassword: true});
                } else if (error.response.status === 409) {
                    this.setState({wrongEmail: true});
                } else this.setState({serverError: true});
            });
    };

    render() {
        const {person} = this.state;
        const serverError = this.state.serverError;
        const credsChanged = this.state.credsChanged;
        const redirect = this.state.redirect;

        let credentialsChangedSuccess;

        if (serverError) {
            return (
                <Alert color="danger">
                    Server Error, Please Try Again.
                </Alert>
            )
        }

        if (redirect) {
            auth.logout();
            return (
                <Redirect to='/login'/>
            )
        }

        if (credsChanged) {
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
                    personRole={this.props.personRole}
                    credsChanged={this.state.changed}
                    wrongPassword={this.state.wrongPassword}
                    wrongEmail={this.state.wrongEmail}
                    emptyForm={this.state.emptyForm}
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
                    emptyForm={this.state.emptyForm}
                />
        );
    }
};

export default EditAccount;