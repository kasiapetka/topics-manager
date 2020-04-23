import React, {Component} from 'react';
import auth from "../../../Auth";
import {Badge, Alert} from "reactstrap";
import EditAccountInputs from "../../../components/Forms/FormsTemplates/EditForm/EditAccountForm";
import EditPersonForm from "../../../components/Forms/FormsTemplates/EditForm/EditPersonForm";
import {Redirect} from "react-router-dom";
import axios from 'axios'
import Spinner from "../../../components/UI/Spinner/Spinner";

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
            emptyForm: false,
            loading: true
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount = async () => {
        let user = {...this.state.person};
         if (!this.state.changed) {
              axios.put(this.props.path, JSON.stringify(user)).then(response => {
                    let person = {...response.data};
                    this.setState({
                        person: person,
                        loading:false
                    });
            })
                .catch(error => {
                    this.setState({
                        serverError: true,
                        loading:false
                    });
                });
        }
    };

    handleChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let person = {...this.state.person};
        person[name] = value;
        this.setState({
            person: person,
            changed: true,
            emptyForm: false
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({
            wrongEmail: false,
            wrongPassword: false,
            loading: true
        });

        let user = {...this.state.person};
        if (user.password === '' ||
            (user.newEmail === '' && user.newPassword === '' &&
                user.newName === '' && user.newSurname === '')) {
            this.setState({
                wrongPassword: true,
                emptyForm: true,
                changed: true,
                loading: false
            });
            return;
        }

        axios.put(this.props.path,user).then(response => {
                let person = {...response.data};
                this.setState({
                    person: person,
                    loading: false,
                    credsChanged: true
                });
                if (response.data.email !== user.email && !this.state.personEdition) {
                    this.setState({redirect: true});
                }
        })
            .catch(error => {
                this.setState({ loading:false });
                if (error.response.status === 406) {
                    this.setState({wrongPassword: true});
                } else if (error.response.status === 409) {
                    this.setState({wrongEmail: true});
                } else
                    this.setState({serverError: true});
            });
    };

    render() {
        const {person} = this.state;
        const serverError = this.state.serverError;
        const credsChanged = this.state.credsChanged;
        const redirect = this.state.redirect;
        let form;

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

        if(this.state.loading){
            form=<Spinner/>
        }
        else if(this.state.personEdition){
            form= <EditPersonForm
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
        }
        else{
            form = <EditAccountInputs
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
        }

        return form;
    }
};

export default EditAccount;