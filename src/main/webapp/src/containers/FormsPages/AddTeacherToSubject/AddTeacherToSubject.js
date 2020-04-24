import React, {Component} from "react";
import axios from "axios";
import AddTeacherToSubjectForm
    from "../../../components/Forms/FormsTemplates/AddTeacherToSubjectForm/AddTeacherToSubjectForm";

class AddTeacherToSubject extends Component{

    state={
        loading: true,
        error: false,
        subjects: [],
        subject: null,
        teachers: [],
    };

    componentDidMount() {
        axios.get('/api/adminteacher/subjects').then(response => {
            let subjects = [...response.data];
            this.setState({
                subjects: subjects
            });
        }).catch(error => {
            this.setState({
                error: true,
            })
        })
    }

    onSubjectChangeHandler = (event) => {
        const id = event.target.value;
        this.setState({subject: id});

        axios.get('/api/admin/teachers/' + id).then(response => {
            let teachers = [...response.data];
            this.setState({teachers: teachers,});
        }).catch(error => {
            this.setState({
                error: true,
            })
        })
    };

    addTeacherToSubjectHandler=()=>{
        alert('addTeacherToSubjectHandler')
    };

    removeTeacherFromSubjectHandler=()=>{
        alert('removeTeacherFromSubjectHandler')
    };

    render() {
        return(
            <AddTeacherToSubjectForm
                addToSubject={this.addTeacherToSubjectHandler}
                removeFromSubject={this.removeTeacherFromSubjectHandler}
                subjects={this.state.subjects}
                subject={this.state.subject}
                onSubjectChange={this.onSubjectChangeHandler}
                teachersInSubject={this.state.teachers}/>

        );
    }
}

export default AddTeacherToSubject;