import React from 'react';
import { Jumbotron, Button, Row, Col } from 'reactstrap';

const PageJumbotron = (props) => {
    return (
        <div>
            <Jumbotron className="jumbo jumbotron-fluid">
                <div className="grid">
                <Row>
                    <Col sm="1"></Col>
                    <Col sm="11">
                        <h1 className="display-3">Task Manager</h1>
                        <p className="lead">Simple way to keep all Your projects easily accessible, well-organised and consistent.</p>
                        <hr className="my-2" />
                        <p>Log in or create an account and enhance Your work with great project and groups management features.</p>
                        <p className="lead">
                            <Button color="secondary">Join Now</Button>
                        </p>
                    </Col>
                </Row>
                </div>
            </Jumbotron>
        </div>
    );
};

export default PageJumbotron;