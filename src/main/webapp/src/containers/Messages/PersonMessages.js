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
        section: null,
        addButton: false,
        receivers: [],
        person: ''
    };

    switchFormHandler = (id) => {
        this.setState({formId: id})
    };

    handleChange = (event) => {
        const target = event.target;
        const value = target.value;
        let person, add;
        person = value;
        if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(person)){
            add=true;
        }
        this.setState({
            person: person,
            addButton: add
        });
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
            this.setState({receiver: receiver,  showList: true, semester: 1});
            return;
        }
        this.setState({receiver: receiver, showList: false, semester: 1});
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

    addPersonToListHandler=()=>{
        console.log(this.state.person)
        const receivers = [...this.state.receivers];
        receivers.push(this.state.person);

        //tutaj req czy istnieje


        this.setState({receivers: receivers})
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
                                      receivers={this.state.receivers}
                                      addPersonToList={this.addPersonToListHandler}
                                      section={this.state.section}
                                      semester={this.state.semester}
                                      showList={this.state.showList}
                                      addButton={this.state.addButton}
                                      person={this.state.person}
                                      sections={this.state.sections}
                                      onChange={this.handleChange}
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