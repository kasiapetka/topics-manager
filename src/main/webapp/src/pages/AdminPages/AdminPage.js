import React, {Component} from 'react';
import PageNavbar from "../../components/PageNavbar";
import auth from "../../Auth";
import Teachers from "./ListTeachers";
import {Button, Input, Label} from 'reactstrap'
import classes from '../../css/pages.module.css'

class AdminPage extends Component{

    constructor(props) {
        super(props);
        this.state = {
            teachers: [],
            error: false,
            showTeachers: false,
            search:'',
            filtered: [],
            condition: 'Email'
        };
    }

    componentDidMount=()=>{
        const request = {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + auth.getToken(),
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        };

        fetch('/api/admin/teachers', request).then(async response => {
            const data = await response.json();
            if (response.status !== 200) {
                this.setState({error:true})
            } else {
                console.log(data)
                let teachers = [...data];
                console.log(teachers)
                this.setState({teachers: teachers});
                this.setState({filtered: teachers});
            }
        })
            .catch(error => {
                console.error('There was an error!', error);
            });
    };

    toggleTeachers =()=>{
        const aux = this.state.showTeachers;
        this.setState({showTeachers: !aux});
    };

    handleChange=(event)=>{
        let currentList = [];
        let newList = [];
        console.log(event.target.value)
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let search = this.state.search;
        search = value;

        this.setState({search: search});

        if (value !== "") {
            currentList = this.state.teachers;

            newList = currentList.filter(teacher => {
                let lc='';
                if(this.state.condition === 'Email' && teacher.user)
                    lc = teacher.user.email.toLowerCase();
                if(this.state.condition === 'Surname')
                    lc = teacher.surname.toLowerCase();
                if(this.state.condition === 'Name')
                    lc = teacher.name.toLowerCase();

                const filter = value.toLowerCase();
                return lc.includes(filter);
            });
        } else {
            newList = this.state.teachers;
        }
        this.setState({
            filtered: newList
        });
    };


    onConditionChanged=(event)=>{
        this.setState({
            condition: event.currentTarget.value
        });
        this.setState({
            filtered: this.state.teachers
        });
        this.setState({
            search: ''
        });
    };

    render() {
        return (
            <div>
                <PageNavbar/>
                <div> I am a admin</div>
                <Button onClick={this.toggleTeachers}>List Teachers</Button>
                {
                    this.state.showTeachers
                        ?
                        <div className={classes.Teachers}>
                        <div className="text-center">
                            <span className="ml-5"><Input type="radio" name="radio1"
                                                          onChange={this.onConditionChanged} value="Email"
                                                          checked={this.state.condition === "Email"}/>{' '}Email</span>
                            <span className="ml-5"><Input type="radio" name="radio1"
                                                          onChange={this.onConditionChanged} value="Name"/>{' '}Name</span>
                            <span className="ml-5"><Input type="radio" name="radio1"
                                                          onChange={this.onConditionChanged} value="Surname"/>{' '}Surname</span>
                        </div>
                        <Label className={classes.Label} for="exampleSearch">Search Teacher on: {this.state.condition}</Label>
                        <Input className="p-2 w-75 m-auto"
                        type="search"
                        name="search"
                        id="exampleSearch"
                        placeholder="search placeholder"
                        value={this.state.search || ''}
                        onChange={this.handleChange}
                        />
                        <Teachers
                            teachers={this.state.filtered}/>
                        </div>
                        :
                        null
                }
            </div>
        );
    }
}

export default AdminPage