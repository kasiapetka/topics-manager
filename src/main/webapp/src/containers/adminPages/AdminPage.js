import React, {Component} from 'react';
import PageNavbar from "../../components/layout/PageNavbar";
import auth from "../../Auth";
import AdminPageElements from "../../components/pages/adminPages/adminPageLayout/AdminPageElements";
import TeachersContext from "../../context/listTeachersContext";
import StudentsContext from "../../context/listStudentsContext";
import PersonEditionContext from "../../context/personEdition";
import filterList from "../../components/lists/filterList";

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
            personRole: ''
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

        fetch('/api/admin/teachers', request).then(async response => {
            const data = await response.json();
            if (response.status !== 200) {
                this.setState({error: true})
            } else {
                let teachers = [...data];
                this.setState({teachers: teachers});
                this.setState({teachersFiltered: teachers});
            }
        })
            .catch(error => {
                console.error('There was an error!', error);
            });
        fetch('/api/admin/students', request).then(async response => {
            const data = await response.json();
            if (response.status !== 200) {
                this.setState({error: true})
            } else {
                let students = [...data];
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

    onTeacherEdition = (index) => {
        const teacher = this.state.teachersFiltered[index];

        this.setState({
            showTeachers: false,
            editPersonId: teacher.id,
            editPerson: true,
            path:"/api/admin/modifyTeacher",
            personRole: 'T'
        });
    };

    onStudentEdition=(index)=>{
        const student = this.state.students[index];

        this.setState({
            showStudents: false,
            editPersonId: student.album,
            editPerson: true,
            path: "/api/admin/modifyStudent",
            personRole: 'S'
        });
    };

    onConditionChanged = (event) => {
        this.setState({
            condition: event.currentTarget.value,
            teachersFiltered: this.state.teachers,
            studentsFiltered: this.state.students,
            search: ''
        });
    };

    render() {
        return (
            <React.Fragment>
                <PageNavbar/>
                <StudentsContext.Provider
                    value={{
                        students: this.state.studentsFiltered,
                        edit: this.onStudentEdition,
                        change: this.handleChange,
                        conditionChange: this.onConditionChanged,
                        condition: this.state.condition,
                        search: this.state.search
                    }}>
                    <TeachersContext.Provider
                        value={{
                            teachers: this.state.teachersFiltered,
                            edit: this.onTeacherEdition,
                            change: this.handleChange,
                            conditionChange: this.onConditionChanged,
                            condition: this.state.condition,
                            search: this.state.search
                        }}>
                        <PersonEditionContext.Provider
                            value={{
                                person: this.state.personRole,
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
                                />
                            }
                        </PersonEditionContext.Provider>
                    </TeachersContext.Provider>
                </StudentsContext.Provider>
            </React.Fragment>
        );
    }
}

export default AdminPage