import React from "react";
import Messages from "../../../Messages/Messages";
import AdminAccountControls from "./AdminAccountControls/AdminAccountControls";
import DeletePersonModal from "../../../UI/DeletePersonModal/DeletePersonModal";
import DeletePerson from "../../../../containers/FormsPages/DeletePerson/DeletePerson";
import PrivateAdminRoute from "../../../PrivateRoutes/PrivateAdminRoute";
import ListStudents from "../../../../containers/Lists/ListStudents";
import ListTeachers from "../../../../containers/Lists/ListTeachers";
import AddPerson from "../../../../containers/FormsPages/AddPerson/AddPerson";
import EditAccount from "../../../../containers/FormsPages/EditAccount/EditAccount";
import auth from "../../../../Auth";
import DeletePersonCard from "../../../UI/DeletePersonCard/DeletePersonCard";
import AddSubject from "../../../../containers/FormsPages/AddSubject/AddSubject";
import ListSubjects from "../../../../containers/Lists/ListSubjects";
import AddTopic from "../../../../containers/FormsPages/AddTopic/AddTopic";

const adminPageElements = (props) =>
    (
        <div className="container-fluid h-100 mt-2">
            <DeletePersonModal
                show={props.deletePerson}
                modalClosed={props.deletePersonHandler}>
                <DeletePerson
                    person={props.personToDelete}
                    cancelClicked={props.deletePersonHandler}
                    deleteClicked={props.personDeletedHandler}
                    personRole={props.personRole}/>
            </DeletePersonModal>

            <div className="row h-100">
                <div className="col-md-3 border-right">
                    <AdminAccountControls
                        addPerson={props.addPersonHandler}/>
                    <Messages/>
                </div>
                <div className="col-md-8">

                    <PrivateAdminRoute exact path="/admin/subjects" component={() => <ListSubjects/>}/>

                    <PrivateAdminRoute exact path="/admin/addsubject" component={() => <AddSubject/>}/>

                    <PrivateAdminRoute exact path="/admin/addtopic" component={() => <AddTopic/>}/>

                    <PrivateAdminRoute exact path="/admin/deleted" component={() => <DeletePersonCard
                        deleted={true}
                        person={props.deletedPerson.person}/>}/>

                    <PrivateAdminRoute exact path="/admin/add/:role" component={() => <AddPerson
                        personRole={props.personRole}/>}/>

                    <PrivateAdminRoute exact path="/admin/edit" component={() => <EditAccount
                        path={props.modifyPath}
                        id={props.editPersonId}
                        token={auth.getToken()}
                        personEdition={true}
                        personRole={props.personRole}
                    />}/>

                    <PrivateAdminRoute exact path="/admin/students" component={() => <ListStudents
                        editPerson={props.editPersonHandler}
                        deletePerson={props.deletePersonHandler}/>}/>

                    <PrivateAdminRoute exact path="/admin" component={() => <ListTeachers
                        editPerson={props.editPersonHandler}
                        deletePerson={props.deletePersonHandler}/>}/>

                </div>
                <div className="col-md-1 border-left"></div>
            </div>
        </div>
    );

export default adminPageElements;