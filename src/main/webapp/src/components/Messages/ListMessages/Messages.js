import React  from "react";
import classes from '../Messages.module.css'
import Message from "./Message";
import {Table} from "reactstrap";

const Messages =(props)=>{
    let messages;
    // if(props.messages.length !== 0) {
    //     messages = props.messages.map((message) => {
    //         return <Message/>
    //     });
    // } else{
    //     messages = <h4 className="mt-4 text-center">No sections on this semester yet.</h4>
    // }

    return(
        <Table>
            <thead>
            <tr>
                <th>Date</th>
                <th>From</th>
                <th>Content</th>
            </tr>
            </thead>
            <tbody>
            <Message/>
            <Message/>
            <Message/>
            </tbody>
        </Table>
    )
};

export default Messages;