import React from 'react';
import {
    CardBody, CardSubtitle,
} from "reactstrap";

const addedTeacherCard = (props) => {
    return (
        <CardBody>
            <CardSubtitle>Email: <em>{props.teacher.newEmail}</em></CardSubtitle>
        </CardBody>
    )
};

export default addedTeacherCard;