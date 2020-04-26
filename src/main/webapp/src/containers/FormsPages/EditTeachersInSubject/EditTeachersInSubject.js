import React, {Component} from "react";
import axios from "axios";
import EditTeachersInSubjectForm
    from "../../../components/Forms/FormsTemplates/EditTeachersInSubjectForm/EditTeachersInSubjectForm";

class EditTeachersInSubject extends Component{

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

    addTeacherToSubjectHandler=(teacher)=>{
        let teachers = this.state.teachers ? [...this.state.teachers] : [];
        teachers.push(teacher);
        this.setState((prevState) => {
            return {
                teachers: teachers
            }
        })
    };

    removeTeacherFromSubjectHandler=(teacher)=>{
        let teachers = this.state.teachers ? [...this.state.teachers] : [];
        let removed = teachers.filter((toRem, index, arr)=>{
            return toRem.id !== teacher.id;
        });

        this.setState((prevState) => {
            return {
                teachers: removed
            }
        })
    };

    onTeachersInSubjectEditSubmit=(event)=>{
        event.preventDefault();
        const teachers = this.state.teachers;

        teachers.forEach(teacher => {
            delete teacher.isInSubject;
        });
        this.setState({
            teachers: teachers
        });

        axios.post('/api/admin/editteachersinsubject',teachers).then(response => {
           alert('Teachers in subject edited')
        }).catch(error => {
            this.setState({
                error: true,
            })
        })
    };

    render() {

        return(

            <React.Fragment>
            <EditTeachersInSubjectForm
                addToSubject={this.addTeacherToSubjectHandler}
                removeFromSubject={this.removeTeacherFromSubjectHandler}
                subjects={this.state.subjects}
                subject={this.state.subject}
                onSubjectChange={this.onSubjectChangeHandler}
                teachersInSubject={this.state.teachers}
                onSubmit={this.onTeachersInSubjectEditSubmit}/>
            </React.Fragment>
        );
    }
}

export default EditTeachersInSubject;