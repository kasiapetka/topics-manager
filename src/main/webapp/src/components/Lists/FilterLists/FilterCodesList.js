import React from "react";
import {Col, Row} from "reactstrap";
import Input from "../../Forms/FormElements/Input/Input";

const FilterCodesList = (props) => (
    <React.Fragment>
        <div className="text-center mt-4 mb-4">
            <Row className="m-auto">
                <Col className="flex-row"><input type="radio" name="radio1"
                                                 onChange={props.conditionChange}
                                                 value="Name"
                                                 checked={props.condition === "Name"}/>
                    <span className='ml-2'>Name</span>
                </Col>
                <Col className="flex-row"><input type="radio" name="radio1"
                                                 onChange={props.conditionChange}
                                                 value="Surname"/>
                    <span className='ml-2'>Surname</span>
                </Col>
                <Col className="flex-row"><input type="radio" name="radio1"
                                                 onChange={props.conditionChange}
                                                 value="Album"/>
                    <span className='ml-2'>Album</span>
                </Col>
            </Row>
        </div>

        <Input groupclasses="p-2 w-75 m-auto"
               label={'Search on: '+props.condition}
               type="search"
               name="search"
               placeholder="search..."
               value={props.search || ''}
               onChange={props.change}/>
    </React.Fragment>
);

export default FilterCodesList;
