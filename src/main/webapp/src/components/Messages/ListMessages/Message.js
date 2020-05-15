import React from "react";
import {Table} from "reactstrap";
import classes from '../Messages.module.css'

const message = (props) => {

    return (
        <tr className={classes.Message}>
            <td>04.05.2020</td>
            <td>Kasia Petka</td>
            <td style={{
                maxWidth: '230px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
            }}>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore </td>
        </tr>
    )
};

export default message;