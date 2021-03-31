import React from 'react';
import { Tabs, Tab,Row, Col, Nav} from 'react-bootstrap';

const Admin = () => {
    return (
        <div>
            <div className="container">
                <Tabs defaultActiveKey="add" id="uncontrolled-tab-example">
                    <Tab eventKey="add" title="Add Product">
                        <h1>This is Add Product Tab</h1> 
                    </Tab>
                    <Tab eventKey="manage" title="Manage Product">
                        <h1>This is Manage Product Tab</h1>
                    </Tab>
                    <Tab eventKey="edit" title="Edit Product">
                        <h1>This is Edit Product Tab</h1>
                    </Tab>
                </Tabs>
            </div>

            <hr/>

            <div className="container mt-5">
                <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                    <Row>
                        <Col sm={3}>
                        <Nav variant="pills" className="flex-column">
                            <Nav.Item>
                                <Nav.Link eventKey="first">Add Product</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="second">Manage Product</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="third">Edit Product</Nav.Link>
                            </Nav.Item>
                        </Nav>
                        </Col>
                        <Col sm={9}>
                        <Tab.Content>
                            <Tab.Pane eventKey="first">
                                <h1>This is Add Product Tab</h1>
                            </Tab.Pane>
                            <Tab.Pane eventKey="second">
                                <h1>This is Manage Product Tab</h1>
                            </Tab.Pane>
                            <Tab.Pane eventKey="third">
                                <h1>This is Edit Product Tab</h1>
                            </Tab.Pane>
                        </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            </div>
        </div>
    );
};

export default Admin;