import React, {Component} from 'react';
import AddPersonForm from "../../../components/Forms/FormsTemplates/AddPersonForm/AddPersonForm";
import axios from "axios";
import {Alert} from "reactstrap";

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

        let path;
        if (this.props.personRole === 'S') {
            path = '/api/admin/addStudent'
        }
        if (this.props.personRole === 'T') {
            path = '/api/admin/addTeacher'
        }

        const person = this.state.person;

        axios.post(path, person).then(response => {

        }).catch(error => {
            this.setState({
                error: true,
            })
        })

    };

    render() {

        const error = this.state.error;
        let content;

        if (error) {
            content = (
                <Alert color="danger">
                    Server Error, Please Try Again.
                </Alert>
            )
        } else {
            content = (
                <AddPersonForm
                    personRole={this.props.personRole}
                    person={this.state.person}
                    change={this.handleChange}
                    emptyForm={this.state.emptyForm}
                    changed={this.state.changed}
                    submit={this.handleSubmit}/>
            )
        }

        return content;
    }
}

export default AddPerson;