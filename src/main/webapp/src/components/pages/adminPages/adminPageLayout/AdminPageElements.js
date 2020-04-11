import React from "react";
import Messages from "../../../messages/Messages";
import ListTeachersComponent from "../../../lists/listTeachers/ListTeachersComponent";
import ListStudentsComponent from "../../../lists/listStudents/ListStudentsComponent";
import EditAccount from "../../../../containers/formsPages/EditAccount";
import auth from "../../../../Auth";
import AdminAccountControls from "./AdminAccountControls";

const AdminPageElements=(props)=>{
    return(
        <div className="container-fluid h-100 mt-2">
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
                            <ListTeachersComponent
                            />
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

export default AdminPageElements;

