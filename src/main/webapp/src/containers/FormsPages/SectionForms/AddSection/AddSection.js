import React, {Component} from 'react';
import AddSectionForm from "../../../../components/Forms/FormsTemplates/AddSectionForm/AddSectionForm";
import {Alert} from "reactstrap";
import axios from 'axios'
import AddStudentToSectionForm
    from "../../../../components/Forms/FormsTemplates/AddStudentsToSectionForm/AddStudentsToSectionForm";
import AddedSectionCard from "../../../../components/UI/Cards/SectionCards/AddedSectionCard/AddedSectionCard";
import handleInputChange from "../../validateForm";
import auth from "../../../../Auth";

class AddSection extends Component {
    state = {
        section: {
            id: {
                value: '',
                validation: {
                    valid: true,
                }
            },
            name: {
                value: '',
                validation: {
                    valid: false,
                    touched: false,
                    required: true,
                    minLength: 2
                }
            },
            size: {
                value: '',
                validation: {
                    valid: false,
                    touched: false,
                    required: true
                }
            },
            semester: {
                value: '',
                validation: {
                    valid: false,
                    touched: false,
                    required: true
                }
            },
            state: {
                value: 'O',
                validation: {
                    valid: true,
                    touched: false,
                    required: true
                }
            },
            topic: {
                value: null,
                validation: {
                    valid: false,
                    touched: false,
                    required: true
                }
            },
            subject: {
                value: null,
                validation: {
                    valid: true,
                    required: true
                }
            },
            teacher: {
                value: null,
                validation: {
                    valid: true,
                    required: true
                }
            }
        },
        error: false,
        formValid: false,
        subjects: [],
        teachers: null,
        topics: null,
        addStudents: false,
        students: null,
        sectionAdded: false,
        wrongName: false
    };

    componentDidMount() {
        let path;
        if (auth.getRole() === 'A') {
            path = '/api/admin/subjects';
            axios.get('/api/admin/teachers').then(response => {
                let teachers = [...response.data];
                this.setState({
                    teachers: teachers
                });
            }).catch(error => {
                this.setState({
                    error: true,
                })
            })
        }
        if (auth.getRole() === 'T') path = '/api/teacher/subjects/' + auth.getId();

        axios.get(path).then(response => {
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

    handleChange = (event) => {
        const formProperties = handleInputChange(event, this.state.section);

        this.setState({
            section: formProperties.form,
            formValid: formProperties.formValid,
            wrongName: false
        });
    };

    onSectionAdditionHandler = (event) => {
        event.preventDefault();

        let teacher;
        if (this.state.section.teacher.value) {
            teacher = this.state.section.teacher.value;
        } else {
            teacher = auth.getId();
        }

        const section = {
            name: this.state.section.name.value,
            size: this.state.section.size.value,
            state: this.state.section.state.value,
            semester: this.state.section.semester.value,
            topic: this.state.section.topic.value,
            teacherId: teacher
        };

        axios.post('/api/adminteacher/addsection', section).then(response => {
            section.id = response.data;
            const topics = [...this.state.topics];
            topics.filter((topic) => topic.id === section.topic);
            section.topic = topics[0].name;

            const subjects = [...this.state.subjects];
            subjects.filter((subject) => subject.id === section.subject);
            section.subject = subjects[0].name;

            this.setState({
                addStudents: true,
                section: section
            })
        }).catch(error => {
            if (error.response.status === 409) {
                this.setState({
                    wrongName: true,
                })
            } else {
                this.setState({
                    error: true,
                })
            }
        })
    };

    onSubjectChangeHandler = (event) => {
        const id = event.target.value;
        const section = {...this.state.section};
        section.subject.value = id;

        axios.get('/api/adminteacher/topics/' + id).then(response => {
            let topics = [...response.data];
            this.setState({
                topics: topics,
                section: section
            });
        }).catch(error => {
            this.setState({
                error: true,
            })
        })
    };

    onTeacherChangeHandler = (event) => {
        const id = event.target.value;
        const section = {...this.state.section};
        section.teacher.value = id;

        this.setState({
            section: section
        });
    };

    addStudentToSectionHandler = (student) => {
        let students = this.state.students ? [...this.state.students] : [];
        students.push(student);

        this.setState((prevState) => {
            return {
                students: students
            }
        })
    };

    removeStudentFromSectionHandler = (student) => {
        let students = this.state.students ? [...this.state.students] : [];
        let removed = students.filter(function (toRem, index, arr) {
            return toRem !== student;
        });

        this.setState((prevState) => {
            return {
                students: removed
            }
        })
    };

    onStudentsAdditionHandler = (event) => {
        event.preventDefault();

        let studentsAlbums = [];

        if (this.state.students) {
            if (this.state.students.length !== 0) {
                for (let [key, value] of Object.entries(this.state.students)) {
                    studentsAlbums.push(value.album);
                }
            }
        }

        let studentSection = {
            studentsAlbums: studentsAlbums,
            sectionId: this.state.section.id
        };

        axios.put('/api/adminteacher/addstudentstosection', studentSection).then(response => {
            this.setState({
                sectionAdded: true,
            })

        }).catch(error => {
            this.setState({
                error: true,
            })
        })
    };

    render() {
        const error = this.state.error;
        const addStudents = this.state.addStudents;
        const sectionAdded = this.state.sectionAdded;
        let content;

        if (error) {
            return (
                <Alert color="danger">
                    Server Error, Please Try Again.
                </Alert>
            )
        } else if (!addStudents) {
            content = <AddSectionForm
                subjects={this.state.subjects}
                topics={this.state.topics}
                teachers={this.state.teachers}
                onSubjectChange={this.onSubjectChangeHandler}
                onTeacherChange={this.onTeacherChangeHandler}
                onChange={this.handleChange}
                section={this.state.section}
                onSubmit={this.onSectionAdditionHandler}
                formValid={this.state.formValid}
                wrongName={this.state.wrongName}/>
        } else if (!sectionAdded) {
            content = <AddStudentToSectionForm
                addToSection={this.addStudentToSectionHandler}
                removeFromSection={this.removeStudentFromSectionHandler}
                students={this.state.students}
                onSubmit={this.onStudentsAdditionHandler}
                section={this.state.section}/>
        } else {
            content = <AddedSectionCard
                students={this.state.students}
                section={this.state.section}
            />
        }

        return content;
    }
}

export default AddSection;