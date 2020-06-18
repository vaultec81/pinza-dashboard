import React from 'react'
import { Table, Row, Container, Form, Col, Button, Modal } from 'react-bootstrap'
import { AiOutlinePlus } from 'react-icons/ai'
import utils from '../../main/utils'
import PrettyBytes from 'pretty-bytes'
import Popup from 'react-popup';
import PinAdd from '../components/PinAdd'


class Pins extends React.Component {
    constructor(props) {
        super(props);

        this.state = { clusters: [], currentCluster: null, pinlist: [], 
            styles: {
                selector: {
                    display: 'none'
                }
            }
        };
        this.selectCluster = this.selectCluster.bind(this);
        this.pinAddPrompt = this.pinAddPrompt.bind(this)
        this.selection = {};
    }
    componentDidMount() {
        this.generateInfo();
    }
    async generateInfo() {
        const { pinza } = await utils.getPinza();
        if (pinza) {
            var names = [];
            var clusters = await pinza.listClusters();
            for (const cluster of clusters) {
                const clusterName = cluster.name
                if (!this.state.currentCluster) {
                    this.setState({
                        currentCluster: clusterName
                    })
                }
                names.push(<option key={clusterName}>
                    {clusterName}
                </option>);
            }
            this.setState({
                names
            })
            this.calculatePinls()
        }
    }
    selectCluster(e) {
        this.setState({
            currentCluster: e.target.value
        })
        this.calculatePinls()
    }
    selectPin(pin) {
        if(this.selection[pin]) {
            delete this.selection[pin];
        } else {
            this.selection[pin] = {};
        }
    }
    async calculatePinls() {
        const { pinza } = await utils.getPinza();
        if (pinza) {
            var out = [];
            var cluster = await pinza.cluster(this.state.currentCluster);
            for (const pin of await cluster.pin.ls({ size: true })) {
                out.push(<tr key={pin.cid}>
                    <td style={this.state.styles.selector}>
                        <select onClick={this.selectPin(pin.cid)}/>
                    </td>
                    <td>
                        {pin.cid}
                    </td>
                    <td>
                        <code>{JSON.stringify(pin.meta)}</code>
                    </td>
                    <td>
                        {PrettyBytes(pin.size)}
                    </td>
                </tr>);
            }
            this.setState({
                pinlist: out
            })
        }
    }
    pinAddPrompt() {
        var This = this;
        /** Prompt plugin */
        Popup.registerPlugin('prompt', function (targetCluster) {
            this.create({
                title: '',
                content: <Modal show={true} backdrop="static"
                keyboard={false} onHide={() => {Popup.close()}}> 
                    <PinAdd targetCluster={targetCluster} onHide={() => {
                        Popup.close();
                        This.calculatePinls()
                        }}/>
                </Modal>
            });
        });
        Popup.plugins().prompt(this.state.currentCluster);
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
                            <Form.Control className="my-1 mr-sm-2" sronly as="select" onChange={this.selectCluster}>
                                {
                                    this.state.names
                                }
                            </Form.Control>
                        </Form>
                    </Col>
                    <Col>
                        <Button onClick={() => this.pinAddPrompt()} style={{ float: "right" }} variant="success">
                            <AiOutlinePlus />
                            Add
                        </Button>
                    </Col>
                </Row>
            </Container>
            <Table compact={true}>
                <thead>
                    <tr>
                        <th style={this.state.styles.selector}>Select</th>
                        <th>CID</th>
                        <th>Meta</th>
                        <th>Size</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.pinlist}
                </tbody>
            </Table>
        </div>
    }
}
export default Pins;