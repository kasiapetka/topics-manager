import React from 'react';
import {
 CardBody,
    CardSubtitle
} from "reactstrap";

const addedStudentCard = (props) => {

    return (
            <CardBody>
                <CardSubtitle>Semester: <em>{props.student.semester}</em></CardSubtitle>
            </CardBody>
    )
};

export default addedStudentCard;