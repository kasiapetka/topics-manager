import React, {Component} from "react";
import axios from "axios";
import {Alert} from "reactstrap";
import Spinner from "../../../../components/UI/Spinner/Spinner";
import ViewStudentSectionForm
    from "../../../../components/Forms/FormsTemplates/SectionForms/ViewStudentSectionForm/ViewStudentSectionForm";

class ViewStudentSection extends Component {

    state = {
        loading: false,
        error: null,
        section: null,
        students: null,
        teacher: null,
        canJoin: false
    };

    componentDidMount() {
        this.setState({loading: true});
        const sectionId = this.props.match.params.id;

        axios.get('/api/student/section/' + sectionId + '/info').then(response => {
            const section = {
                id: response.data.sectionId,
                name: response.data.sectionName,
                sizeOfSection: response.data.sectionSize,
                state: response.data.sectionState,
                topic: response.data.topicName,
                subject: response.data.subjectName
            };
            const teacher = {
                name: response.data.teacherName,
                surname: response.data.teacherSurname,
                email: response.data.teacherEmail
            };
            const isInSection = response.data.inSection;
            // const students = [...response.data.students];

            console.log(teacher);

            this.setState({
                loading: false,
                section: section,
                teacher: teacher,
                isInSection: isInSection,
                //   students: students
            })
        }).catch(error => {
            this.setState({
                loading: false,
                error: error
            })
        })
    }

    render() {
        const section = this.state.section;
        const loading = this.state.loading;
        const error = this.state.error;
        let content = <p>Something went wrong.</p>;
        if (error) {
            content = <Alert color="danger">
                Server Error, Please Try Again. <br/>
                {error.message}
            </Alert>
        } else if (loading) {
            content = <Spinner/>;
        } else if (section) {
            content = <ViewStudentSectionForm
                canJoin={this.state.canJoin}
                teacher={this.state.teacher}
                students={this.state.students}
                section={this.state.section}/>
        }

        return content;
    }
}

export default ViewStudentSection;