import React from 'react';
import {Form} from "reactstrap";
import SubmitButton from "../Forms/FormElements/Button/Button";
import Input from "../Forms/FormElements/Input/Input";
import Label from "../Forms/FormElements/Label/Label";

const replyMessageForm = (props) => {
    let receiver;

    if (props.receiver) {
        receiver =<li>{props.receiver}</li>
    }

    return (
        <Form onSubmit={props.onSendMessage}>
            <h3 className="text-center mt-2">Reply Message</h3>
            <Label divstyle={{listStyleType:'circle'}} label="Send To:"
                   content={<ul>{receiver}</ul>}/>

            <Input type="text" name="subject"
                   placeholder="Subject"
                   onChange={props.onChange}
                   value={props.message.subject.value}
                   isinvalid={props.message.subject.validation}
            />
            <Input type="textarea" rows={6} name="content"
                   onChange={props.onChange}
                   value={props.message.content.value}
                   isinvalid={props.message.content.validation}
            />
            <SubmitButton label='send message' disabled={!props.formValid}/>
        </Form>
    );
};

export default replyMessageForm;