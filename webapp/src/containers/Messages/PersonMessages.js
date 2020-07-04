import React, {Component} from 'react';
import NewMessageForm from "../../components/Messages/NewMessageForm";
import MessagesButtons from "../../components/Messages/MessagesButtons";
import ListMessages from "../Lists/ListMessages";
import axios from "axios";
import {Alert} from "reactstrap";
import Spinner from "../../components/UI/Spinner/Spinner";
import handleInputChange from "../FormsPages/validateForm";
import Modal from "../../components/UI/Modal/Modal";

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
        person: '',
        message: {
            subject: {
                value: '',
                validation: {
                    valid: false,
                    touched: false,
                    required: true,
                }
            },
            content: {
                value: '',
                validation: {
                    valid: false,
                    touched: false,
                    required: true,
                }
            },
        },
        formValid: false,
        sent: false
    };

    switchFormHandler = (id) => {
        this.setState({formId: id})
    };

    handleChange = (event) => {
        const formProperties = handleInputChange(event, this.state.message);

        this.setState({
            message: formProperties.form,
            formValid: formProperties.formValid,
        });
    };

    handlePersonChange = (event) => {
        const target = event.target;
        const value = target.value;
        let person, add;
        person = value;
        if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(person)) {
            add = true;
        }
        this.setState({
            person: person,
            addButton: add
        });
    };

    getSections = (sem) => {
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
            this.setState({receiver: receiver, showList: false, semester: 1});
            return;
        }
        if (receiver === "teacher" || receiver === "student") {
            this.setState({receiver: receiver, showList: true, semester: 1});
        }
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

    onSectionChangeHandler = (event) => {
        this.setState({
            section: event.target.value,
            showList: true
        });
    };

    addPersonToListManuallyHandler = () => {
        const email = this.state.person;
        const receivers = [...this.state.receivers];
        let alreadyOnList = false;
        receivers.forEach(rcv => {
            if (rcv === email) {
                alert('Person with this email is already on list.');
                alreadyOnList = true;
            }
        });

        if (!alreadyOnList) {
            axios.put('/api/common/person', email).then(response => {
                receivers.push(response.data);
                this.setState({receivers: receivers})
            })
                .catch(error => {
                    if (error.response) {
                        if (error.response.status === 409) {
                            alert('Person with this email does not exists.')
                        }
                    } else {
                        this.setState({error: error})
                    }
                });
        }
    };

    addPersonToListHandler = (person) => {
        const receivers = [...this.state.receivers];
        receivers.push(person);
        this.setState({receivers: receivers})
    };

    removePersonFromListHandler = (person) => {
        const receivers = [...this.state.receivers];
        let removed = receivers.filter((receiver) => receiver.user.email !== person.user.email);
        this.setState({receivers: removed})
    };

    onSendMessageHandler = (event) => {
        event.preventDefault();

        const receivers = [...this.state.receivers];
        const emails = [];

        receivers.forEach(rcv =>{
            emails.push(rcv.user.email);
        });

        const msg = {
            receivers: emails,
            subject: this.state.message.subject.value,
            content: this.state.message.content.value
        };
        this.setState({loading: true});
        axios.post('/api/message/send', msg).then(response => {
            this.setState({sent: true, loading: false})
        }).catch(error => {
            this.setState({error: error, loading: false})
        });
    };

    showSentInfoHandler = () => {
        this.setState((prevState) => {
            return {
                sent: !prevState.sent
            }
        });
        window.location.reload();
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
            return <Spinner/>
        }
        if (this.state.sent) {
            content = <Modal show={this.state.sent}
                             modalClosed={this.showSentInfoHandler}>Message Sent!</Modal>
        } else if (this.state.formId === 1) {
            content = <NewMessageForm reciever={this.state.receiver}
                                      receivers={this.state.receivers}
                                      section={this.state.section}
                                      semester={this.state.semester}
                                      showList={this.state.showList}
                                      addButton={this.state.addButton}
                                      person={this.state.person}
                                      sections={this.state.sections}
                                      message={this.state.message}
                                      formValid={this.state.formValid}
                                      changeReceivers={this.changeReceiversHandler}
                                      onSectionChange={this.onSectionChangeHandler}
                                      addPersonToListManually={this.addPersonToListManuallyHandler}
                                      removePersonFromList={this.removePersonFromListHandler}
                                      addPersonToList={this.addPersonToListHandler}
                                      onPersonChange={this.handlePersonChange}
                                      onChange={this.handleChange}
                                      onSendMessage={this.onSendMessageHandler}
                                      onSemesterChange={this.onSemesterChangeHandler}/>;
        } else if (this.state.formId === 2) {
            content = <ListMessages type='inbox'
                                    pathName='/api/message/inbox'/>;
        } else if (this.state.formId === 3) {
            content = <ListMessages type='sent'
                                    pathName='/api/message/sent'/>;
        }

        return (
            <div className="mt-4">
                <MessagesButtons formId={this.state.formId}
                                 switchForm={this.switchFormHandler}/>
                {content}
            </div>
        );
    }
}

export default Messages;
