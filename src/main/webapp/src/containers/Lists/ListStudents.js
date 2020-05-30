import React, {Component} from 'react'
import Students from "../../components/Lists/ListStudents/Students";
import axios from "axios";
import handleConditionChange from "../../components/Lists/FilterLists/FilterList";
import PersonsContext from "../../context/listPersonsContext";
import {Alert} from "reactstrap";
import Spinner from "../../components/UI/Spinner/Spinner";
import PickSemesterInput from "../../components/Lists/PickSemesterInput/PickSemesterInput";
import Modal from "../../components/UI/Modal/Modal";
import StudentAlreadyInSectionCard
    from "../../components/UI/Cards/StudentAlreadyInSectionCard/StudentAlreadyInSectionCard";

class ListStudents extends Component {

    constructor(props) {
        super(props);
        this.state = {
            students: [],
            error: null,
            search: '',
            studentsFiltered: [],
            condition: 'Email',
            personRole: '',
            deletePerson: false,
            personToDelete: '',
            semester: 1,
            loading: true,
            oversize: false,
            sectionCreation: this.props.addStudentToSection ? this.props.addStudentToSection : false,
            studentsAlreadyInSection: this.props.studentsInSection ? Array.from(this.props.studentsInSection) : false,
            studentsInSection: 0,
            editSectionMembers: false,
            sendMessage: false,
            studentToSendMessage: null
        };
    }

    componentDidMount = () => {
        let sem = this.state.semester;
        if (this.props.sectionSemester) {
            sem = this.props.sectionSemester;
        }
        axios.get('/api/common/students/' + sem).then(response => {
                let students = [...response.data];
                let studentsInSection = 0, oversize = false;
                let editSectionMembers = false;

                if (this.state.studentsAlreadyInSection) {
                    editSectionMembers = true;
                    students.forEach(student => student.isOnSem = true)

                    const studentsAlreadyInSection = [...this.state.studentsAlreadyInSection];
                    studentsAlreadyInSection.forEach(studentAlreadyInSection => {
                        students.forEach(student => {
                            if (studentAlreadyInSection.album === student.album) {
                                studentAlreadyInSection.isOnSem = true;
                            } else if (studentAlreadyInSection.isOnSem !== true) {
                                studentAlreadyInSection.isOnSem = false;
                            }
                        })
                    });
                    studentsAlreadyInSection.forEach(studentAlreadyInSection => {
                        if (studentAlreadyInSection.isOnSem !== true) {
                            students.push(studentAlreadyInSection);
                        }
                    });
                    students.forEach(student => {
                        studentsAlreadyInSection.forEach(studentAlreadyInSection => {
                            if (studentAlreadyInSection.album === student.album) {
                                student.isInSection = true;
                            } else if (student.isInSection !== true) {
                                student.isInSection = false;
                            }
                        })
                    });

                    studentsInSection = this.state.studentsAlreadyInSection.length;
                    if (studentsInSection === this.props.sectionSize) {
                        oversize = true;
                    }
                }
                this.setState({
                    students: students,
                    studentsFiltered: students,
                    loading: false,
                    studentsInSection: studentsInSection,
                    oversize: oversize,
                    editSectionMembers: editSectionMembers
                });
            }
        ).catch(error => {
            this.setState({
                error: error,
                loading: false
            })
        })
    }
    ;

    handleChange = (event) => {
        let content = handleConditionChange(event, this.state.condition,
            this.state.students);
        this.setState({
            studentsFiltered: content.newList,
            search: content.value
        });
    };

    onConditionChanged = (event) => {
        this.setState({
            condition: event.currentTarget.value,
            studentsFiltered: this.state.students,
            search: ''
        });
    };

    onSemesterChangeHandler = (event) => {
        this.setState({loading: true});
        const sem = event.target.value;
        this.setState({
            semester: sem,
        });
        axios.get('/api/common/students/' + sem).then(response => {
            let students = [...response.data];
            this.setState({
                students: students,
                studentsFiltered: students,
                loading: false
            });
        }).catch(error => {
            this.setState({
                error: error,
                loading: false
            })
        })
    };

