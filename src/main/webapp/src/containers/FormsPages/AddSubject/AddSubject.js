import React, {Component} from 'react';
import AddSubjectForm from "../../../components/Forms/FormsTemplates/AddSubjectForm/AddSubjectForm";
import {Alert} from "reactstrap";
import axios from "axios";

class AddSubject extends Component {

    emptySubject = {
        name: "",
        summary: ""
    };

    state = {
        error: false,
        emptyForm: false,
        changed: false,
        subject: this.emptySubject,
    };

    handleChange = (event) => {
        const target = event.target;
        const value = target.value;
        let subject = {...this.state.subject};
        subject[target.name] = value;

        this.setState({
            subject: subject,
            emptyForm: false,
            changed: true
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();

        if (this.state.subject.name === '') {
            this.setState({
                emptyForm: true
            });
            return;
        }

        const subject = {...this.state.subject};

        axios.post('/admin/addSubject', subject).then(response => {
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
                <AddSubjectForm
                    subject={this.state.subject}
                    change={this.handleChange}
                    emptyForm={this.state.emptyForm}
                    changed={this.state.changed}
                    submit={this.handleSubmit}/>
            )
        }

        return content;
    }
}

export default AddSubject;