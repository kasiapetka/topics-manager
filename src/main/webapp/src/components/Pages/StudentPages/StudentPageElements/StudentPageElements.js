import React from "react";
import Messages from "../../../Messages/Messages";
import AccountDetailsCard from "../../../UI/Cards/AccountDetailsCard/AccountDetailsCard";
import ListStudentSections from "../../../../containers/Lists/ListStudentSections";
import PrivateStudentRoute from "../../../PrivateRoutes/PrivateStudentRoute";

const studentPageElements = (props) =>
    (
        <div className="container-fluid h-100 mt-5">
            <div className="row h-100">
                <div className="col-md-3">
                    <AccountDetailsCard
                        person={props.student}/>
                    <Messages/>
                </div>
                <div className="col-md-8 border-right">
                    <PrivateStudentRoute exact path="/student" component={ListStudentSections}/>
                </div>
                <div className="col-md-1"></div>
            </div>
        </div>
    );

export default studentPageElements;