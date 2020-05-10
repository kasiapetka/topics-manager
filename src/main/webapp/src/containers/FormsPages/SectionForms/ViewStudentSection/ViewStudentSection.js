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
        students: null
    };

    componentDidMount() {
        this.setState({loading: true});
        const sectionId = this.props.match.params.id;

        axios.get('/api/student/section/' + sectionId).then(response => {
            const section = {...response.data};
            this.setState({
                loading: false,
                section: section
            })
        }).catch(error => {
            this.setState({
                loading: false,
                error: error
            })
        })
    }

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
        } else if(section){
            content = <ViewStudentSectionForm
                            section={this.state.section}/>
        }

        return content;
    }
}

export default ViewStudentSection;