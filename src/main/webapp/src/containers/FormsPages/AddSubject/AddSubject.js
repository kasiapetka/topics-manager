import React, {Component} from 'react';
import AddSubjectForm from "../../../components/Forms/FormsTemplates/AddSubjectForm/AddSubjectForm";
import {Alert} from "reactstrap";
import axios from "axios";
import AddedSubjectCard from "../../../components/UI/Cards/SubjectCards/AddedSubjectCard/AddedSubjectCard";

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
        wrongName: false,
        subjectAdded: false
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

        axios.post('/api/admin/addsubject', subject).then(response => {
            this.setState({subjectAdded: true})
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
        } else if(!subjectAdded){
            content = (
                <AddSubjectForm
                    subject={this.state.subject}
                    change={this.handleChange}
                    emptyForm={this.state.emptyForm}
                    changed={this.state.changed}
                    submit={this.handleSubmit}
                    wrongName={this.state.wrongName}/>
            )
        }else {
            content = (
                <AddedSubjectCard
                subject={this.state.subject}/>
            )
        }

        return content;
    }
}

export default AddSubject;