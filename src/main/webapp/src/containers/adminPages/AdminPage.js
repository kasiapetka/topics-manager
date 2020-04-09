import React, {Component} from 'react';
import PageNavbar from "../../components/layoutComponents/PageNavbar";
import auth from "../../Auth";
import AdminPageElements from "../../components/pages/adminPages/adminPageLayout/AdminPageElements";
import TeachersContext from "../../context/listTeachersContext";
import StudentsContext from "../../context/listStudentsContext";
import PersonEditionContext from "../../context/personEdition";

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
                this.setState({students: students});
            }
        })
    };

    toggleTeachers = () => {
        this.setState((prevState)=>{
            return {
                showTeachers: !this.state.showTeachers,
                editPerson: false,
                showStudents: false
            }
        });
    };

    toggleStudents = () => {
        this.setState((prevState)=>{
            return {
                showStudents: !this.state.showStudents,
                showTeachers: false,
                editPerson: false
            }
        });
    };

    handleChange = (event) => {
        let currentList = [];
        let newList = [];
        const target = event.target;
        const value = target.value;
        let search = value;

        this.setState({search: search});

        if (value !== "") {
            currentList = this.state.teachers;

            newList = currentList.filter(teacher => {
                let lc = '';
                if (this.state.condition === 'Email' && teacher.user)
                    lc = teacher.user.email.toLowerCase();
                if (this.state.condition === 'Surname')
                    lc = teacher.surname.toLowerCase();
                if (this.state.condition === 'Name')
                    lc = teacher.name.toLowerCase();

                const filter = value.toLowerCase();
                return lc.includes(filter);
            });
        } else {
            newList = this.state.teachers;
        }
        this.setState({
            teachersFiltered: newList
        });
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
            condition: event.currentTarget.value
        });
        this.setState({
            teachersFiltered: this.state.teachers
        });
        this.setState({
            search: ''
        });
    };

    render() {
        return (
            <React.Fragment>
                <PageNavbar/>
                <StudentsContext.Provider
                    value={{
                        students: this.state.students,
                        edit: this.onStudentEdition,
                    }}>
                    <TeachersContext.Provider
                        value={{
                            teachers: this.state.teachersFiltered,
                            edit: this.onTeacherEdition,
                        }}>
                        <PersonEditionContext.Provider
                            value={{
                                person: this.state.personRole,
                            }}>
                            {
                                <AdminPageElements
                                    change={this.handleChange}
                                    changed={this.onConditionChanged}
                                    condition={this.state.condition}
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