import React, {Component} from 'react';
import PageNavbar from "../../components/UI/Layout/PageNavbar";
import auth from "../../Auth";
import AdminPageElements from "../../components/Pages/AdminPages/AdminPageLayout/AdminPageElements";
import PersonsContext from "../../context/listPersonsContext";
import PersonEditionContext from "../../context/personEdition";
import filterList from "../../components/Lists/FilterList";
import axios from 'axios'

class AdminPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            teachers: [],
            students:[],
            error: false,
            showTeachers: true,
            showStudents: false,
            search: '',
            teachersFiltered: [],
            studentsFiltered: [],
            condition: 'Email',
            editPerson: false,
            editPersonId: '',
            path:'',
            personRole: '',
            deletePerson: false,
            personToDelete: ''
        };
    }

    componentDidMount = () => {
        const request = {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + auth.getToken(),
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        };

        axios.get('/api/admin/teachers', request).then( response => {
            if (response.status !== 200) {
                this.setState({error: true})
            } else {
                let teachers = [...response.data];
                this.setState({teachers: teachers});
                this.setState({teachersFiltered: teachers});
            }
        })
            .catch(error => {
                console.error('There was an error!', error);
            });
        axios.get('/api/admin/students', request).then( response => {
            if (response.status !== 200) {
                this.setState({error: true})
            } else {
                let students = [...response.data];
                this.setState({students: students});
                this.setState({studentsFiltered: students});
            }
        })
    };

    toggleTeachers = () => {
        this.setState((prevState)=>{
            return {
                showTeachers: !this.state.showTeachers,
                editPerson: false,
                condition: 'Email',
                search: '',
                teachersFiltered: this.state.teachers,
                showStudents: false
            }
        });
    };

    toggleStudents = () => {
        this.setState((prevState)=>{
            return {
                showStudents: !this.state.showStudents,
                showTeachers: false,
                condition: 'Email',
                search: '',
                teachersFiltered: this.state.teachers,
                editPerson: false
            }
        });
    };

    handleChange = (event) => {
        const target = event.target;
        const value = target.value;
        let newList;

        if(this.state.showTeachers) {
            newList = filterList(value, this.state.condition, this.state.teachers);
            this.setState({
                teachersFiltered: newList,
                search: value
            });
        }
        if(this.state.showStudents){
            newList =filterList(value,this.state.condition,this.state.students);
            this.setState({
                studentsFiltered: newList,
                search: value
            });
        }
    };

    onPersonEditHandler = (index) => {
        if(this.state.showTeachers){
            const person = this.state.teachersFiltered[index];
            this.setState({
                showTeachers: false,
                editPersonId: person.id,
                editPerson: true,
                path:"/api/admin/modifyTeacher",
                personRole: 'T'
            });
        }
        else if(this.state.showStudents){
            const person = this.state.studentsFiltered[index];

            this.setState({
                showStudents: false,
                editPersonId: person.album,
                editPerson: true,
                path: "/api/admin/modifyStudent",
                personRole: 'S'
            });
        }
    };

    onConditionChanged = (event) => {
        this.setState({
            condition: event.currentTarget.value,
            teachersFiltered: this.state.teachers,
            studentsFiltered: this.state.students,
            search: ''
        });
    };

    onPersonDeleteHandler=(index)=>{
        let person;
        if(this.state.showTeachers){
            person = this.state.teachersFiltered[index];
        }
        else if(this.state.showStudents){
            person = this.state.studentsFiltered[index];
        }
        this.setState({
            deletePerson: !this.state.deletePerson,
            personToDelete: person
        });
    };

    render() {
        return (
            <React.Fragment>
                <PageNavbar/>
                    <PersonsContext.Provider
                        value={{
                            persons: this.state.showStudents ? this.state.studentsFiltered : this.state.teachersFiltered,
                            edit: this.onPersonEditHandler,
                            change: this.handleChange,
                            conditionChange: this.onConditionChanged,
                            condition: this.state.condition,
                            search: this.state.search,
                            delete: this.onPersonDeleteHandler
                        }}>
                        <PersonEditionContext.Provider
                            value={{
                                personRole: this.state.personRole,
                            }}>
                            {
                                <AdminPageElements
                                    toggleTeachers={this.toggleTeachers}
                                    toggleStudents={this.toggleStudents}
                                    showTeachers={this.state.showTeachers}
                                    showStudents={this.state.showStudents}
                                    editPerson={this.state.editPerson}
                                    editPersonId={this.state.editPersonId}
                                    path={this.state.path}
                                    deletePerson={this.state.deletePerson}
                                    deletePersonHandler={this.onPersonDeleteHandler}
                                    personToDelete={this.state.personToDelete}
                                />
                            }
                        </PersonEditionContext.Provider>
                    </PersonsContext.Provider>
            </React.Fragment>
        );
    }
}

export default AdminPage