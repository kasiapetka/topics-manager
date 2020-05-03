import React, {Component} from "react";
import auth from "../../../../Auth";
import {Redirect} from "react-router-dom";
import ModifySectionForm
    from "../../../../components/Forms/FormsTemplates/SectionForms/ModifySectionForm/ModifySectionForm";
import axios from "axios";
import {Alert} from "reactstrap";
import Spinner from "../../../../components/UI/Spinner/Spinner";

class ModifySection extends Component {

    state = {
        section: this.props.section,
        students: null,
        loading: false,
        error: null
    };

    componentDidMount() {
      //  axios.put('/api/adminteacher/students/' + this.state.section.id).then(response => {
     //       const students = [...response.data];
      //      this.setState({
      //          students: students,
      //          loading: false
      //      })
      //  }).catch(error => {
     //       this.setState({
       //         error: error,
       //         loading: false
       //     })
      //  })
    }

    onStateChangeHandler = (event) => {
        this.setState({loading: true});
        const state = event.target.value;

        axios.put('/api/adminteacher/sections/' + this.state.section.id + '/state', state).then(response => {
            const section = [...response.data];
            this.setState({
                section: section,
                loading: false
            })
        }).catch(error => {
            this.setState({
                error: error,
                loading: false
            })
        })
    };

    render() {
        const section = this.state.section;
        const loading = this.state.loading;
        const error = this.state.error;
        let path, content;
        if (auth.getRole() === 'A') path = '/admin';
        if (auth.getRole() === 'T') path = '/teacher';

        if (!section) {
            return <Redirect to={path + '/sections'}/>
        } else if (error) {
            content = <Alert color="danger">
                Server Error, Please Try Again. <br/>
                {error.message}
            </Alert>
        } else if (loading) {
            content = <Spinner/>
        } else {
            content = <ModifySectionForm section={section}
                                         students={this.state.students}
                                         onStateChange={this.onStateChangeHandler}/>
        }

        return content;
    }
}

export default ModifySection;