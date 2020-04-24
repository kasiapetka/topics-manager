import React from "react";
import AccountDetailsCard from "../../../UI/AccountDetailsCard/AccountDetailsCard";
import TeacherAccountControls from "./TeacherAccountControls/TeacherAccountControls";
import Messages from "../../../Messages/Messages";
import PrivateTeacherRoute from "../../../PrivateRoutes/PrivateTeacherRoute";
import ListSections from "../../../../containers/Lists/ListSections";
import AddSection from "../../../../containers/FormsPages/AddSection/AddSection";
import ListStudents from "../../../../containers/Lists/ListStudents";
import ListSubjects from "../../../../containers/Lists/ListSubjects";
import AddTopic from "../../../../containers/FormsPages/AddTopic/AddTopic";
import ListTopics from "../../../../containers/Lists/ListTopics";
import SideNavbar from "../../../Navigation/SideNavbar/SideNavbar";

const teacherPageElements = (props) => (
    <div className="container-fluid h-100 mt-5">
        <div className="row h-100">
            <div className="col-md-3 border-right">
                <AccountDetailsCard
                    person={props.teacher}/>
                <SideNavbar/>
                <Messages/>
            </div>

            <div className="col-md-8">

                <PrivateTeacherRoute exact path="/teacher/subjects" component={() => <ListSubjects/>}/>
                <PrivateTeacherRoute exact path="/teacher/topics" component={() => <ListTopics/>}/>
                <PrivateTeacherRoute exact path="/teacher/addtopic" component={() => <AddTopic/>}/>
                <PrivateTeacherRoute exact path="/teacher/addsection" component={() => <AddSection/>}/>
                <PrivateTeacherRoute exact path="/teacher/sections" component={() => <ListSections/>}/>
                <PrivateTeacherRoute exact path="/teacher" component={() => <ListStudents/>}/>

            </div>
            <div className="col-md-1"></div>
        </div>
    </div>
);

export default teacherPageElements;