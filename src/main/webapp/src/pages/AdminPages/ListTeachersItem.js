import React from 'react'
import classes from '../../css/pages.module.css'
import {Button, Label} from "reactstrap";

const Teacher =(props)=> {
        return (
                <div className={classes.Teacher}>
                    <p><strong>Name:</strong> <em>{props.name}</em>
                        <span className="ml-3"><strong>Surname:</strong> <em>{props.surname}</em></span></p>
                    <p><strong>Email:</strong> <em>{props.email}</em></p>
                    <Button className="d-inline-block mr-2" onClick={props.edit}>Edit</Button>
                    <Button className="d-inline-block ml-2"outline color="danger">Delete</Button>
                </div>
        )
}

export default Teacher