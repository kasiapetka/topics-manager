import React, {useContext} from "react";
import {Input, Label} from "reactstrap";
import listTeachersContext from "../../context/listTeachersContext";
import listStudentsContext from '../../context/listStudentsContext'
import classes from './listTeachers/listTeachers.module.css'

const FilterPersonsList = (props) => {

    let context, currentContext;
    if (props.list === 'T')
        currentContext = listTeachersContext;
    else if (props.list === 'S')
        currentContext = listStudentsContext;

    context = useContext(currentContext);

    return (
        <React.Fragment>
            <div className="text-center mt-4 mb-4">
                <span className="ml-5"><input type="radio" name="radio1"
                                              onChange={context.conditionChange}
                                              value="Email"
                                              checked={context.condition === "Email"}/>{' '}Email</span>
                <span className="ml-5"><input type="radio" name="radio1"
                                              onChange={context.conditionChange}
                                              value="Name"/>{' '}Name</span>
                <span className="ml-5"><input type="radio" name="radio1"
                                              onChange={context.conditionChange}
                                              value="Surname"/>{' '}Surname</span>
                {
                    props.list === 'S'
                        ?
                        <span className="ml-5"><input type="radio" name="radio1"
                                                      onChange={context.conditionChange}
                                                      value="Album"/>{' '}Album</span>
                        :
                        null
                }
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