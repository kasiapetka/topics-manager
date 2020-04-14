import React from "react";
import Messages from "../../../Messages/Messages";
import ListTeachersComponent from "../../../Lists/ListTeachers/ListTeachersComponent";
import ListStudentsComponent from "../../../Lists/ListStudents/ListStudentsComponent";
import EditAccount from "../../../../containers/FormsPages/EditAccount";
import auth from "../../../../Auth";
import AdminAccountControls from "./AdminAccountControls";
import DeletePersonModal from "../../../UI/DeletePersonModal/DeletePersonModal";
import DeletePerson from "../../../../containers/FormsPages/DeletePerson";

const adminPageElements=(props)=>{
    return(
        <div className="container-fluid h-100 mt-2">
            <DeletePersonModal
            show={props.deletePerson}
            modalClosed={props.deletePersonHandler}>
                <DeletePerson
                person = {props.personToDelete}
                cancelClicked={props.deletePersonHandler}/>
            </DeletePersonModal>

            <div className="row h-100">
                <div className="col-md-2 border-right">
                    <AdminAccountControls
                        toggleStudents={props.toggleStudents}
                        toggleTeachers={props.toggleTeachers}/>
                    <Messages/>
                </div>
                <div className="col-md-9">
                    {
                        props.showTeachers
                            ?
                            <ListTeachersComponent/>
                            :
                            null
                    }
                    {
                        props.showStudents
                            ?
                            <ListStudentsComponent/>
                            :
                            null
                    }
                    {
                        props.editPerson
                            ?
                            <EditAccount
                                path={props.path}
                                id={props.editPersonId}
                                token={auth.getToken()}
                                personEdition={true}
                            />
                            :
                            null
                    }
                </div>
                <div className="col-md-1 border-left"></div>
            </div>
        </div>
    )
};

export default adminPageElements;