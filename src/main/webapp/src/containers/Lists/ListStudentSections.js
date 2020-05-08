import React, {Component} from 'react'
import ListSections from "./ListSections";
import axios from "axios";
import Sections from "../../components/Lists/ListSections/Sections";
import PickSemesterInput from "../../components/Lists/PickSemesterInput/PickSemesterInput";

class ListStudentSections extends Component {

    state = {
        sections: [],
        sectionsFiltered: [],
        semester: 1,
        error: null,
        loading: false
    };

    componentDidMount() {
        this.setState({loading: true});

        const sem = this.state.semester;
        axios.get('/api/common/sections/'+sem).then(response => {
            let sections = [...response.data];
            this.setState({
                sections: sections,
                sectionsFiltered: sections,
                loading: false
            });
        }).catch(error => {
            this.setState({
                error: error,
                loading: false
            })
        })
    }

    onSemesterChangeHandler = (event) => {
        this.setState({loading: true});
        const sem = event.target.value;
        this.setState({
            semester: sem,
        });
        axios.get('/api/common/sections/' + sem).then(response => {
            let sections = [...response.data];
            this.setState({
                sections: sections,
                sectionsFiltered: sections,
                loading: false
            });
        }).catch(error => {
            this.setState({
                error: error,
                loading: false
            })
        })
    };

    viewSectionHandler=()=>{
        alert('oglondansko')
    };

    render() {
        return (
            <div>
                <PickSemesterInput
                    semester={this.state.semester}
                    onSemesterChange={this.onSemesterChangeHandler}/>
                <Sections
                    viewSection={this.viewSectionHandler}
                    sections={this.state.sections}/>
            </div>
        )
    }
};

export default ListStudentSections