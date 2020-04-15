import React, {useContext} from "react";
import {Col, Input, Label, Row} from "reactstrap";
import listPersonsContext from '../../context/listPersonsContext';
import classes from './ListTeachers/ListTeachers.module.css'

const FilterPersonsList = (props) => {

    const context = useContext(listPersonsContext);

    return (
        <React.Fragment>
            <div className="text-center mt-4 mb-4">
                <Row className="m-auto">
                    <Col className="flex-row"><input type="radio" name="radio1"
                                                     onChange={context.conditionChange}
                                                     value="Email"
                                                     checked={context.condition === "Email"}/>
                        <span className='ml-2'>Email</span>
                    </Col>
                    <Col className="flex-row"><input type="radio" name="radio1"
                                                     onChange={context.conditionChange}
                                                     value="Name"/>
                        <span className='ml-2'>Name</span>
                    </Col>

                    <Col className="flex-row"><input type="radio" name="radio1"
                                                     onChange={context.conditionChange}
                                                     value="Surname"/>
                        <span className='ml-2'>Surname</span>
                    </Col>
                    {
                        props.list === 'S'
                            ?
                            <Col className="flex-row"><input type="radio" name="radio1"
                                                             onChange={context.conditionChange}
                                                             value="Album"/>
                                <span className='ml-2'>Album</span>
                            </Col>
                            :
                            null
                    }
                </Row>
            </div>
            <Label
                className={classes.Label}
                for="exampleSearch"> Search on: {
                context.condition
            }
            </Label>
            <Input className="p-2 w-75 m-auto"
                   type="search"
                   name="search"
                   id="exampleSearch"
                   placeholder="search..."
                   value={context.search || ''}
                   onChange={context.change}
            />
        </React.Fragment>
    );
};
export default FilterPersonsList;