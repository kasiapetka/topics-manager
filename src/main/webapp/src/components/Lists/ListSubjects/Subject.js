import React from 'react'
import classes from './ListSubjects.module.css'
import { Row} from "reactstrap";

const Subject = (props) => {
    return (
        <div className={classes.Subject}>
            <Row className="pt-2 pb-2 mr-0 ml-0">
               <span className="float-left ml-3"><strong>Name:</strong> <em>{props.name}</em></span>
            </Row>
            <Row className="pt-2 pb-2 mr-0 ml-0">
                <span className="float-left ml-3"><strong>Summary:</strong> <em>{props.summary}</em></span>
            </Row>

            {/*{*/}
            {/*    auth.getRole() === 'A'*/}
            {/*        ?*/}
            {/*        <Row className="pt-2 pb-3 mr-0 ml-0">*/}
            {/*            <Col><Link to="/admin/edit"><Button className="d-inline-block" onClick={props.edit}>Edit</Button></Link></Col>*/}
            {/*            <Col><Button className="d-inline-block" onClick={props.delete} outline*/}
            {/*                         color="danger">Delete</Button></Col>*/}
            {/*        </Row>*/}
            {/*        :*/}
            {/*        null*/}
            {/*}*/}
        </div>
    )
};

export default Subject;