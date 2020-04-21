import React, {Component} from 'react';
import PageNavbar from "../../components/UI/Layout/PageNavbar";
import AdminPageElements from "../../components/Pages/AdminPages/AdminPageLayout/AdminPageElements";
import ListTeachers from "../Lists/ListTeachers";
import ListStudents from "../Lists/ListStudents";
import EditAccount from "../FormsPages/EditAccount/EditAccount";
import auth from "../../Auth";
import AddPerson from "../FormsPages/AddPerson/AddPerson";
import DeletePersonCard from "../../components/UI/DeletePersonCard/DeletePersonCard";

class AdminPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showTeachers: true,
            showStudents: false,
            editPerson: false,
            editPersonId: '',
            modifyPath: '',
            personRole: '',
            deletePerson:'',
            personToDelete:'',
            deletedPerson: null,
            addPerson: false,
        };
    }

    toggleTeachers = () => {
        this.setState((prevState) => {
            return {
                showTeachers: !this.state.showTeachers,
                showStudents: false,
                editPerson: false,
                addPerson: false,
                deletedPerson: null,
            }
        });
    };

    toggleStudents = () => {
        this.setState((prevState) => {
            return {
                showStudents: !this.state.showStudents,
                showTeachers: false,
                editPerson: false,
                addPerson: false,
                deletedPerson: null,
            }
        });
    };

    editPersonHandler = (modifyPath, editPersonId, personRole) => {
       this.setState({
            editPerson: true,
            modifyPath: modifyPath,
            editPersonId: editPersonId,
            personRole: personRole,
            showStudents: false,
            showTeachers: false,
            addPerson: false,
        })
    };

    deletePersonHandler=(personToDelete, personRole)=>{
        this.setState((prevState) => {
            return {
                deletePerson: !this.state.deletePerson,
                personToDelete: personToDelete,
                personRole: personRole,
            }
        });
    };

    personDeletedHandler=(personDeleted,personRole)=>{
        let role;
        if(personRole==='T') role='Teacher';
        if(personRole==='S') role='Student';
        const person= {
            role:role,
            person: {...personDeleted}
        };

        this.setState((prevState) => {
            return {
                deletePerson: !this.state.deletePerson,
                deletedPerson: person,
                showStudents: false,
                showTeachers: false,
            }
        });
    };

    addPersonHandler=(personRole)=>{
        this.setState((prevState) => {
            return {
                showStudents: false,
                showTeachers: false,
                editPerson: false,
                addPerson: true,
                deletedPerson: null,
                personRole: personRole,
            }
        });
    };

    render() {
        let showTeachers = this.state.showTeachers;
        let showStudents = this.state.showStudents;
        let editPerson = this.state.editPerson;
        let addPerson = this.state.addPerson;
        let deletedPerson = this.state.deletedPerson;

        let content;
        if(showStudents){
            content=( <ListStudents
                editPerson={this.editPersonHandler}
                deletePerson={this.deletePersonHandler}
                path='/api/admin/students'/>)
        }
        if(showTeachers){
            content=( <ListTeachers
                editPerson={this.editPersonHandler}
                deletePerson={this.deletePersonHandler}/>)
        }
        if(editPerson){
            content=( <EditAccount
                path={this.state.modifyPath}
                id={this.state.editPersonId}
                token={auth.getToken()}
                personEdition={true}
                personRole={this.state.personRole}
            />)
        }
        if(addPerson){
            content=( <AddPerson
                personRole={this.state.personRole}
            />)
        }
        if(deletedPerson){
            content=( <React.Fragment>
                <h4 className="mt-4 text-center">Deleted {this.state.deletedPerson.role}</h4>
                <DeletePersonCard
                deleted={true}
                person={this.state.deletedPerson.person}/>
            </React.Fragment>)
        }

        return (
            <React.Fragment>
                <PageNavbar/>
                <AdminPageElements
                content={content}
                toggleStudents={this.toggleStudents}
                toggleTeachers={this.toggleTeachers}
                showTeachers={this.state.showTeachers}
                showStudents={this.state.showStudents}
                deletePerson={this.state.deletePerson}
                personToDelete={this.state.personToDelete}
                deletePersonHandler={this.deletePersonHandler}
                personDeletedHandler={this.personDeletedHandler}
                addPerson={this.addPersonHandler}
                personRole={this.state.personRole}/>
            </React.Fragment>
        );
    }
}

export default AdminPage;