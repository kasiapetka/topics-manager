import React, {Component} from "react";
import ListTopics from "../../../Lists/ListTopics";

class JoinTopic extends Component{
    render() {
        return (
            <ListTopics joinTopic={true}/>
        );
    }
}

export default JoinTopic;
