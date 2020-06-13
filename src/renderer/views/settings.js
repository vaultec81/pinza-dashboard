import React from 'react';
import { Card, InputGroup, Form, FormControl, Button, Container, Col, Row } from 'react-bootstrap'
import utils from '../../main/utils'
import IpfsHelper from '../components/IpfsHelper'

class Settings extends React.Component {
    constructor(props) {
        super(props);

        this.calculateState = this.calculateState.bind(this)
        this.ipfsForm = React.createRef();
        this.state = {ipfs: {}};
    }
    async calculateState() {
        this.setState({
            ipfs: await utils.ipfs.getIpfs()
        })
    }
    async componentDidMount() {
        this.calculateState()
    }
    render() {
        return <div>
            <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>IPFS</Card.Title>
                    <hr />
                    <Form>
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text>apiAddr</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl name="ipfs.apiAddr" placeholder="" />
                        </InputGroup>
                        <hr />
                        <h5>
                            Daemon
                        </h5>
                        <InputGroup>
                            <InputGroup.Text>
                                Autostart
                                </InputGroup.Text>
                            <InputGroup.Checkbox name="ipfs.autoStart" type="checkbox" />
                        </InputGroup>
                        <Container>
                            <Row>
                                <h6> Status:  {(() => {
                                    if(this.state.ipfs.ipfs) {
                                        return <span style={{ color: "green" }}>Running</span>
                                    } else {
                                        return <span style={{ color: "red" }}>Stopped</span>
                                    }
                                })()}
                            </h6>
                            </Row>
                            <Row>
                                <Col>
                                    <Button variant="success" disabled={(() => {
                                        if(this.state.ipfs.ipfs) {
                                            return true;
                                        }
                                        return false;
                                    })()} onClick={async() => {
                                        await IpfsHelper.startIpfs()
                                        //Wait a little bit as starting ipfs can take time.
                                        setTimeout(this.calculateState, 1000); 
                                        }}>
                                        Start
                                    </Button>
                                </Col>
                                <Col>
                                    <Button variant="danger" disabled={(() => {
                                        if(this.state.ipfs.ipfs) {
                                            return false;
                                        }
                                        return true;
                                    })()} onClick={async() => {
                                        await IpfsHelper.stopIpfs()
                                        this.calculateState()
                                        }}>
                                        Stop
                                    </Button>
                                </Col>
                                <strong>
                                    Warning: stopping ipfs will stop the pinza daemon.
                                </strong>
                            </Row>
                        </Container>

                        <hr />
                        <Button type="submit">
                            Save
                            </Button>
                    </Form>

                </Card.Body>
            </Card>
        </div>
    }
}
export default Settings;