import React from "react";
import AccountDetailsCard from "../../../accountCard/AccountDetailsCard";
import TeacherAccountControls from "./TeacherAccountControls";
import Messages from "../../../messages/Messages";

import ListStudentsComponent from "../../../lists/listStudents/ListStudentsComponent";
import ListSectionsComponent from "../listSections/ListSectionsComponent";

const TeacherPageElements = (props) => (
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

export default TeacherPageElements;