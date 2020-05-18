import React, {Component} from 'react';
import Messages from "../../components/Messages/ListMessages/Messages";
import classes from "../../components/Messages/Messages.module.css";
import {Alert} from "reactstrap";
import Spinner from "../../components/UI/Spinner/Spinner";
import axios from "axios";


class ListMessages extends Component {

    state={
        messages: null,
        error: null,
        loading: true,
    };

    componentDidMount() {
        this.setState({loading: true});
        const path = this.props.path;

        axios.get(path).then(response => {
            let messages = [...response.data];

            console.log(messages)
            this.setState({
                messages: messages,
                loading: false,
            });
        }).catch(error => {
            this.setState({
                error: error,
                loading: false,
            })
        })
    }

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
                    <Messages/>
                </div>
            );
        }

        return content;
    }
}

export default ListMessages;