import React from "react";
import AccountDetailsCard from "../../../UI/AccountDetailsCard/AccountDetailsCard";
import TeacherAccountControls from "./TeacherAccountControls";
import Messages from "../../../Messages/Messages";

import ListStudentsComponent from "../../../Lists/ListStudents/ListStudents";
import ListSectionsComponent from "../ListSections/ListSections";

const teacherPageElements = (props) => (
    <div className="container-fluid h-100 mt-5">
        <div className="row h-100">
            <div className="col-md-3 border-right">
                <AccountDetailsCard
                    person={props.teacher}/>
                <TeacherAccountControls
                    toggle={props.toggleStudents}/>
                <Messages/>
            </div>
            <div className="col-md-8">
                {
                    props.showStudents
                        ?
                        <ListStudentsComponent/>
                        :
                        null
                }
                <ListSectionsComponent/>
            </div>
            <div className="col-md-1"></div>
        </div>
    </div>
);

export default teacherPageElements;