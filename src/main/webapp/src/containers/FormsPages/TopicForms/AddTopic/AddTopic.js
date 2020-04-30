import React, {Component} from 'react';
import {Alert} from "reactstrap";
import axios from "axios";
import AddTopicForm from "../../../../components/Forms/FormsTemplates/AddTopicForm/AddTopicForm";
import AddedTopicCard from "../../../../components/UI/Cards/TopicCards/AddedTopicCard/AddedTopicCard";

class AddTopic extends Component {

    emptyTopic = {
        name: "",
        summary: "",
        subject: null
    };

    state = {
        error: false,
        emptyForm: false,
        changed: false,
        topic: this.emptyTopic,
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
        const target = event.target;
        const value = target.value;
        let topic = {...this.state.topic};
        topic[target.name] = value;

        this.setState({
            topic: topic,
            emptyForm: false,
            changed: true
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();

        if (this.state.topic.name === '' ||
            this.state.topic.subject === '') {
            this.setState({
                emptyForm: true
            });
            return;
        }
        const topic = {...this.state.topic};
        topic.subject = +this.state.topic.subject;

        axios.post('/api/adminteacher/addtopic', topic).then(response => {
            let subjects = [...this.state.subjects];
            subjects = subjects.filter((subject) => subject.id == topic.subject);
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
                    emptyForm={this.state.emptyForm}
                    changed={this.state.changed}
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