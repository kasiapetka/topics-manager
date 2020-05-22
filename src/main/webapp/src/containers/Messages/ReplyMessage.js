import React, {Component} from 'react';
import ReplyMessageForm from "../../components/Messages/ReplyMessageForm";
import handleInputChange from "../FormsPages/validateForm";
import axios from "axios";
import {withRouter} from "react-router-dom";

class ReplyMessage extends Component {
    state = {
        error: null,
        loading: true,
        receiver: this.props.receiver,
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
        formValid: false
    };

    handleChange = (event) => {
        const formProperties = handleInputChange(event, this.state.message);
        this.setState({
            message: formProperties.form,
            formValid: formProperties.formValid,
        });
    };

    onSendMessageHandler = (event) => {
        event.preventDefault();
        const msg = {
            receivers: [this.state.receiver],
            subject: this.state.message.subject.value,
            content: this.state.message.content.value
        };
        axios.post('/api/message/send', msg).then(response => {
            this.props.history.goBack();
        }).catch(error => {
            this.setState({error: error})
        });
    };

    render() {
        return <ReplyMessageForm
            message={this.state.message}
            formValid={this.state.formValid}
            onChange={this.handleChange}
            onSendMessage={this.onSendMessageHandler}
            receiver={this.state.receiver}/>;
    }
}

export default withRouter(ReplyMessage);