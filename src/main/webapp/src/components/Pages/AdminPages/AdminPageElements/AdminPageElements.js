import React from "react";
import Messages from "../../../Messages/Messages";
import SideNavbar from "../../../Navigation/SideNavbar/SideNavbar";
import Modal from "../../../UI/Modal/Modal";
import DeletePerson from "../../../../containers/FormsPages/PersonForms/DeletePerson/DeletePerson";
import PrivateAdminRoute from "../../../PrivateRoutes/PrivateAdminRoute";
import ListStudents from "../../../../containers/Lists/ListStudents";
import ListTeachers from "../../../../containers/Lists/ListTeachers";
import AddPerson from "../../../../containers/FormsPages/PersonForms/AddPerson/AddPerson";
import EditAccount from "../../../../containers/FormsPages/PersonForms/EditAccount/EditAccount";
import auth from "../../../../Auth";
import DeletePersonCard from "../../../UI/Cards/PersonCards/DeletePersonCard/DeletePersonCard";
import AddSubject from "../../../../containers/FormsPages/SubjectFroms/AddSubject/AddSubject";
import ListSubjects from "../../../../containers/Lists/ListSubjects";
import AddTopic from "../../../../containers/FormsPages/TopicForms/AddTopic/AddTopic";
import ListTopics from "../../../../containers/Lists/ListTopics";
import ListSections from "../../../../containers/Lists/ListSections";
import AddSection from "../../../../containers/FormsPages/SectionForms/AddSection/AddSection";
import EditTeachersInSubject from "../../../../containers/FormsPages/SubjectFroms/EditTeachersInSubject/EditTeachersInSubject";

const adminPageElements = (props) =>
    (
        <div className="container-fluid h-100 mt-2">
            <Modal
                show={props.deletePerson}
                modalClosed={props.cancelClickedDeletePersonHandler}>
                <DeletePerson
                    deleted={false}
                    person={props.personToDelete}
                    cancelClicked={props.cancelClickedDeletePersonHandler}
                    deleteClicked={props.deleteClickedPersonHandler}
                    personInfo={props.personInfo}/>
            </Modal>

            <div className="row h-100">
                <div className="col-md-3 border-right">
                    <SideNavbar/>
                    <Messages/>
                </div>
                <div className="col-md-8">

                    <PrivateAdminRoute exact path="/admin/deleted" component={()=><DeletePersonCard
                        deleted={true}
                        personInfo={props.personInfo}
                        cancelClicked={props.cancelClickedDeletePersonHandler}
                        person={props.personToDelete}/>}/>

                    <PrivateAdminRoute path="/admin/sections" component={ListSections}/>
                    <PrivateAdminRoute exact path="/admin/addsection" component={AddSection}/>

                    <PrivateAdminRoute exact path="/admin/subjects" component={ListSubjects}/>
                    <PrivateAdminRoute exact path="/admin/addsubject" component={AddSubject}/>
                    <PrivateAdminRoute exact path="/admin/editteachersinsubject" component={EditTeachersInSubject}/>

                    <PrivateAdminRoute exact path="/admin/topics" component={ListTopics}/>
                    <PrivateAdminRoute exact path="/admin/addtopic" component={AddTopic}/>

                    <PrivateAdminRoute exact path="/admin/add/:role" component={() => <AddPerson/>}/>

                    <PrivateAdminRoute exact path="/admin/edit" component={() => <EditAccount
                        path={props.modifyPath}
                        token={auth.getToken()}
                        personEdition={true}
                        personInfo={props.personInfo}
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