import React, {Component} from "react";
import axios from "axios";
import EditTeachersInSubjectForm
    from "../../../../components/Forms/FormsTemplates/SubjectForms/EditTeachersInSubjectForm/EditTeachersInSubjectForm";
import {Alert} from "reactstrap";
import EditTeachersInSubjectCard
    from "../../../../components/UI/Cards/SubjectCards/EditTeachersInSubjectCard/EditTeachersInSubjectCard";

class EditTeachersInSubject extends Component {

    state = {
        loading: true,
        error: null,
        subjects: [],
        subject: null,
        teachers: [],
        teachersEdited: false
    };

    componentDidMount() {
        axios.get('/api/admin/subjects').then(response => {
            let subjects = [...response.data];
            this.setState({
                subjects: subjects
            });
        }).catch(error => {
            this.setState({
                error: error
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
                error: error
            })
        })
    };

    addTeacherToSubjectHandler = (teacher) => {
        let teachers = this.state.teachers ? [...this.state.teachers] : [];
        teachers.push(teacher);
        this.setState({teachers: teachers})
    };

    removeTeacherFromSubjectHandler = (teacher) => {
        let teachers = this.state.teachers ? [...this.state.teachers] : [];
        let removed = teachers.filter((toRem, index, arr) => {
            return toRem.id !== teacher.id;
        });

        this.setState({teachers: removed})
    };

    onTeachersInSubjectEditSubmit = (event) => {
        event.preventDefault();
        const teachers = this.state.teachers;
        let subjectId, subjectName;
        teachers.forEach(teacher => {
            delete teacher.isInSubject;
        });

        subjectId = this.state.subject;
        let subjects = [...this.state.subjects];
        subjects = subjects.filter((subject) => subject.id === +subjectId);
        subjectName = subjects[0].name;
        let teachersObj = {
            teachers
        };

        axios.post('/api/admin/editteachersinsubject/' + this.state.subject, teachersObj).then(response => {
            this.setState({
                teachers: teachers,
                teachersEdited: true,
                subject: subjectName
            });
        }).catch(error => {
            this.setState({
                error: error
            })
        })
    };

    render() {

        let content;
        const error = this.state.error;
        const teachersEdited = this.state.teachersEdited;

        if (error) {
            content = <Alert color="danger">
                Server Error, Please Try Again.<br/>
                {error.message}
            </Alert>
        } else if (!teachersEdited) {
            content = <EditTeachersInSubjectForm
                addToSubject={this.addTeacherToSubjectHandler}
                removeFromSubject={this.removeTeacherFromSubjectHandler}
                subjects={this.state.subjects}
                subject={this.state.subject}
                onSubjectChange={this.onSubjectChangeHandler}
                teachersInSubject={this.state.teachers}
                onSubmit={this.onTeachersInSubjectEditSubmit}/>
        } else {
            content = <EditTeachersInSubjectCard
                subject={this.state.subject}
                teachers={this.state.teachers}
            />
        }

        return (
            <React.Fragment>
                {content}
            </React.Fragment>
        );
    }
}

export default EditTeachersInSubject;