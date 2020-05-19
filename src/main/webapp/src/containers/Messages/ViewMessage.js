import React, {Component} from 'react';
import axios from "axios";
import Label from "../../components/Forms/FormElements/Label/Label";
import {Alert} from "reactstrap";
import Spinner from "../../components/UI/Spinner/Spinner";
import {withRouter} from "react-router-dom";
import {Button} from "reactstrap";
import {BsReplyFill} from "react-icons/bs";

class ViewMessage extends Component {

    state = {
        error: null,
        loading: false,
        message: null
    };

    componentDidMount() {
        this.setState({loading: true});
        const id = this.props.match.params.id;

        axios.get('/api/message/' + id).then(response => {
            let message = response.data;
            this.setState({
                message: message,
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
        const error = this.state.error;
        const loading = this.state.loading;
        let reply;
        if (this.props.type === 'inbox') {
            reply = <Button className="btn-sm btn-light border ml-4 shadow-sm pr-2 pl-2 mb-1 d-inline-block"
                            onClick={() => this.props.replyToPerson(this.state.message.from.email)}>
                <BsReplyFill className="mr-1"/>Reply</Button>
        }

        let content = <p>Something went wrong.</p>;
        if (error) {
            content = (
                <Alert color="danger">
                    Server Error, Please Try Again.<br/>
                    {error.message}
                </Alert>
            )
        } else if (loading) {
            content = <Spinner/>
        } else if (this.state.message) {
            content = (
                <React.Fragment>
                    {reply}
                    <div className="mt-2">
                        <Label label="from" content={this.state.message.from.email}/>
                        <Label label="to" content={this.state.message.to.email}/>
                        <Label label="subject" content={this.state.message.subject}/>
                        <Label label="content" divstyle={{minHeight: '100px'}} content={this.state.message.content}/>
                    </div>

                </React.Fragment>

            );
        }
        return content;
    }
}

export default withRouter(ViewMessage);