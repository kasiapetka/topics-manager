import React from "react";
import Message from "./Message";
import {Table} from "reactstrap";

const Messages = (props) => {
    let messages;
    if (props.messages.length !== 0) {
        messages = props.messages.map((message) => {
            let date;
            const arr = message.date.split('.');
            const arr2 = arr[0].split('T');
            date = arr2[0] + ' ' + arr2[1];

            return <Message key={message.id}
                            to={message.to.email}
                            from={message.from.email}
                            content={message.content}
                            subject={message.subject}
                            isRead={message.isRead}
                            type={props.type}
                            viewMessage={()=>props.viewMessage(message.id)}
                            date={date}
            />
        });
    } else {
        return <h4 className="mt-4 text-center">No messages yet.</h4>
    }

    return (
        <Table>
            <thead>
            <tr>
                <th>Date</th>
                <th>{props.type === 'inbox' ? 'From' : 'To'}</th>
                <th>Subject</th>
                <th>Content</th>
            </tr>
            </thead>
            <tbody>
            {messages}
            </tbody>
        </Table>
    )
};

export default Messages;