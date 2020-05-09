import React from "react";
import Messages from "../../../Messages/Messages";
import AccountDetailsCard from "../../../UI/Cards/AccountDetailsCard/AccountDetailsCard";
import ListStudentSections from "../../../../containers/Lists/ListStudentSections";
import PrivateStudentRoute from "../../../PrivateRoutes/PrivateStudentRoute";
import ViewStudentSection from "../../../../containers/FormsPages/SectionForms/ViewStudentSection/ViewStudentSection";
import SideNavbar from "../../../Navigation/SideNavbar/SideNavbar";

const studentPageElements = (props) =>
    (
        <div className="container-fluid h-100 mt-5">
            <div className="row h-100">
                <div className="col-md-3 border-right">
                    <AccountDetailsCard
                        person={props.student}/>
                    <SideNavbar/>
                    <Messages/>
                </div>
                <div className="col-md-8 border-right">
                    <PrivateStudentRoute exact path="/student/section/:id" component={ViewStudentSection}/>
                    <PrivateStudentRoute exact path="/student" component={ListStudentSections}/>
                </div>
                <div className="col-md-1"></div>
            </div>
        </div>
    );

export default studentPageElements;