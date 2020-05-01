import React, {Component} from 'react';
import {Alert} from "reactstrap";
import axios from "axios";
import AddTopicForm from "../../../../components/Forms/FormsTemplates/AddTopicForm/AddTopicForm";
import AddedTopicCard from "../../../../components/UI/Cards/TopicCards/AddedTopicCard/AddedTopicCard";
import handleInputChange from "../../validateForm";

class AddTopic extends Component {

    state = {
        error: false,
        topic: {
            subject: {
                value: null,
                validation: {
                    valid: false,
                    touched: false,
                    required: true,
                }
            },
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
        subjects: [],
        topicAdded: false
    };

    componentDidMount() {
        axios.get('/api/adminteacher/subjects').then(response => {
            let subjects = [...response.data];
            this.setState({
                subjects: subjects
            });
        }).catch(error => {
            this.setState({
                error: true,
            })
        })
    }

    handleChange = (event) => {
        const formProperties = handleInputChange(event, this.state.topic);

        this.setState({
            topic: formProperties.form,
            formValid: formProperties.formValid,
            wrongName: false
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        const topic = {
            subject: +this.state.topic.subject.value,
            name: this.state.topic.name.value,
            summary: this.state.topic.summary.value,
        };

        axios.post('/api/adminteacher/addtopic', topic).then(response => {
            let subjects = [...this.state.subjects];
            subjects = subjects.filter((subject) => subject.id === topic.subject);
            topic.subject = subjects[0].name;
            this.setState({
                topicAdded: true,
                topic: topic
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
        const topicAdded = this.state.topicAdded;
        let content;

        if (error) {
            content = (
                <Alert color="danger">
                    Server Error, Please Try Again.
                </Alert>
            )
        } else if (!topicAdded) {
            content = (
                <AddTopicForm
                    topic={this.state.topic}
                    onChange={this.handleChange}
                    formValid={this.state.formValid}
                    onSubmit={this.handleSubmit}
                    subjects={this.state.subjects}
                    wrongName={this.state.wrongName}/>
            )
        } else {
            content = (
                <AddedTopicCard
                    topic={this.state.topic}/>
            )
        }
        return content;
    }
}

export default AddTopic;