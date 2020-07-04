import React, {Component} from 'react';
import ManageSemestersForm from "../../../components/Forms/FormsTemplates/SemesterForms/ManageSemestersForm";
import {Alert} from "reactstrap";
import Spinner from "../../../components/UI/Spinner/Spinner";
import axios from "axios";
import Modal from "../../../components/UI/Modal/Modal";

class ManageSemesters extends Component {

    state = {
        semester: 1,
        error: null,
        loading: false,
        students: [],
        persons: null,
        moved: false
    };

    saveAllHandler = (persons) => {
        const allStudents = [...persons];
        this.setState({persons: allStudents})
    };

    addAllHandler = () => {
        const allStudents = [...this.state.persons];
        this.setState({students: allStudents})
    };

    addPersonToListHandler = (person) => {
        const students = [...this.state.students];
        students.push(person);
        this.setState({students: students})
    };

    removePersonFromListHandler = (person) => {
        const students = [...this.state.students];
        let removed = students.filter((student) => student.user.email !== person.user.email);
        this.setState({students: removed})
    };

    onSemesterChangeHandler = (event) => {
        const sem = event.target.value;
        this.setState({
            semester: sem,
            students: []
        });
    };

    onSaveChangesHandler=(event)=>{
        event.preventDefault();
        this.setState({loading:true});
        const passed = {
          semester: this.state.semester,
          students: this.state.students
        };

        axios.put('/api/admin/managestudentsemester', passed).then(response => {
            this.setState({moved: true, loading: false})
        }).catch(error => {
            this.setState({error: error, loading: false})
        });
    };

    showMovedInfoHandler = () => {
        console.log(this.state.students)
        this.setState((prevState) => {
            return {
                moved: !prevState.moved,
                students: []
            }
        });
    };

    render() {
        const error = this.state.error;
        const loading = this.state.loading;
        const studentsStyle = {
            maxHeight: '400px',
            overflowY: 'scroll',
        };

        if (error) {
            return (
                <Alert color="danger">
                    Server Error, Please Try Again.<br/>
                    {error.message}
                </Alert>
            )
        } else if (loading) {
            return <Spinner/>
        }

        if (this.state.moved) {
            return <Modal show={this.state.moved}
                             modalClosed={this.showMovedInfoHandler}>Students:
                <ul style={studentsStyle}>
                    {this.state.students.map((student)=>{
                        return <li key={student.album}>{student.name + ' ' + student.surname}</li>
                    })}
                </ul>
                Moved!</Modal>
        } else

        return (
            <div>
                <ManageSemestersForm
                    addPersonToList={this.addPersonToListHandler}
                    removePersonFromList={this.removePersonFromListHandler}
                    students={this.state.students}
                    semester={this.state.semester}
                    addAll={this.addAllHandler}
                    saveAll={this.saveAllHandler}
                    onSaveChanges={this.onSaveChangesHandler}
                    onSemesterChange={this.onSemesterChangeHandler}/>
            </div>
        );
    }
}

export default ManageSemesters;
