import React, {Component} from 'react';
import ManageSemestersForm from "../../../components/Forms/FormsTemplates/SemesterForms/ManageSemestersForm";
import {Alert} from "reactstrap";
import Spinner from "../../../components/UI/Spinner/Spinner";
import axios from "axios";

class ManageSemesters extends Component {

    state = {
        semester: 1,
        error: null,
        loading: false,
        students: [],
        persons: null
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
        const passed = {
          semester: this.state.semester,
          students: this.state.students
        };

        axios.put('/api/admin/managestudentsemester', passed).then(response => {
            console.log("Dupa");
            // this.setState({sent: true, loading: false})
        }).catch(error => {
            console.log(error);
            // this.setState({error: error, loading: false})
        });
      console.log(passed)
    };

    render() {
        const error = this.state.error;
        const loading = this.state.loading;
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