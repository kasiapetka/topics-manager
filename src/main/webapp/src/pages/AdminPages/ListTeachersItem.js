import React from 'react'
import classes from '../../css/pages.module.css'

const Teacher =(props)=> {
        return (
                <div className={classes.Teacher}>
                    <p><strong>Name:</strong> <em>{props.name}</em>
                        <span className="ml-3"><strong>Surname:</strong> <em>{props.surname}</em></span></p>
                    <p><strong>Email:</strong> <em>{props.email}</em></p>
                </div>
        )
}

export default Teacher