import React, {Component} from "react";
import Messages from "../../../Messages/Messages";
import ListTeachers from "../../../../containers/Lists/ListTeachers";
import ListStudents from "../../../../containers/Lists/ListStudents";
import EditAccount from "../../../../containers/FormsPages/EditAccount";
import auth from "../../../../Auth";
import AdminAccountControls from "./AdminAccountControls";
import DeletePersonModal from "../../../UI/DeletePersonModal/DeletePersonModal";
import DeletePerson from "../../../../containers/FormsPages/DeletePerson";

const adminPageElements = (props) =>
    (
        <div className="container-fluid h-100 mt-2">
            <DeletePersonModal
            show={props.deletePerson}
            modalClosed={props.deletePersonHandler}>
                <DeletePerson
                person = {props.personToDelete}
                cancelClicked={props.deletePersonHandler}
                personRole={props.personRole}/>
            </DeletePersonModal>

            <div className="row h-100">
                <div className="col-md-2 border-right">
                    <AdminAccountControls
                        toggleStudents={props.toggleStudents}
                        toggleTeachers={props.toggleTeachers}/>
                    <Messages/>
                </div>
                <div className="col-md-9">
                    {props.content}
                </div>
                <div className="col-md-1 border-left"></div>
            </div>
        </div>
    )

export default adminPageElements;