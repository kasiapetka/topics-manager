import React, {Component} from 'react';
import SectionFormInputs from "../../../components/Forms/FormsTemplates/AddSectionForm/SectionForm";
import {Alert} from "reactstrap";
import axios from 'axios'
import AddStudentToSectionForm
    from "../../../components/Forms/FormsTemplates/AddStudentsToSectionForm/AddStudentsToSectionForm";
import AddedSectionCard from "../../../components/UI/AddedCards/AddedSectionCard/AddedSectionCard";

class AddSection extends Component {

    emptySection = {
        id:'',
        name: '',
        size: '',
        semester: '',
        state: 'true',
        topic: '',
    };

    state = {
        error: false,
        emptyForm: false,
        subjects: [],
        topics: null,
        section: this.emptySection,
        addStudents: false,
        students: null,
        sectionAdded: false
    };

    componentDidMount() {
        axios.get('/api/teacher/subjects').then(response => {
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
        const target = event.target;
        const value = target.value;
        let section = {...this.state.section};
        section[target.name] = value;

        this.setState({
            section: section,
            emptyForm: false
        });
    };

    onSectionAdditionHandler = (event) => {
        event.preventDefault();
        let section = {...this.state.section};

        for (let [key, value] of Object.entries(section)) {
            if (key !== 'id' && value === '') {
                this.setState({
                    emptyForm: true
                });
                return;
            }
        }
        axios.post('/api/teacher/addsection', section).then(response => {
            section.id = response.data;
            const topics = [...this.state.topics];
            topics.filter((topic)=>topic.id === section.topic);
            section.topic = topics[0].name;

            const subjects = [...this.state.subjects];
            subjects.filter((subject)=>subject.id === section.subject);
            section.subject = subjects[0].name;

            this.setState({
                addStudents: true,
                section: section
            })
        }).catch(error => {
            this.setState({
                error: true,
            })
        })
    };

    onSubjectChangeHandler = (event) => {
        const id = event.target.value;
        axios.get('/api/teacher/topics/' + id).then(response => {
            let topics = [...response.data];
            this.setState({
                topics: topics,
            });
        }).catch(error => {
            this.setState({
                error: true,
            })
        })
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

    removeStudentFromSectionHandler =(student)=>{
        let students = this.state.students ? [...this.state.students] : [];
        let removed = students.filter(function(toRem, index, arr){ return toRem !== student;});

        this.setState((prevState) => {
            return {
                students: removed
            }
        })
    };

    onStudentsAdditionHandler= (event) => {
        event.preventDefault();

        let studentsAlbums=[];

        for (let [key, value] of Object.entries(this.state.students)) {
           studentsAlbums.push(value.album);
        }

        let studentSection={
            studentsAlbums: studentsAlbums,
            sectionId: this.state.section.id
        };

        axios.put('/api/teacher/addstudentstosection', studentSection).then(response => {
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
            content = <SectionFormInputs
                subjects={this.state.subjects}
                topics={this.state.topics}
                onSubjectChange={this.onSubjectChangeHandler}
                onChange={this.handleChange}
                section={this.state.section}
                onSubmit={this.onSectionAdditionHandler}
                emptyForm={this.state.emptyForm}/>
        } else if(!sectionAdded){
            content = <AddStudentToSectionForm
                addToSection={this.addStudentToSectionHandler}
                removeFromSection={this.removeStudentFromSectionHandler}
                students={this.state.students}
                onSubmit={this.onStudentsAdditionHandler}
                section={this.state.section}/>
        }else{
            content=<AddedSectionCard
            students={this.state.students}
            section={this.state.section}
            />
        }

        return content;
    }
}

export default AddSection;