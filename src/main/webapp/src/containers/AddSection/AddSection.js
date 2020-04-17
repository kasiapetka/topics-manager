import React, {Component} from 'react';
import SectionFormInputs from "../../components/Forms/FormsTemplates/SectionForm/SectionFormInputs";
import {Alert} from "reactstrap";
import axios from 'axios'
import filterList from "../../components/Lists/FilterList";

class AddSection extends Component {

    emptySection = {
        name: '',
        size:'',
        semester:'',
        state: 'true',
        topic:'',
        subject:''
    };

    state={
        error: false,
        emptyForm: false,
        subjects: [],
        topics: null,
        section: this.emptySection
    };

    componentDidMount() {
        axios.get('/api/teacher/subjects').then(response=>{
            let subjects = [...response.data];
            this.setState({
                subjects: subjects,
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

    handleSumbit=(event)=>{
        event.preventDefault();
        const section = {...this.state.section};

        for (let [key, value] of Object.entries(section)) {
            if(value === ''){
                this.setState({
                    emptyForm: true
                });
                return;
            }
        }

        axios.post('/api/teacher/addSection',section).then(response=>{
           //dodawnie studentow
        }).catch(error => {
            this.setState({
                error: true,
            })
        })
    };

    onSubjectChangeHandler=(event)=>{
       const id =event.target.value;
        let section = {...this.state.section};
        section[event.target.name] = event.target.value;
        this.setState({
            section: section,
        });

        axios.get('/api/teacher/topics/'+id).then(response=>{
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

    render() {

        const error = this.state.error;
        if(error){
            return(
                <Alert color="danger">
                    Server Error, Please Try Again.
                </Alert>
            )
        }

        return (
            <SectionFormInputs
            subjects={this.state.subjects}
            topics={this.state.topics}
            onSubjectChange={this.onSubjectChangeHandler}
            onChange={this.handleChange}
            section = {this.state.section}
            onSubmit={this.handleSumbit}
            emptyForm={this.state.emptyForm}/>
        );
    }
}

export default AddSection;