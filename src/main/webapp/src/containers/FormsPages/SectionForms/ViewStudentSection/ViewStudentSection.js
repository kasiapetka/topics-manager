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
        mounted: false,
        membersChanged: false
    };

    getSectionInfo = () => {
        this.setState({loading: true});
        const sectionId = this.props.match.params.id;

        axios.get('/api/student/section/' + sectionId + '/info').then(response => {
            const section = {
                id: response.data.sectionId,
                name: response.data.sectionName,
                sizeOfSection: response.data.sectionSize,
                state: response.data.sectionState,
                topic: response.data.topicName,
                subject: response.data.subjectName,
                semester: response.data.semester
            };
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
                mounted: true,
                membersChanged: false
            })
        }).catch(error => {
            this.setState({
                loading: false,
                error: error,
                mounted: true
            })
        })
    };

    componentDidMount() {
        this.getSectionInfo();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.mounted)
            this.getSectionInfo();
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (this.state.mounted) {
            if (this.state.membersChanged === nextState.membersChanged) {
                return false;
            } else return true;
        } else return true;
    }

    leaveSectionHandler = () => {
        this.setState({loading: true});
        axios.put('/api/student/' + this.state.section.id + '/leave').then(response => {
            this.setState({
                loading: false,
                membersChanged: true
            });
        }).catch(error => {
            this.setState({
                error: error,
                loading: false,
                membersChanged: true
            })
        })
    };

    joinSectionHandler = () => {
        this.setState({loading: true});
        axios.put('/api/student/' + this.state.section.id + '/join').then(response => {
            this.setState({
                loading: false,
                membersChanged: true
            });
        }).catch(error => {
            this.setState({
                error: error,
                membersChanged: true,
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
            content = <ViewStudentSectionForm
                isInSection={this.state.isInSection}
                joinSection={this.joinSectionHandler}
                leaveSection={this.leaveSectionHandler}
                teacher={this.state.teacher}
                students={this.state.students}
                section={this.state.section}/>
        }

        return content;
    }
}

export default ViewStudentSection;