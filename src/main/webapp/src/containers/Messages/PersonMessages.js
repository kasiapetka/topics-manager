import React, {Component} from 'react';
import NewMessageForm from "../../components/Messages/NewMessageForm";
import MessagesButtons from "../../components/Messages/MessagesButtons";
import ListMessages from "../Lists/ListMessages";
import axios from "axios";
import {Alert} from "reactstrap";
import Spinner from "../../components/UI/Spinner/Spinner";

class Messages extends Component {

    state = {
        formId: 1,
        receiver: null,
        semester: 1,
        showList: null,
        sections: null,
        error: null,
        loading: false,
        section: null
    };

    switchFormHandler = (id) => {
        this.setState({formId: id})
    };

    getSections =(sem) =>{
        this.setState({loading: true});
        axios.get('/api/common/sections/' + sem).then(response => {
            let sections = [...response.data];
            this.setState({
                sections: sections,
                loading: false,
            });
        }).catch(error => {
            this.setState({
                error: error,
                loading: false,
            })
        })
    };

    changeReceiversHandler = (event) => {
        const receiver = event.target.value;
        if (receiver === "section") {
           this.getSections(this.state.semester);
        }
        if (receiver === "teacher") {
            this.setState({receiver: receiver,  showList: true});
            return;
        }
        this.setState({receiver: receiver, showList: false});
    };

    onSemesterChangeHandler = (event) => {
        const sem = event.target.value;
        if (this.state.receiver === "section") {
            this.getSections(sem);
            this.setState({
                semester: sem,
                showList: false
            });
            return;
        }
        this.setState({
            semester: sem,
            showList: true
        });
    };

    onSectionChangeHandler = (event) =>{
        this.setState({
            section: event.target.value,
            showList: true
        });
    };

    render() {
        let content;
        const error = this.state.error;
        const loading = this.state.loading;
        if (error) {
            return (
                <Alert color="danger">
                    Server Error, Please Try Again.<br/>
                    {error.message}
                </Alert>
            )
        } else if (loading) {
            return<Spinner/>
        }
        if (this.state.formId === 1) {
            content = <NewMessageForm changeReceivers={this.changeReceiversHandler}
                                      onSectionChange={this.onSectionChangeHandler}
                                      reciever={this.state.receiver}
                                      section={this.state.section}
                                      semester={this.state.semester}
                                      showList={this.state.showList}
                                      sections={this.state.sections}
                                      onSemesterChange={this.onSemesterChangeHandler}/>;
        } else if (this.state.formId === 2) {
            content = <ListMessages/>;
        } else if (this.state.formId === 3) {
            content = <ListMessages/>;
        }

        return (
            <div className="mt-4">
                <MessagesButtons switchForm={this.switchFormHandler}/>
                {content}
            </div>
        );
    }
}

export default Messages;