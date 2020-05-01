import React, {Component} from "react";
import axios from "axios";

import ListTopics from "../../../Lists/ListTopics";

class JoinTopic extends Component {

    state = {
        teacherTopics: [],
        topics: [],
        subject: null,
        error: false,
        loading: false
    };

    subjectChanged = (topics, subjectId) => {

        //axios.get('/api/teacher/topics'+id+'/'+auth.getId()).then(response => {
        //     let teacherTopics = [...response.data];

        // topics.forEach(topic => {
        //     teacherTopics.forEach(teacherInTopic => {
        //         if (teacherInTopic.id === topic.id) {
        //             topic.isInTopic = true;
        //         } else if (topic.isInTopic !== true) {
        //             topic.isInTopic = false;
        //         }
        //     });
        // });
        //     this.setState({
        //         teacherTopics: teacherTopics,
        //             subject: subjectId,
        //             topics: topics,
        //          loading: false
        //     });
        // }).catch(error => {
        //     this.setState({
        //         error: true,
        //          loading: false
        //     })
        // });
    };

    joinTopicHandler = (index) => {
        console.log('joinTopicHandler' + index + " " + this.state.subject)
    };

    render() {

        return (
            <ListTopics
                joinTopic={true}
                joinTopicHandler={this.joinTopicHandler}
                subjectChanged={this.subjectChanged}
                teacherTopics={this.state.teacherTopics}
            />
        );
    }
}

export default JoinTopic;
