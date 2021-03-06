import React from "react";
import AccountDetailsCard from "../../../UI/Cards/AccountDetailsCard/AccountDetailsCard";
import PersonMessages from "../../../../containers/Messages/PersonMessages";
import PrivateTeacherRoute from "../../../PrivateRoutes/PrivateTeacherRoute";
import ListSections from "../../../../containers/Lists/ListSections";
import AddSection from "../../../../containers/FormsPages/SectionForms/AddSection/AddSection";
import ListStudents from "../../../../containers/Lists/ListStudents";
import ListSubjects from "../../../../containers/Lists/ListSubjects";
import AddTopic from "../../../../containers/FormsPages/TopicForms/AddTopic/AddTopic";
import ListTopics from "../../../../containers/Lists/ListTopics";
import SideNavbar from "../../../Navigation/SideNavbar/SideNavbar";


const teacherPageElements = (props) => (
    <div className="container-fluid h-100 mt-5">
        <div className="row h-100">
            <div className="col-md-3 border-right">
                <AccountDetailsCard
                    person={props.teacher}/>
                <SideNavbar/>
            </div>
            <div className="col-md-8">
                <PrivateTeacherRoute exact path="/teacher/subjects" component={ListSubjects}/>
                <PrivateTeacherRoute exact path="/teacher/topics" component={ListTopics}/>
                <PrivateTeacherRoute exact path="/teacher/addtopic" component={AddTopic}/>
                <PrivateTeacherRoute path="/teacher/messages" component={PersonMessages}/>
                <PrivateTeacherRoute exact path="/teacher/addsection" component={AddSection}/>
                <PrivateTeacherRoute path="/teacher/sections" component={ListSections}/>
                <PrivateTeacherRoute exact path="/teacher" component={ListStudents}/>
            </div>
            <div className="col-md-1"></div>
        </div>
    </div>
);

export default teacherPageElements;