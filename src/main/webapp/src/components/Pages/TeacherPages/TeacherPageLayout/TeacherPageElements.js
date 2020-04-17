import React from "react";
import AccountDetailsCard from "../../../UI/AccountDetailsCard/AccountDetailsCard";
import TeacherAccountControls from "./TeacherAccountControls";
import Messages from "../../../Messages/Messages";
import ListSections from "../../../../containers/Lists/ListSections";
import ListStudents from "../../../../containers/Lists/ListStudents";

const teacherPageElements = (props) => (
    <div className="container-fluid h-100 mt-5">
    <div className="row h-100">
        <div className="col-md-3 border-right">
            <AccountDetailsCard
                person={props.teacher}/>
            <TeacherAccountControls
                toggleTeachers={props.toggleStudents}
                toggleAddSection={props.toggleAddSection}/>
            <Messages/>
        </div>
        <div className="col-md-8">
            {
                props.content
            }
            <ListSections/>
        </div>
        <div className="col-md-1"></div>
    </div>
</div>
);

export default teacherPageElements;