import React, {Component} from "react";
import axios from "axios";
import {Alert} from "reactstrap";
import Spinner from "../../../../components/UI/Spinner/Spinner";
import ViewStudentSectionForm
    from "../../../../components/Forms/FormsTemplates/SectionForms/ViewStudentSectionForm/ViewStudentSectionForm";
import Modal from "../../../../components/UI/Modal/Modal";
import SignOutOfSectionCard from "../../../../components/UI/Cards/SignOutOfSectionCard/SignOutOfSectionCard";
import auth from "../../../../Auth";

class ViewStudentSection extends Component {

    state = {
        loading: false,
        error: null,
        section: null,
        students: null,
        teacher: null,
        mounted: false,
        membersChanged: false,
        signOutOfSection: false,
        signOutOfSectionInfo: null
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
            if (this.state.membersChanged === nextState.membersChanged &&
                this.state.signOutOfSection === nextState.signOutOfSection) {
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

    checkIfMemberHandler = () => {
        this.setState({loading: true});
        axios.put('/api/common/sections/' + this.state.section.id + '/student/' +
            auth.parseJwt(auth.getToken()).sub + '/checkjoin').then(response => {
            this.setState({loading: false,});
            this.joinSectionHandler();
        }).catch(error => {
            if (error.response.status === 409) {
                this.setState({
                    loading: false,
                    signOutOfSection: true,
                    signOutOfSectionInfo: error.response.data
                })
            } else {
                this.setState({
                    error: error,
                    loading: false
                })
            }
        })
    };

    joinSectionHandler = () => {
        this.setState({loading: true});
        axios.put('/api/student/' + this.state.section.id + '/join').then(response => {
            this.setState({
                loading: false,
                membersChanged: true,
                signOutOfSection: false
            });
        }).catch(error => {
            this.setState({
                error: error,
                membersChanged: true,
                loading: false,
                signOutOfSection: false
            })
        })
    };

    signOutOfSectionHandler = () => {
        this.setState((prevState) => {
            return {
                signOutOfSection: !prevState.signOutOfSection
            }
        });
    };

    render() {
        const section = this.state.section;
        const loading = this.state.loading;
        const error = this.state.error;
        let content = <p>Something went wrong.</p>;
        let modal;
        if (this.state.signOutOfSection) {
            modal = <Modal show={this.state.signOutOfSection}
                           modalClosed={this.signOutOfSectionHandler}>
                <SignOutOfSectionCard
                    sectionInfo={this.state.signOutOfSectionInfo}
                    joinSection={this.joinSectionHandler}
                    cancel={this.signOutOfSectionHandler}/></Modal>
        }

        if (error) {
            content = <Alert color="danger">
                Server Error, Please Try Again. <br/>
                {error.message}
            </Alert>
        } else if (loading) {
            content = <Spinner/>;
        } else if (section) {
            content = <React.Fragment>
                {modal}
                <ViewStudentSectionForm
                    isInSection={this.state.isInSection}
                    joinSection={this.checkIfMemberHandler}
                    leaveSection={this.leaveSectionHandler}
                    teacher={this.state.teacher}
                    students={this.state.students}
                    section={this.state.section}/>
            </React.Fragment>
        }
        return content;
    }
}

export default ViewStudentSection;