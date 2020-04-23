import React, {useState} from "react";
import AdminAccountControl from "./AdminAccountControl/AdminAccountControl";
import classes from './AdminAccountControls.module.css'

import {Button} from "reactstrap";

const AdminAccountControls = (props) => {
    const [showOptions, setShowOptions] = useState(true);

    return (
        <React.Fragment>
            <p className={classes.Caption}>Admin Options:</p>
            <div className={classes.Toggle}>
                <Button onClick={() => setShowOptions(!showOptions)}>Admin Options:</Button>
            </div>

            {
                showOptions
                    ?
                    <React.Fragment>
                        <AdminAccountControl
                            firstLink='/admin'
                            firstButton="List Teachers"
                            secondLink={'/admin/add/' + 'T'}
                            secondButton='Add Teacher'
                            onClick={props.addPerson}/>
                        <AdminAccountControl
                            firstLink='/admin/students'
                            firstButton="List Students"
                            secondLink={'/admin/add/' + 'S'}
                            secondButton='Add Student'
                            onClick={props.addPerson}/>

                        <AdminAccountControl
                            firstLink='/admin/subjects'
                            firstButton="List Subjects"
                            secondLink='/admin/addsubject'
                            secondButton='Add Subject'
                        />

                        <AdminAccountControl
                            firstLink='/admin/topics'
                            firstButton="List Topics"
                            secondLink='/admin/addtopic'
                            secondButton='Add Topics'
                        />
                    </React.Fragment>
                    :
                    null
            }

        </React.Fragment>
    );
};

export default AdminAccountControls;

