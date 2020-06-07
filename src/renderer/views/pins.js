import React from 'react'
import { Table, Row, Container, Form, Col, Button } from 'react-bootstrap'
import { AiOutlinePlus } from 'react-icons/ai'

class Pins extends React.Component {
    componentDidMount() {

    }
    selectCluster(e) {

    }
    render() {
        return <div>
            <Container>
                <Row>
                    <Col>
                        <Form inline>
                            <Form.Label className="my-1 mr-2">
                                Cluster: 
                            </Form.Label>
                            <Form.Control className="my-1 mr-sm-2" srOnly as="select" onChange={this.selectCluster}>
                                {
                                    //Generate options dynamically here
                                }
                                <option>
                                    MyCluster
                                </option>
                            </Form.Control>
                            
                        </Form>
                    </Col>
                    <Col>
                        <Button style={{float:"right"}} variant="success">
                            <AiOutlinePlus/> 
                            Add
                        </Button>
                    </Col>
                </Row>
            </Container>
            <Table compact>
                <thead>
                    <tr>
                        <th>CID</th>
                        <th>Meta</th>
                        <th>Size</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            Qmc9bfk2r3Fpgza7CaLLTCLHezTErenEG6EA2dQH24D5th
                        </td>
                        <td>
                            <code>
                                {JSON.stringify({})}
                            </code>
                        </td>
                        <td>
                            5 B
                        </td>
                    </tr>
                </tbody>
            </Table>
        </div>
    }
}
export default Pins;