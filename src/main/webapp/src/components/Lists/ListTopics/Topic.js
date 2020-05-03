import React from 'react'
import classes from '../Lists.module.css'
import {Button, Col, Row} from "reactstrap";

const topic = (props) => {
    let joinButton;

    if(props.joinTopic && !props.isInTopic){
        joinButton = <Row className="pt-2 pb-3 mr-0 ml-0">
            <Col><Button onClick={() => {
               props.joinTopicHandler()
            }}>Join Topic</Button></Col>
        </Row>
    }
    if(props.joinTopic && props.isInTopic && props.canQuit){
        joinButton = <Row className="pt-2 pb-3 mr-0 ml-0">
            <Col><Button color="danger" outline onClick={() => {
                props.quitTopicHandler()
            }}>Quit Topic</Button></Col>
        </Row>
    }
    if(props.joinTopic && props.isInTopic && !props.canQuit){
        joinButton = <Row className="pt-2 pb-3 mr-0 ml-0">
            <Col><p>You have opened sections in this topic.</p></Col>
        </Row>
    }

    return (
        <div className={classes.Element}>
            <Row className="pt-2 pb-2 mr-0 ml-0">
                <span className="float-left ml-3"><strong>Topic name:</strong> <em>{props.name}</em></span>
            </Row>
            <Row className="pt-2 pb-2 mr-0 ml-0">
                <span className="float-left ml-3"><strong>Summary:</strong> <em>{props.summary}</em></span>
            </Row>
            {joinButton}
        </div>
    )
};

export default topic;