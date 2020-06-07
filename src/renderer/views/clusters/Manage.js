import React from 'react';
import { Container, Col, Row, Button, Jumbotron, Tabs, Tab, Table, Form, InputGroup, FormControl } from 'react-bootstrap';

class Manage extends React.Component {
    render() {
        this.clusterName = this.props.match.params.name;
        this.clusterExists = false;
        this.cluster_data = {};
        return <div>
            <Container>
                <Row>
                    <Col>
                        <Jumbotron fluid>
                            <Container>
                                <h5>Overview</h5>
                                <p>
                                    General overview of storage usage and other information
                                </p>
                                <h6>
                                    Address: <code> {this.cluster_data.address} </code>
                                </h6>
                                <hr />
                                <h6>
                                    Local Storage Usage: <code> {this.cluster_data.localUsage} </code>
                                </h6>
                                <hr />
                                <h6>
                                    Total Storage Size of Cluster: <code> {this.cluster_data.localUsage} </code>
                                </h6>
                                <hr />
                                <h6>
                                    Total Number of Pins in Cluster: <code> {this.cluster_data.localUsage} </code>
                                </h6>
                                <hr />
                                <h5>
                                    Access list
                                </h5>
                                <Table striped bordered hover size="sm" >
                                    <thead>
                                        <tr>
                                            <th style={{
                                                whiteSpace: "nowrap",
                                                textOverflow: "ellipsis",
                                                overflow: "hidden"
                                            }}>Public Key</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <a href="asd" onClick={(e) => {
                                                    e.preventDefault()
                                                    var publicKey = "0443729cbd756ad8e598acdf1986c8d586214a1ca9fa8c7932af1d59f7334d41aa2ec2342ea402e4f3c0195308a4815bea326750de0a63470e711c534932b3131c"
                                                }}>
                                                    0443729cbd756ad8e598acdf...
                                                </a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <a href="asd" onClick={(e) => {
                                                    e.preventDefault()
                                                    var publicKey = "0443729cbd756ad8e598acdf1986c8d586214a1ca9fa8c7932af1d59f7334d41aa2ec2342ea402e4f3c0195308a4815bea326750de0a63470e711c534932b3131c"
                                                }}>
                                                    0443729cbd756ad8e598acdf...
                                                </a>
                                            </td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </Container>
                        </Jumbotron>
                    </Col>
                    <Col>
                        <Tabs defaultActiveKey="general" id="uncontrolled-tab-example">
                            <Tab eventKey="general" title="General">
                                <h3>
                                    Configuration
                                </h3>
                                <Form>
                                    <Form.Label>
                                        <strong>
                                            Replication factor
                                        </strong>
                                    </Form.Label>

                                    <InputGroup>
                                        <InputGroup.Prepend>
                                            <InputGroup.Text>#</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl name="rfactor" placeholder=""  type="number" />
                                    </InputGroup>
                                    <br />
                                    <Button type="submit">
                                        Save
                                    </Button>
                                </Form>
                                <hr/>
                                <h4>
                                    Import & export
                                </h4>
                                <Button variant="success">
                                    Export
                                </Button>
                                <p>
                                    Exports all cluster data and pins into a single file. JSON and cbor (binary) are the supported export formats
                                </p>
                            </Tab>
                            <Tab eventKey="advanced" title="Advanced">
                                <h5>
                                    Advanced settings. Only use unless you know what you are doing.
                                </h5>
                                <hr />
                                <Button variant="danger">
                                    Rename
                                </Button>
                                <p>
                                    Renames cluster, maybe have serious consequences.
                                </p>
                                <hr />
                                <Button variant="danger">
                                    Leave
                                </Button>
                                <p>
                                    Leaves cluster. Optionally deleting all locally stored data associated with the cluster.
                                </p>
                                <hr />
                            </Tab>
                        </Tabs>

                    </Col>
                </Row>

            </Container>
        </div>;
    }
}
export default Manage;
