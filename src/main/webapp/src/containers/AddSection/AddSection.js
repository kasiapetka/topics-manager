import React, {Component} from 'react';
import SectionFormInputs from "../../components/Forms/FormsTemplates/SectionForm/SectionFormInputs";
import {Alert} from "reactstrap";
import axios from 'axios'

class AddSection extends Component {

    emptySection = {
        name: '',
        size:'',
        semester:'',
        state:'',
    };

    state={
        error: false,
        emptyForm: false,
        subjects:[],
        topics:null
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

    onSubjectChangeHandler=(event)=>{
       const id =event.target.value;
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
            onSubjectChange={this.onSubjectChangeHandler}/>
        );
    }
}

export default AddSection;