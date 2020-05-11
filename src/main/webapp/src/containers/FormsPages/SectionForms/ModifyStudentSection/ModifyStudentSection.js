import React, {Component} from 'react';
import axios from "axios";
import {Alert} from "reactstrap";
import Spinner from "../../../../components/UI/Spinner/Spinner";
import ViewStudentSectionForm
    from "../../../../components/Forms/FormsTemplates/SectionForms/ViewStudentSectionForm/ViewStudentSectionForm";
import ModifyStudentSectionForm
    from "../../../../components/Forms/FormsTemplates/SectionForms/ModifyStudentSectionForm/ModifyStudentSectionForm";

class ModifyStudentSection extends Component {

    state = {
        loading: false,
        error: null,
        section: null,
        students: null,
        teacher: null,
        grade: null
    };

    componentDidMount() {
        this.setState({loading: true});
        const sectionId = this.props.match.params.id;

        axios.get('/api/student/studentsection/' + sectionId + '/info').then(response => {
            console.log(response.data)
            const section = {
                id: response.data.sectionId,
                name: response.data.sectionName,
                sizeOfSection: response.data.sectionSize,
                state: response.data.sectionState,
                topic: response.data.topicName,
                subject: response.data.subjectName,
                semester: response.data.semester
            };
            const grade=response.data.grade;
            const teacher = {
                name: response.data.teacherName,
                surname: response.data.teacherSurname,
                email: response.data.teacherEmail
            };
            const isInSection = response.data.inSection;
            const students = [...response.data.students];

            this.setState({
                loading: false,
                section: section,
                teacher: teacher,
                isInSection: isInSection,
                students: students,
                grade:grade
            })
        }).catch(error => {
            this.setState({
                loading: false,
                error: error
            })
        })
    }

    onDateChangeHandler = (event) => {
        const date = event.target.value;
        axios.get('/api/adminteacher/sections/'+this.state.section.id+'/dates/' + date).then(response => {
            this.setState({
                studentsPresence: [...response.data]
            })

        }).catch(error => {
            this.setState({
                error: error,
            })
        })
    };

    leaveSectionHandler=()=>{
        this.setState({loading: true});
        axios.put('/api/student/'+this.state.section.id+'/leave').then(response => {
            this.setState({loading: false});
            console.log('udao sie wyjsc')
        }).catch(error => {
            this.setState({
                error: error,
                loading: false
            })
        })
    };

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
            content = <ModifyStudentSectionForm
                isInSection={this.state.isInSection}
                leaveSection={this.leaveSectionHandler}
                onDateChange={this.onDateChangeHandler}
                teacher={this.state.teacher}
                students={this.state.students}
                section={this.state.section}/>
        }

        return content;
    }
}

export default ModifyStudentSection;