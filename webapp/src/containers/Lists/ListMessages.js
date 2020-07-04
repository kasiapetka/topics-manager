import React, {Component} from 'react';
import Messages from "../../components/Messages/ListMessages/Messages";
import classes from "../../components/Messages/Messages.module.css";
import {Alert} from "reactstrap";
import Spinner from "../../components/UI/Spinner/Spinner";
import axios from "axios";
import {withRouter} from "react-router-dom";
import PrivateAdminRoute from "../../components/PrivateRoutes/PrivateAdminRoute";
import PrivateTeacherRoute from "../../components/PrivateRoutes/PrivateTeacherRoute";
import PrivateStudentRoute from "../../components/PrivateRoutes/PrivateStudentRoute";
import {Button} from "reactstrap";
import {FiRefreshCcw} from "react-icons/fi";
import ViewMessage from "../Messages/ViewMessage";
import ReplyMessage from "../Messages/ReplyMessage";

class ListMessages extends Component {

    state = {
        messages: [],
        error: null,
        loading: true,
        mounted: false,
        type: null,
        email: null,
        msgDeleted: false
    };

    getMessages = () => {
        this.setState({loading: true});
        const path = this.props.pathName;

        axios.get(path).then(response => {
            let messages = [...response.data];
            this.setState({
                messages: messages,
                loading: false,
                mounted: true,
                type: this.props.type,
                msgDeleted: false
            });
        }).catch(error => {
            this.setState({
                error: error,
                loading: false,
                mounted: true
            })
        })
    };

    componentDidMount() {
        this.getMessages();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.mounted) {
            if (this.props.pathName !== prevProps.pathName
                || this.state.msgDeleted !== prevState.msgDeleted) {
                this.getMessages();
            }
        }
    }

    viewMessageHandler = (id) => {
        if (this.state.type === 'inbox') {
            const msgs = [...this.state.messages];
            msgs.forEach(msg => {
                if (msg.id === id) {
                    msg.isRead = true;
                }
            });
        }
        axios.put('/api/message/' + id).then(response => {
            this.props.history.push(this.props.match.url + '/message/' + id);
        }).catch(error => {
            this.setState({
                error: error,
                loading: false,
            })
        });
    };

    deleteMessageHandler = (id) => {
        axios.delete('/api/message/' + this.state.type + '/' + id).then(response => {
            alert('Message deleted!')
            this.setState({msgDeleted: true})
        }).catch(error => {
            this.setState({
                error: error,
                loading: false,
            })
        });
    };

    replyToPersonHandler = (email) => {
        this.setState({email: email});
        this.props.history.push(this.props.match.url + '/reply');
    };

    render() {
        const classNames = "border rounded pt-4 pb-5 mb-4 pr-3 pl-3 " + classes.Messages;
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
            content = (
                <div className={classNames}>
                    <Button className="btn-sm ml-2 btn-light border shadow-sm pr-2 pl-2 mb-1 d-inline-block"
                            onClick={() => this.getMessages()}>
                        <FiRefreshCcw className="mr-1"/>Refresh</Button>

                    <PrivateAdminRoute exact path="/admin/messages/reply" component={() => <ReplyMessage
                        receiver={this.state.email}/>}/>
                    <PrivateTeacherRoute exact path="/teacher/messages/reply" component={() => <ReplyMessage
                        receiver={this.state.email}/>}/>
                    <PrivateStudentRoute exact path="/student/messages/reply" component={() => <ReplyMessage
                        receiver={this.state.email}/>}/>

                    <PrivateAdminRoute exact path="/admin/messages" component={() => <Messages
                        viewMessage={this.viewMessageHandler}
                        deleteMessage={this.deleteMessageHandler}
                        type={this.state.type}
                        messages={this.state.messages}/>}/>
                    <PrivateTeacherRoute exact path="/teacher/messages" component={() => <Messages
                        viewMessage={this.viewMessageHandler}
                        deleteMessage={this.deleteMessageHandler}
                        type={this.state.type}
                        messages={this.state.messages}/>}/>
                    <PrivateStudentRoute exact path="/student/messages" component={() => <Messages
                        viewMessage={this.viewMessageHandler}
                        deleteMessage={this.deleteMessageHandler}
                        type={this.state.type}
                        messages={this.state.messages}/>}/>

                    <PrivateAdminRoute exact path="/admin/messages/message/:id" component={() => <ViewMessage
                        type={this.state.type}
                        replyToPerson={this.replyToPersonHandler}/>}/>
                    <PrivateTeacherRoute exact path="/teacher/messages/message/:id" component={() => <ViewMessage
                        type={this.state.type}
                        replyToPerson={this.replyToPersonHandler} {...this.props}/>}/>
                    <PrivateStudentRoute exact path="/student/messages/message/:id" component={() => <ViewMessage
                        type={this.state.type}
                        replyToPerson={this.replyToPersonHandler} {...this.props}/>}/>
                </div>
            );
        }
        return content;
    }
}

export default withRouter(ListMessages);
