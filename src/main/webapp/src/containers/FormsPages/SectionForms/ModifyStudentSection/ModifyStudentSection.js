import React, {Component} from 'react';
import axios from "axios";
import {Alert} from "reactstrap";
import Spinner from "../../../../components/UI/Spinner/Spinner";
import ModifyStudentSectionForm
    from "../../../../components/Forms/FormsTemplates/SectionForms/ModifyStudentSectionForm/ModifyStudentSectionForm";
import Modal from "../../../../components/UI/Modal/Modal";
import ShowPresenceCard from "../../../../components/UI/Cards/ShowPresenceCard/ShowPresenceCard";
import {withRouter} from "react-router-dom";

class ModifyStudentSection extends Component {

    state = {
        loading: false,
        error: null,
        section: null,
        students: null,
        teacher: null,
        grade: null,
        mounted: false,
        membersChanged: false,
        showPresence: false,
        presences: null,
        file: null,
    };

    getSectionInfo = () => {
        this.setState({loading: true});
        const sectionId = this.props.match.params.id;

        axios.get('/api/student/studentsection/' + sectionId + '/info').then(response => {
            const section = {
                id: response.data.sectionId,
                name: response.data.sectionName,
                sizeOfSection: response.data.sectionSize,
                state: response.data.sectionState,
                topic: response.data.topicName,
                subject: response.data.subjectName,
                semester: response.data.semester
            };
            const grade = response.data.grade;
            const teacher = {
                name: response.data.teacherName,
                surname: response.data.teacherSurname,
                email: response.data.teacherEmail
            };
            const isInSection = response.data.inSection;
            const students = [...response.data.students];
            const presences = [...response.data.presences];
            this.setState({
                loading: false,
                section: section,
                teacher: teacher,
                isInSection: isInSection,
                students: students,
                presences:presences,
                grade: grade,
                mounted: true,
                membersChanged: false,
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
                this.state.showPresence === nextState.showPresence) {
                return false;
            } else return true;
        } else return true;
    }

    leaveSectionHandler = () => {
        this.setState({loading: true});
        axios.put('/api/student/' + this.state.section.id + '/leave').then(response => {
            this.props.history.replace('/student/sections');
        }).catch(error => {
            this.setState({
                error: error,
                membersChanged: true,
                loading: false
            })
        })
    };

    showPresenceHandler = () => {
        this.setState((prevState) => {
            return {
                showPresence: !prevState.showPresence
            }
        });
    };

    fileChangedHandler=(event)=>{
        let file = event.target.files[0];
        this.setState({
            file: file,
        });
    };

    fileUploadHandler=()=>{
        const formData = new FormData();
        let fileSize = this.state.file.size;
        fileSize = fileSize/(1024 *1024);
        if(fileSize > 50){
            alert('File too big! Max size is 50MB. Your is: '+
                fileSize.toFixed(2)+'MB.');
            this.setState({
                file: null,
            });
        }else{
            formData.append(
                "myFile",
                this.state.file,
                this.state.file.name
            );
            console.log(this.state.file);
            //axios.post("api/uploadfile", formData);
        }
    };

    render() {
        const section = this.state.section;
        const loading = this.state.loading;
        const error = this.state.error;
        const showPresence = this.state.showPresence;
        let content = <p>Something went wrong.</p>, modal;
        if (error) {
            content = <Alert color="danger">
                Server Error, Please Try Again. <br/>
                {error.message}
            </Alert>
        } else if (loading) {
            content = <Spinner/>;
        }
        if (showPresence) {
            modal = <Modal
                show={showPresence}
                modalClosed={this.showPresenceHandler}>
                <ShowPresenceCard
                    cancel={this.showPresenceHandler}
                    dates={this.state.presences}/>
            </Modal>
        }
        if (section) {
            content = <ModifyStudentSectionForm
                isInSection={this.state.isInSection}
                fileChanged={this.fileChangedHandler}
                fileUpload={this.fileUploadHandler}
                leaveSection={this.leaveSectionHandler}
                teacher={this.state.teacher}
                students={this.state.students}
                grade={this.state.grade}
                showPresence={this.showPresenceHandler}
                section={this.state.section}/>
        }

        return (<React.Fragment>
            {modal}
            {content}
        </React.Fragment>);
    }
}

export default withRouter(ModifyStudentSection);