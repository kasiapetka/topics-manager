import React, {Component} from "react";
import EditSectionForm from "../../../../components/Forms/FormsTemplates/SectionForms/EditSectionForm/EditSectionForm";
import axios from "axios";
import {Alert} from "reactstrap";
import Spinner from "../../../../components/UI/Spinner/Spinner";
import PrivateAdminRoute from "../../../../components/PrivateRoutes/PrivateAdminRoute";
import PrivateTeacherRoute from "../../../../components/PrivateRoutes/PrivateTeacherRoute";

class EditSection extends Component {
    state = {
        section: null,
        students: null,
        loading: false,
        error: null
    };

    componentDidMount() {
        this.setState({loading: true});
        const sectionId = this.props.match.params.id;
        axios.get('/api/adminteacher/sections/section/' + sectionId).then(response => {
            const section = {...response.data};
            this.setState({
                section: section,
                loading: false
            })
        }).catch(error => {
            this.setState({
                error: error,
                loading: false
            })
        });
    }

    render() {
        const section = this.state.section;
        const loading = this.state.loading;
        const error = this.state.error;

        if (error) {
            return <Alert color="danger">
                Server Error, Please Try Again. <br/>
                {error.message}
            </Alert>
        } else if (loading) {
            return <Spinner/>;
        } else if (section) {
            return (<React.Fragment>
                    <PrivateAdminRoute exact path="/admin/sections/editsection/:id"
                                       component={() => <EditSectionForm section={this.state.section}/>}/>
                    <PrivateTeacherRoute exact path="/teacher/sections/editsection/:id"
                                       component={() => <EditSectionForm section={this.state.section}/>}/>
                </React.Fragment>
            )
        }

        return (<p>Something went wrong.</p>);
    }
}

export default EditSection;