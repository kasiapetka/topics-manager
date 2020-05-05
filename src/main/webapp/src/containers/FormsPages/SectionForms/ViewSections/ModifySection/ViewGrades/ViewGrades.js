import React, {Component} from "react";
import axios from "axios";
import {Alert} from "reactstrap";
import ViewPresenceForm
    from "../../../../../../components/Forms/FormsTemplates/SectionForms/ModifySectionForm/ViewPresenceForm/ViewPresenceForm";

class ViewGrades extends Component {
    state = {
        section: this.props.section,
        students: this.props.students,
        dates: this.props.dates,
        date:null,
        issued: false,
        error: null
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
            content=<p>View grades</p>
            // content = <ViewPresenceForm
            //     dates={this.state.dates}
            //     students={this.state.students}
            //     onDateChange={this.onDateChangeHandler}
            // />
        }
        return content;
    };
};

export default ViewGrades;