import React, {Component} from "react";
import axios from "axios";
import {Alert} from "reactstrap";
import IssuePresenceForm
    from "../../../../../../components/Forms/FormsTemplates/SectionForms/ModifySectionForm/IssuePresenceForm/IssuePresenceForm";

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

class IssuePresence extends Component {
    state = {
        section: this.props.section,
        students: this.props.students,
        date: formatDate(),
        issued: false,
        error: null
    };

    onPresenceChangeHandler = (event, index) => {
        const students = [...this.state.students];
        students[index].present = event.target.value;
        this.setState({
            students: students,
            issued: false
        })
    };

    onDateChangeHandler = (event) => {
        let date;
        date = event.target.value;
        this.setState({
            date: date,
            issued: false
        })
    };

    onIssuePresenceSubmitHandler = (event) => {
        event.preventDefault();
        const students = [];

        this.state.students.forEach(student => {
            students.push({
                album: student.album,
                present: student.present
            });
        });

        const presenceObject = {
            date: this.state.date,
            students: students
        };

        this.props.history.push(this.props.match.url);


        axios.put('/api/adminteacher/sections/' + this.state.section.id + '/presence',
            presenceObject).then(response => {
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
            content = <IssuePresenceForm section={section}
                                   students={this.state.students}
                                   date={this.state.date}
                                   onPresenceChange={this.onPresenceChangeHandler}
                                   onDateChange={this.onDateChangeHandler}
                                   onIssuePresenceSubmit={this.onIssuePresenceSubmitHandler}
                                  />
        }
        return content;
    };
};

export default IssuePresence;