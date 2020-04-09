import React from 'react';
import {FaUserAlt} from "react-icons/fa";
import {Button, Form, FormGroup, Input, Label} from "reactstrap";

const EditPersonInputs = (props) => {

    let label = props.role === 'A' ? 'Teachers' : 'Students';

    return (
        <Form onSubmit={props.submit}>
            <h4 className="text-center"><FaUserAlt className="accountIcon"></FaUserAlt></h4>
            <h3 className="text-center">{label} Account</h3>
            {/*----------Persons name and surname ---------------------------*/}
            <div className="form-row">
                <div className="mb-2 ml-sm-4 mr-auto mt-3 col-md-5">
                    <Label for="actualName" className="mr-sm-2 pl-1">
                        {label} Name & Surname
                    </Label>
                    <div color="light" id="actualName"
                         className="pt-2 pb-2 pl-2 border rounded text-left">
                        {props.person.name + " " + props.person.surname}
                    </div>
                </div>
                <div className="mt-3 col-md-5 mb-2 mr-sm-4">
                    <Label for="actualEmail" className="mr-sm-2 pl-1">
                        {label} Email
                    </Label>
                    <div color="light" id="actualEmail"
                         className="pt-2 pl-2 pb-2 border rounded text-left">
                        {props.person.email ? props.person.email : "No Account"}</div>
                </div>
            </div>
            {/*--------------------------------------------------------------*/}
            {/*---------Inputs for changing name and surname-----------------*/}
            <div className="form-row">
                <FormGroup className="mb-2 mr-auto ml-sm-4 mt-3 col-md-5 mb-2">
                    <Label for="exampleName" className="mr-sm-2 pl-1">
                        New Name
                    </Label>
                    <Input type="text" name="newName"
                           id="exampleName" placeholder="Enter New Name"
                           pattern="[A-Za-z]{2,}"
                           value={props.person.newName || ''}
                           onChange={props.change}
                    />
                </FormGroup>
                <FormGroup className="mb-2 mr-sm-4 mt-3 col-md-5 mb-2">
                    <Label for="exampleSurname" className="mr-sm-2 pl-1">
                        New Surname
                    </Label>
                    <Input type="text" name="newSurname"
                           id="exampleSurname" placeholder="Enter New Surname"
                           pattern="[A-Za-z]{2,}"
                           value={props.person.newSurname || ''}
                           onChange={props.change}
                    />
                </FormGroup>
            </div>
            {/*--------------------------------------------------------------*/}
            {/*-------Inputs for changing email and password-----------------*/}
            {
                props.person.email
                    ?
                    <React.Fragment>
                        <FormGroup className="mb-2 mr-sm-4 ml-sm-4 mb-sm-0 mt-3">
                            <Label for="exampleEmail" className="mr-sm-2 pl-1">
                                New Email Address
                            </Label>
                            <Input type="email" name="newEmail"
                                   id="exampleEmail" placeholder="Enter New Email"
                                   value={props.person.newEmail || ''}
                                   onChange={props.change}
                                   invalid={props.wrongEmail}/>
                        </FormGroup>
                        < FormGroup className="mb-2 mr-sm-4 ml-sm-4 mb-sm-0 mt-3">
                            <Label for="newPassword" className="mr-sm-2 pl-1">
                                New Password
                            </Label>
                            <Input type="password" name="newPassword"
                                   id="newPassword" minLength="5"
                                   placeholder="Enter New Password"
                                   value={props.person.newPassword || ''}
                                   onChange={props.change}/>
                        </FormGroup>
                    </React.Fragment>
                    :
                    null
            }
            {/*--------------------------------------------------------------*/}
            {props.credentialsChangedSuccess}
            {
                props.credsChanged
                    ?
                    <FormGroup className="mb-2 mr-sm-4 ml-sm-4 mb-sm-0 mt-3">
                        <Label for="examplePassword" className="mr-sm-2 pl-1">
                            Confirm Changes With Password
                        </Label>
                        <Input type="password" name="password"
                               id="examplePassword" minLength="5"
                               placeholder="Your Password"
                               value={props.person.password || ''}
                               onChange={props.change}
                               invalid={props.wrongPassword}/>
                    </FormGroup>
                    :
                    null
            }
            <div className="form-row text-center pt-4">
                <div className="col-12">
                    <Button type="submit" className="btn btn-primary">Save Changes</Button>
                </div>
            </div>
        </Form>
    )
};

export default EditPersonInputs;