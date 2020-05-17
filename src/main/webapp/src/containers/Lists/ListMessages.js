import React, {Component} from 'react';
import Messages from "../../components/Messages/ListMessages/Messages";
import classes from "../../components/Messages/Messages.module.css";


class ListMessages extends Component {

    componentDidMount() {
        console.log('cdm')
    }

    render() {
        const classNames = "border rounded pt-4 pb-5 mb-4 pr-3 pl-3 " + classes.Messages;

        return (
            <div className={classNames}>
                <Messages/>
            </div>
        );
    }
}

export default ListMessages;