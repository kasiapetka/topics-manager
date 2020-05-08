import React, {useContext} from "react";
import {Col, Row} from "reactstrap";
import listPersonsContext from '../../../context/listPersonsContext';
import Input from "../../Forms/FormElements/Input/Input";

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
            <Input groupclasses="p-2 w-75 m-auto"
                   label={'Search on: '+context.condition}
                   type="search"
                   name="search"
                   placeholder="search..."
                   value={context.search || ''}
                   onChange={context.change}/>

        </React.Fragment>
    );
};
export default FilterPersonsList;