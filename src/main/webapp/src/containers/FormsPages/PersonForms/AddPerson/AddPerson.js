import React, {Component} from 'react';
import AddPersonForm from "../../../../components/Forms/FormsTemplates/AddPersonForm/AddPersonForm";
import axios from "axios";
import {Alert} from "reactstrap";
import {withRouter} from "react-router-dom";
import AddedPersonCard from '../../../../components/UI/Cards/PersonCards/AddedPersonCard/AddedPersonCard'

class AddPerson extends Component {

    emptyPerson = {
        password: '',
        newEmail: '',
        newPassword: '',
        newName: '',
        newSurname: '',
        semester: '',
    };

    state = {
        error: false,
        emptyForm: false,
        changed: false,
        person: this.emptyPerson,
        wrongEmail: false,
        wrongPassword: false,
        personAdded: false,
    };

    handleChange = (event) => {
        const target = event.target;
        const value = target.value;
        let person = {...this.state.person};
        person[target.name] = value;

        this.setState({
            person: person,
            emptyForm: false,
            changed: true
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();

        const person = {...this.state.person};
        const role = this.props.match.params.role;
        let path;

        if (person.newName === '' ||
            person.newSurname === ''){
            this.setState({emptyForm: true});
            return;
        }

        if (role === 'S') {
            path = '/api/admin/addstudent';
            if (person.semester === '') {
                this.setState({emptyForm: true});
                return;
            }
        }
        if (role === 'T') {
            path = '/api/admin/addteacher';
            if (person.newEmail === '' ||
                person.newPassword === '') {
                this.setState({emptyForm: true});
                return;
            }
        }

        axios.post(path, person).then(response => {
            this.setState({personAdded:true});
        }).catch(error => {
            if (error.response.status === 409) {
                this.setState({
                    wrongEmail: true,
                })
            } else if (error.response.status === 406) {
                this.setState({
                    wrongPassword: true,
                })
            } else {
                this.setState({
                    error: true,
                })
            }
        })

    };

    render() {
        const error = this.state.error;
        const personAdded = this.state.personAdded;
        let content;

        if (error) {
            content = (
                <Alert color="danger">
                    Server Error, Please Try Again.
                </Alert>
            )
        } else if(!personAdded){
            content = (
                <AddPersonForm
                    personRole={this.props.personRole}
                    person={this.state.person}
                    change={this.handleChange}
                    emptyForm={this.state.emptyForm}
                    wrongEmail={this.state.wrongEmail}
                    wrongPassword={this.state.wrongPassword}
                    changed={this.state.changed}
                    submit={this.handleSubmit}/>
            )
        }else{
            content = (
                <AddedPersonCard
                person={this.state.person}/>
            )
        }

        return content;
    }
}

export default withRouter(AddPerson);