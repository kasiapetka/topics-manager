import classes from '../Lists.module.css'
import React from "react";
import Topic from "./Topic";

const Topics = (props) => {

    let topics;
    if(props.topics !== null){
        if(props.topics.length !== 0){
            topics=props.topics.map((topic, index) => {
                return <Topic
                    name={topic.name}
                    summary={topic.summary}
                    key={topic.id}
                    joinTopic={props.joinTopic}
                    isInTopic={topic.isInTopic}
                    joinTopicHandler={()=>props.joinTopicHandler(index)}
                />
            });
        }else{
            topics=<div><h4 className="text-center mt-4">No topics in this subject.</h4></div>
        }
    }

    return (
        <div className={classes.List}>
            {topics}
        </div>
    )
};

export default Topics;
