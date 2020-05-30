import React, {Component} from 'react';
import {Alert} from "reactstrap";
import axios from 'axios'
import Topics from "../../components/Lists/ListTopics/Topics";
import Spinner from "../../components/UI/Spinner/Spinner";
import PickSubjectInput from "../../components/Lists/PickSubjectInput/PickSubjectInput";
import auth from "../../Auth";

class ListTopics extends Component {

    state = {
        error: null,
        subjects: [],
        subject: '',
        topics: null,
        loading: true,
        role: auth.getRole()
    };

    componentDidMount() {
        let path;
        if(this.state.role === 'A') path='/api/admin/subjects';
        if(this.state.role === 'T') path='/api/adminteacher/subjects/'+auth.getId();
        this.setState({loading: true});

        axios.get(path).then(response => {
            let subjects = [...response.data];
            this.setState({
                subjects: subjects,
                loading: false,
            });
        }).catch(error => {
            this.setState({
                error: error,
                loading: false,
            })
        })
    }

    onSubjectChangeHandler = (event) => {
        this.setState({loading: true});
        const id = event.target.value;

        this.setState({subject: id});

        axios.get('/api/adminteacher/topics/' + id).then(response => {
            let topics = [...response.data];
            this.setState({
                topics: topics,
                loading: false
            });

            if (this.props.joinTopic)
                this.props.subjectChanged(topics, id);

            //to z ustawieniem czy w topiku jest
            if (this.props.teacherTopics) {
                console.log('sdfsdf')
                console.log(this.props.teacherTopics)
                this.setState({
                    topics: this.props.teacherTopics
                });
            }

        }).catch(error => {
            this.setState({
                error: error,
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
                    Server Error, Please Try Again.<br/>
                    {error.message}
                </Alert>
            )
        } else if (loading) {
            content = <Spinner/>
        } else {
            content =
                <React.Fragment>
                    <Topics
                        topics={this.state.topics}
                        joinTopic={this.props.joinTopic}
                        joinTopicHandler={this.props.joinTopicHandler}
                        quitTopicHandler={this.props.quitTopicHandler}
                    />
                </React.Fragment>
        }

        return (
            <React.Fragment>
                <PickSubjectInput
                    subjects={this.state.subjects}
                    subject={this.state.subject}
                    onSubjectChange={this.onSubjectChangeHandler}
                />
                {content}
            </React.Fragment>
        );
    }
}

export default ListTopics;