import classes from './ListTopics.module.css'
import PickSubjectInput from "./PickSubjectInput/PickSubjectInput";
import React from "react";
import Topic from "./Topic";

const Topics = (props) => {

    let topics;
    if(props.topics !== null){
        topics=props.topics.map((topic, index) => {
            return <Topic
                name={topic.name}
                summary={topic.summary}
                key={topic.id}
            />
        });
    }

    return (
        <div className={classes.Topics}>
            <PickSubjectInput
                subjects={props.subjects}
                subject={props.subject}
                onSubjectChange = {props.onSubjectChange}
            />
            {
                props.topics
                    ?
                    topics
                    :
                    null
            }
        </div>
    )
};

export default Topics;