    onStudentEditHandler = (index) => {
        const student = this.state.studentsFiltered[index];
        this.props.editPerson("/api/admin/modifystudent", student.album, 'S');
    };

    onStudentDeleteHandler = (index) => {
        const student = this.state.studentsFiltered[index];
        this.props.deletePerson(student, 'S');
    };

    addToSectionHandler = (student) => {
        let size = this.state.studentsInSection;
        size = size + 1;
        if (size >= this.props.sectionSize) {
            this.setState({
                oversize: true,
            });
        }
        this.setState({studentsInSection: size});
        axios.get(' /api/common/sections/' + this.props.sectionId + '/student/' +
            student.album + '/checkjoin').then(response => {
            this.props.addToSection(student);
            return true;
        }).catch(error => {
            student.showMessageInfo = true;
            this.removeFromSectionHandler(student);
            this.setState({
                sendMessage: true,
                studentToSendMessage: student
            });
            return false;
        })
    };

    removeFromSectionHandler = (student) => {
        let size = this.state.studentsInSection;
        if (size >= this.props.sectionSize) {
            this.setState({
                oversize: false,
            });
        }
        size = size - 1;
        this.setState({studentsInSection: size});
        student.isInSection = false;
        this.props.removeFromSection(student);
    };

    studentAlreadyInSectionHandler = () => {
        this.setState((prevState) => {
            return {
                sendMessage: !prevState.sendMessage
            }
        });
    };

    sendMessageHandler = () => {
        this.setState({sendMessage: false});
        // const student = this.state.studentsFiltered.filter(student =>
        //     student.album === this.state.studentToSendMessage.album);
        // student.messageSent = true;
        const msg = {
            sectionId: this.props.sectionId,
            email: this.state.studentToSendMessage.user.email
        };
        console.log(msg)

        // this.setState({loading: true});
        axios.post('/api/message/joinsectionmessage', msg).then(response => {
            // this.setState({loading: false});
            alert('Message Sent!')
        }).catch(error => {
            // this.setState({error: error, loading: false})
            alert("ERROR")
        });

    };

    render() {
        const error = this.state.error;
        let list, sem;
        let modal;
        if (this.state.sendMessage) {
            modal = <Modal show={this.state.sendMessage}
                           modalClosed={this.studentAlreadyInSectionHandler}>
                <StudentAlreadyInSectionCard
                    sectionInfo={this.state.sendMessage}
                    sendMessage={this.sendMessageHandler}
                    cancel={this.studentAlreadyInSectionHandler}/></Modal>
        }
        if (!this.state.sectionCreation) {
            sem = <PickSemesterInput
                semester={this.state.semester}
                onSemesterChange={this.onSemesterChangeHandler}
            />
        }
        if (error) {
            list = (
                <Alert color="danger">
                    Server Error, Please Try Again.<br/>
                    {error.message}
                </Alert>
            )
        } else if (this.state.loading) {
            list = (<Spinner/>)
        } else if (this.state.students) {
            list = (
                <React.Fragment>
                    {sem}
                    {modal}
                    <PersonsContext.Provider
                        value={{
                            persons: this.state.studentsFiltered,
                            edit: this.onStudentEditHandler,
                            change: this.handleChange,
                            conditionChange: this.onConditionChanged,
                            condition: this.state.condition,
                            search: this.state.search,
                            delete: this.onStudentDeleteHandler,
                        }}>
                        <Students
                            editSectionMembers={this.state.editSectionMembers}
                            oversize={this.state.oversize}
                            addToSection={this.addToSectionHandler}
                            removeFromSection={this.removeFromSectionHandler}
                            sectionCreation={this.state.sectionCreation}/>

                    </PersonsContext.Provider>
                </React.Fragment>)
        }
        return list;
    }
}
;

export default ListStudents;