import React, {Component} from "react";
import axios from "axios";
import {Alert} from "reactstrap";
import ViewPresenceForm
    from "../../../../../../components/Forms/FormsTemplates/SectionForms/ModifySectionForm/ViewPresenceForm/ViewPresenceForm";

class ViewPresence extends Component {
    state = {
        section: this.props.section,
        students: this.props.students,
        dates: this.props.dates,
        date:null,
        issued: false,
        error: null
    };

    onDateChangeHandler = (event) => {
        const date = event.target.value;
        axios.get('/api/adminteacher/sections/'+this.state.section.id+'/dates/' + date).then(response => {

        }).catch(error => {
            this.setState({
                error: error,
            })
        })
    };

    render() {
        const error = this.state.error;
        let content;
        if (error) {
            content = (
                <Alert color="danger">
                    Server Error, Please Try Again.<br/>
                    {error.message}
                </Alert>
            )
        } else {
            content = <ViewPresenceForm
                dates={this.state.dates}
                students={this.state.students}
                onDateChange={this.onDateChangeHandler}
            />
        }
        return content;
    };
};

export default ViewPresence;