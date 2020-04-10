import React from 'react';
import {Jumbotron, Button, Row, Col} from 'reactstrap';
import {Link} from "react-router-dom";
import classes from './layout.module.css'

const PageJumbotron = () => {

    const jumboClasses = "jumbotron-fluid "+classes.Jumbo;
    return(
    <Jumbotron className={jumboClasses}>
        <div className="grid">
            <Row className="ml-0 mr-0">
                <Col sm="1"></Col>
                <Col sm="10">
                    <h1 className="display-3">Task Manager</h1>
                    <p className="lead">Simple way to keep all Your projects easily accessible, well-organised and
                        consistent.</p>
                    <hr className="my-2"/>
                    <p>Log in or create an account and enhance Your work with great project and groups management
                        features.</p>
                    <p className="lead">
                        <Link to="/register">
                            <Button color="secondary">Join Now</Button>
                        </Link>
                    </p>
                </Col>
            </Row>
        </div>
    </Jumbotron>
    );
};

export default React.memo(PageJumbotron);