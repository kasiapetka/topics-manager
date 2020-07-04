import React, {Component} from "react";
import EditSectionForm from "../../../../components/Forms/FormsTemplates/SectionForms/EditSectionForm/EditSectionForm";
import axios from "axios";
import {Alert} from "reactstrap";
import Spinner from "../../../../components/UI/Spinner/Spinner";
import Modal from "../../../../components/UI/Modal/Modal";

class EditSection extends Component {
    state = {
        section: null,
        formValid: false,
        students: null,
        loading: false,
        error: null,
        formTouched: false,
        changed: false,
        oversize: false
    };

    componentDidMount() {
        this.setState({loading: true});
        const sectionId = this.props.match.params.id;
        axios.get('/api/common/sections/section/' + sectionId).then(response => {
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

        this.setState({
            section: section,
            formTouched: true,
            oversize: false
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
        this.setState({loading: true});
        axios.put('/api/adminteacher/sections/section/' + section.id + '/edit', section)
            .then(response => {
                this.setState({changed: true, loading: false})
            })
            .catch(error => {
                if (error.response.status === 469) {
                    const section = {...this.state.section};
                    section.size = section.sizeOfSection;
                    this.setState({
                        oversize: true,
                        loading: false,
                        section: section
                    })
                } else {
                    this.setState({
                        error: error,
                        loading: false
                    })
                }
            });
    };

    showChangedInfoHandler=()=>{
        this.setState((prevState) => {
            return {
                changed: !prevState.changed
            }
        });
    };

    render() {
        const section = this.state.section;
        const loading = this.state.loading;
        const error = this.state.error;
        let modal;
        if (this.state.changed) {
            modal = <Modal show={this.state.changed}
                           modalClosed={this.showChangedInfoHandler}>Changes Saved!</Modal>
        }
        if (error) {
            return <Alert color="danger">
                Server Error, Please Try Again. <br/>
                {error.message}
            </Alert>
        } else if (loading) {
            return <Spinner/>;
        } else if (section) {
            return (<React.Fragment>
                    {modal}
                    <EditSectionForm
                        section={section}
                        oversize={this.state.oversize}
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