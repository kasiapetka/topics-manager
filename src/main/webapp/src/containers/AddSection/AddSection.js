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
        topics:[]
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
            subjects={this.state.subjects}/>
        );
    }
}

export default AddSection;