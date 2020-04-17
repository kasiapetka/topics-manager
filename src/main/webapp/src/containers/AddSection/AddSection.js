import React, {Component} from 'react';
import SectionFormInputs from "../../components/Forms/FormsTemplates/SectionForm/SectionFormInputs";
import {Alert} from "reactstrap";

class AddSection extends Component {

    emptySection = {
        id: '',
        name: '',
        size:'',
        semester:'',

    };

    state={
        error: false,
        emptyForm: false,
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
            <SectionFormInputs/>
        );
    }
}

export default AddSection;