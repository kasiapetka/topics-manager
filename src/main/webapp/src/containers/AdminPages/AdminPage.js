import React, {Component} from 'react';
import PageNavbar from "../../components/UI/Layout/PageNavbar";
import AdminPageElements from "../../components/Pages/AdminPages/AdminPageLayout/AdminPageElements";
import ListTeachers from "../Lists/ListTeachers";
import ListStudents from "../Lists/ListStudents";
import EditAccount from "../FormsPages/EditAccount";
import auth from "../../Auth";

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
            personToDelete:''
        };
    }

    toggleTeachers = () => {
        this.setState((prevState) => {
            return {
                showTeachers: !this.state.showTeachers,
                showStudents: false,
                editPerson: false,
            }
        });
    };

    toggleStudents = () => {
        this.setState((prevState) => {
            return {
                showStudents: !this.state.showStudents,
                showTeachers: false,
                editPerson: false,
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
           showTeachers: false
        })
    };

    deletePersonHandler=(personToDelete, personRole)=>{
        this.setState((prevState) => {
            return {
                deletePerson: !this.state.deletePerson,
                personToDelete: personToDelete,
                personRole: personRole
            }
        });
    };

    render() {
        let showTeachers = this.state.showTeachers;
        let showStudents = this.state.showStudents;
        let editPerson = this.state.editPerson;
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

        return (
            <React.Fragment>
                <PageNavbar/>
                <AdminPageElements
                content={content}
                toggleStudents={this.toggleStudents}
                toggleTeachers={this.toggleTeachers}
                deletePerson={this.state.deletePerson}
                personToDelete={this.state.personToDelete}
                deletePersonHandler={this.deletePersonHandler}
                personRole={this.state.personRole}/>
            </React.Fragment>
        );
    }
}

export default AdminPage;