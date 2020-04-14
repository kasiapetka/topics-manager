import React, {Component} from 'react';
import PageNavbar from "../../components/UI/Layout/PageNavbar";
import {Alert} from "reactstrap";
import auth from "../../Auth";
import TeacherPageElements from "../../components/Pages/TeacherPages/TeacherPageLayout/TeacherPageElements";
import StudentsContext from "../../context/listStudentsContext";
import filterList from "../../components/Lists/FilterList";
import axios from 'axios'


class TeacherPage extends Component {
    state = {
        teacher: '',
        error: false,
        students: [],
        showStudents: true,
        condition: 'Email',
        search: '',
        studentsFiltered: []
    };


    componentDidMount() {

        const request = {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + auth.getToken(),
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        };

        axios.get('/api/teacher/info', request).then(response => {
            if (response.status !== 200) {
                this.setState({error: true})
            } else {
                let student = {...response.data};
                this.setState({teacher: student})
            }
        })
            .catch(error => {
                console.error('There was an error!', error);
            });

        axios.get('/api/teacher/students', request).then(response => {
            if (response.status !== 200) {
                this.setState({error: true})
            } else {
                let students = [...response.data];
                this.setState({students: students});
                this.setState({studentsFiltered: students});
            }
        })
            .catch(error => {
                console.error('There was an error!', error);
                this.setState({
                    error: true
                })
            });
    }

    toggleStudents = () => {
        this.setState((prevState) => {
            return {
                showStudents: !this.state.showStudents,
                condition: 'Email',
                search: '',
                studentsFiltered: this.state.students,
            }
        });
    };

    handleChange = (event) => {
        const target = event.target;
        const value = target.value;
        const newList = filterList(value, this.state.condition, this.state.students);

        this.setState({
            studentsFiltered: newList,
            search: value
        });
    };

    onConditionChanged = (event) => {
        this.setState({
            condition: event.currentTarget.value
        });

        this.setState({
            studentsFiltered: this.state.students
        });
        this.setState({
            search: ''
        });
    };

    render() {

        if (this.state.error) {
            return (
                <Alert color="danger">
                    Server Error, Please Try Again.
                </Alert>
            )
        }
        return (
            <React.Fragment>
                <PageNavbar/>
                <StudentsContext.Provider value={{
                    students: this.state.studentsFiltered,
                    change: this.handleChange,
                    conditionChange: this.onConditionChanged,
                    condition: this.state.condition,
                    search: this.state.search
                }}>
                    {
                        <TeacherPageElements
                            teacher={this.state.teacher}
                            toggleStudents={this.toggleStudents}
                            students={this.state.students}
                            showStudents={this.state.showStudents}
                        />
                    }
                </StudentsContext.Provider>
            </React.Fragment>
        );
    }
};

export default TeacherPage;