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
        formValid: false,
        students: null,
        loading: false,
        error: null,
        formTouched: false
    };

    componentDidMount() {
        this.setState({loading: true});
        const sectionId = this.props.match.params.id;
        axios.get('/api/adminteacher/sections/section/' + sectionId).then(response => {
            const section = {...response.data};
            section.size = section.sizeOfSection;
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

    onChangeHandler = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let section = {...this.state.section};
        section[name] = value;
        console.log(section)


        this.setState({
            section: section,
            formTouched: true
        });
    };

    onSubmitHandler = (event) => {
        event.preventDefault();
        let section = {
            id: this.state.section.id,
            name: this.state.section.name,
            size: this.state.section.size,
            state: this.state.section.state
        };

        console.log(section)

        axios.put('/api/adminteacher/sections/section/' + section.id + '/edit', section)
            .then(response => {
                //udalo sie

                alert('poszlo')
            })
            .catch(error => {
                this.setState({
                    error: error,
                    loading: false
                })
            });
    };

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
                    <EditSectionForm
                        section={section}
                        touched={this.state.formTouched}
                        onChange={this.onChangeHandler}
                        onSubmit={this.onSubmitHandler}
                        onStateChange={this.onStateChangeHandler}
                    />
                </React.Fragment>
            )
        }

        return (<p>Something went wrong.</p>);
    }
}

export default EditSection;