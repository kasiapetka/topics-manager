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
import { FiRefreshCcw } from "react-icons/fi";
import ViewMessage from "../Messages/ViewMessage";

class ListMessages extends Component {

    state = {
        messages: [],
        error: null,
        loading: true,
        mounted: false,
        type: null
    };

    getMessages = () => {
        this.setState({loading: true});
        const path = this.props.path;

        axios.get(path).then(response => {
            let messages = [...response.data];
            this.setState({
                messages: messages,
                loading: false,
                mounted: true,
                type: this.props.type
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
        if (this.state.mounted){
            if(this.props.path !== prevProps.path) {
                this.getMessages();
            }
        }
    }

    viewMessageHandler = (id) => {
        if(this.state.type === 'inbox'){
            const msgs = [...this.state.messages];
            msgs.forEach(msg => {
                if (msg.id === id) {
                    msg.isRead = true;
                }
            });
        }
        axios.put('/api/message/'+id).then(response => {
            this.props.history.push(this.props.match.url + '/' + id);
        }).catch(error => {
            this.setState({
                error: error,
                loading: false,
            })
        });
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
                    <Button className="btn-sm btn-light border shadow-sm pr-2 pl-2 mb-1"
                            onClick={()=>this.getMessages()}>
                        <FiRefreshCcw className="mr-1"/>Refresh</Button>

                    <PrivateAdminRoute exact path="/admin/messages"
                                       component={() => <Messages
                                           viewMessage={this.viewMessageHandler}
                                           type={this.state.type}
                                           messages={this.state.messages}/>}/>
                    <PrivateTeacherRoute exact path="/teacher/messages"
                                         component={() => <Messages
                                             viewMessage={this.viewMessageHandler}
                                             type={this.state.type}
                                             messages={this.state.messages}/>}/>
                    <PrivateStudentRoute exact path="/student/messages"
                                         component={() => <Messages
                                             viewMessage={this.viewMessageHandler}
                                             type={this.state.type}
                                             messages={this.state.messages}/>}/>

                    <PrivateAdminRoute exact path="/admin/messages/:id"
                                       component={() => <p>sdfsdf</p>}/>
                    <PrivateTeacherRoute exact path="/teacher/messages/:id"
                                         component={ViewMessage}/>
                    <PrivateStudentRoute exact path="/student/messages/:id"
                                         component={() => <p>sdfsdf</p>}/>

                </div>
            );
        }

        return content;
    }
}

export default withRouter(ListMessages);