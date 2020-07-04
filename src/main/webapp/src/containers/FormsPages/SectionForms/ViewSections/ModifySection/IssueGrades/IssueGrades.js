import React, {Component} from "react";
import axios from "axios";
import {Alert} from "reactstrap";
import IssueGradesForm
    from "../../../../../../components/Forms/FormsTemplates/SectionForms/ModifySectionForm/IssueGradesForm/IssueGradesForm";

function formatDate() {
    var d = new Date(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}

class IssueGrades extends Component {
    state = {
        section: this.props.section,
        students: this.props.students,
        date: formatDate(),
        finalGrade: 2,
        error: null
    };

    componentDidMount() {
        const students = [...this.state.students];
        students.forEach(student => {
            student.grade = this.state.finalGrade;
        });
        this.setState({
            students: students
        })
    }

    onGradeChangeHandler = (event, index) => {
        const students = [...this.state.students];
        students[index].grade = event.target.value;
        this.setState({
            students: students
        })
    };

    onFinalGradeChangeHandler = (event) => {
        const students = [...this.state.students];
        const finalGrade = event.target.value;
        students.forEach(student => {
            student.grade = finalGrade;
        });

        this.setState({
            students: students,
            finalGrade:finalGrade
        })
    };

    onDateChangeHandler = (event) => {
        let date;
        date = event.target.value;
        this.setState({
            date: date
        })
    };

    onIssueGradesSubmitHandler = (event) => {
        event.preventDefault();
        const students = [];

        this.state.students.forEach(student => {
            students.push({
                album: student.album,
                grade: student.grade
            });
        });

        const gradesObject = {
            date: this.state.date,
            students: students
        };

        axios.put('/api/adminteacher/sections/' + this.state.section.id + '/grades',
            gradesObject).then(response => {
            this.props.history.push(this.props.match.url);
        }).catch(error => {
            this.setState({
                error: error,
            })
        })
    };

    render() {
        const error = this.state.error;
        const section = this.state.section;
        let content;
        if (error) {
            content = (
                <Alert color="danger">
                    Server Error, Please Try Again.<br/>
                    {error.message}
                </Alert>
            )
        } else {
            content = <IssueGradesForm section={section}
                                       students={this.state.students}
                                       date={this.state.date}
                                       finalGrade={this.state.finalGrade}
                                       onGradeChange={this.onGradeChangeHandler}
                                       onDateChange={this.onDateChangeHandler}
                                       onFinalGradeChange={this.onFinalGradeChangeHandler}
                                       onIssueGradesSubmit={this.onIssueGradesSubmitHandler}/>
        }
        return content;
    };
};

export default IssueGrades;