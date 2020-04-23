import React, {Component} from 'react';
import {Alert} from "reactstrap";
import axios from 'axios'
import Topics from "../../components/Lists/ListTopics/Topics";
import Spinner from "../../components/UI/Spinner/Spinner";

class ListTopics extends Component {
    state = {
        error: false,
        subjects: [],
        subject: '',
        topics: null,
        loading: true,
    };

    componentDidMount() {
        axios.get('/api/adminteacher/subjects').then(response => {
            let subjects = [...response.data];
            this.setState({
                subjects: subjects,
                loading: false,
            });
        }).catch(error => {
            this.setState({
                error: true,
                loading: false,
            })
        })
    }

    onSubjectChangeHandler = (event) => {
        this.setState({loading: true});

        const id = event.target.value;

        this.setState({
            subject: id,
        });

        axios.get('/api/adminteacher/topics/' + id).then(response => {
            let topics = [...response.data];
            this.setState({
                topics: topics,
                loading: false
            });
        }).catch(error => {
            this.setState({
                error: true,
                loading: false
            })
        })
    };

    render() {
        const error = this.state.error;
        const loading = this.state.loading;
        let content;

        if (error) {
            return (
                <Alert color="danger">
                    Server Error, Please Try Again.
                </Alert>
            )
        } else if(loading){
            content = <Spinner/>
        } else {
            content = <Topics
            subject={this.state.subject}
            subjects={this.state.subjects}
            onSubjectChange = {this.onSubjectChangeHandler}
            topics={this.state.topics}
            />;
        }

        return content;
    }
}

export default ListTopics;