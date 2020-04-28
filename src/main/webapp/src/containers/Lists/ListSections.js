import React, {Component} from 'react'
import axios from "axios";
import {Alert} from "reactstrap";
import Spinner from "../../components/UI/Spinner/Spinner";
import Sections from "../../components/Lists/ListSections/Sections";
import PickSemesterInput from "../../components/Lists/PickSemesterInput/PickSemesterInput";
import DeleteModal from "../../components/UI/DeleteModal/DeleteModal";
import DeletePerson from "../FormsPages/DeletePerson/DeletePerson";
import DeletePersonCard from "../../components/UI/Cards/PersonCards/DeletePersonCard/DeletePersonCard";
import DeleteSectionCard from "../../components/UI/Cards/SectionCards/DeleteSectionCard/DeleteSectionCard";

class ListSections extends Component {
    state = {
        error: false,
        sections: [],
        loading: true,
        semester: 1,
        sectionDelete: false,
        sectionToDelete: null
    };

    componentDidMount() {

        axios.get('/api/adminteacher/sections/' + this.state.semester).then(response => {
            let sections = [...response.data];
            console.log(sections)

            this.setState({
                sections: sections,
                loading: false,
            });
        }).catch(error => {
            this.setState({
                error: true,
                loading: false,
            })
        })
    }

    onSemesterChangeHandler = (event) => {
        this.setState({loading: true});
        const id = event.target.value;

        this.setState({
            semester: id,
        });

        axios.get('/api/adminteacher/sections/' + id).then(response => {
            let sections = [...response.data];
            this.setState({
                sections: sections,
                loading: false
            });
        }).catch(error => {
            this.setState({
                error: true,
                loading: false
            })
        })
    };

    onSectionEditHandler = (index) => {
        //const section = this.state.sections[index];
        alert('onSectionEditHandler')
    };

    onSectionDeleteHandler = (index) => {
        const section = this.state.sections[index];

        console.log(section)
        this.setState((prev) => {
            return {
                sectionDelete: !this.state.sectionDelete,
                sectionToDelete: section,
            };
        })
    };

    deleteSectionHandler=()=>{
        this.setState((prevState) => {
            return {
                sectionDelete: !this.state.sectionDelete,
            }
        });
    };

    render() {
        const error = this.state.error;
        const loading = this.state.loading;
        const sectionDelete = this.state.sectionDelete;
        let content, deleteModal;

        if (error) {
            return (
                <Alert color="danger">
                    Server Error, Please Try Again.
                </Alert>
            )
        } else if (loading) {
            content = <Spinner/>
        } else {
            content =
                <React.Fragment>
                    <Sections
                        sections={this.state.sections}
                        delete={this.onSectionDeleteHandler}
                        edit={this.onSectionEditHandler}
                    />
                </React.Fragment>
            ;
        }

        if (sectionDelete) {
            deleteModal = (<DeleteModal
                show={sectionDelete}
                modalClosed={this.deleteSectionHandler}>
                <DeleteSectionCard
                    deleted={false}
                    section={this.state.sectionToDelete}
                    cancel={this.deleteSectionHandler}
                    delete={this.deleteSectionHandler}/>
            </DeleteModal>)
        }

        return (
            <React.Fragment>
                {deleteModal}
                <PickSemesterInput
                    semester={this.state.semester}
                    onSemesterChange={this.onSemesterChangeHandler}
                />
                {content}
            </React.Fragment>
        );
    }
};

export default ListSections;