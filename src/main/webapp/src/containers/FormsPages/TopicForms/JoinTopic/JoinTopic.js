import React, {Component} from "react";
import axios from "axios";
import auth from "../../../../Auth";

import ListTopics from "../../../Lists/ListTopics";

class JoinTopic extends Component {

    state = {
        teacherTopics: null,
        topics: [],
        subject: null,
        error: false,
        loading: false
    };

    subjectChanged = (topics, subjectId) => {
        axios.get('/api/teacher/topics/' + subjectId + '/' + auth.getId()).then(response => {
            let teacherTopics = [...response.data];

            //request z ktorych topikow nie moge wyjsc
            //api/teacher/openedtopics/' + subjectId + '/' + auth.getId())

            console.log(teacherTopics)
            topics.forEach(topic => {
                topic.isInTopic = false;
                topic.canQuit = true;
            });

            // topics.forEach(topic => {
            //     teacherOpenedTopics.forEach(teacherInOpenedTopic => {
            //         if (teacherInOpenedTopic.id === topic.id) {
            //             topic.canQuit = false;
            //         } else if (topic.isInTopic !== true) {
            //             topic.canQuit = true;
            //         }
            //     });
            // });

            topics.forEach(topic => {
                teacherTopics.forEach(teacherInTopic => {
                    if (teacherInTopic.id === topic.id) {
                        topic.isInTopic = true;
                    } else if (topic.isInTopic !== true) {
                        topic.isInTopic = false;
                    }
                });
            });
            console.log(topics)
            this.setState({
                teacherTopics: topics,
                subject: subjectId,
                topics: topics,
                loading: false
            });
        }).catch(error => {
            this.setState({
                error: true,
                loading: false
            })
        });
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
