import React, {Component} from 'react';
import AddSubjectForm from "../../../../components/Forms/FormsTemplates/AddSubjectForm/AddSubjectForm";
import {Alert} from "reactstrap";
import axios from "axios";
import AddedSubjectCard from "../../../../components/UI/Cards/SubjectCards/AddedSubjectCard/AddedSubjectCard";
import handleInputChange from "../../validateForm";

class AddSubject extends Component {

    state = {
        error: false,
        subject: {
            name: {
                value: '',
                validation: {
                    valid: false,
                    touched: false,
                    required: true,
                    minLength: 2
                }
            },
            summary: {
                value: '',
                validation: {
                    valid: true,
                    touched: false
                }
            }
        },
        formValid: false,
        wrongName: false,
        subjectAdded: false
    };

    handleChange = (event) => {
        const formProperties = handleInputChange(event, this.state.subject);

        this.setState({
            subject: formProperties.form,
            formValid: formProperties.formValid,
            wrongName: false
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();

        const subject = {
            name: this.state.subject.name.value,
            summary: this.state.subject.summary.value,
        };

        axios.post('/api/admin/addsubject', subject).then(response => {
            this.setState({
                subjectAdded: true,
                subject: subject
            })
        }).catch(error => {
            if (error.response.status === 409) {
                this.setState({wrongName: true})
            } else {
                this.setState({error: true,})
            }
        })

    };

    render() {
        const error = this.state.error;
        const subjectAdded = this.state.subjectAdded;
        let content;

        if (error) {
            content = (
                <Alert color="danger">
                    Server Error, Please Try Again.
                </Alert>
            )
        } else if (!subjectAdded) {
            content = (
                <AddSubjectForm
                    subject={this.state.subject}
                    change={this.handleChange}
                    submit={this.handleSubmit}
                    wrongName={this.state.wrongName}
                    formValid={this.state.formValid}/>
            )
        } else {
            content = (
                <AddedSubjectCard
                    subject={this.state.subject}/>
            )
        }

        return content;
    }
}

export default AddSubject;