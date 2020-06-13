import React from 'react';
import { Table, Breadcrumb, Button, Container, Row, Col } from 'react-bootstrap'
import Manage from './Manage'
import {
    Route,
    Switch
} from 'react-router-dom'
import { AiOutlinePlus } from 'react-icons/ai'
import utils from '../../../main/utils'
import PrettyBytes from 'pretty-bytes'

class Clusters extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            clusters: null
        }
        this.breadcrumb = [];
        window.onhashchange = () => {
            this.generateBreadcrumb()
        }
    }
    componentDidMount() {
        this.generateBreadcrumb();
        this.generateClusterlist()
    }
    async generateClusterlist() {
        var { pinza } = await utils.getPinza()
        if(pinza) {
            const clusters = await pinza.listClusters();
            var out = [];

            if(clusters.length === 0) {
                out.push(<tr>
                    <td>ExampleCluster (Example only)</td>
                    <td>
                        <code>
                            /orbitdb/zdpuAyTBnYSugBZhqJuLsNpzjmAjSmxDqBbtAqXMtsvxiN2v3/MyCluster
                        </code>
                    </td>
                    <td>14</td>
                    <td>5 Gb</td>
                    <td>
                        <Button onClick={() => this.openManage("ExampleCluster")}>
                            Manage
                        </Button>
                    </td>
                </tr>)
            }
            for(var cluster of clusters) {
                var NumberOfPins = 0;
                var clusterSize = 0;
                try{
                    var clsterInstance = await pinza.cluster(cluster.name);
                    var pinls = await clsterInstance.pin.ls({size:true});
                    NumberOfPins = pinls.length;
                    for(var pin of pinls) {
                        clusterSize =+ pin.size;
                    }
                } catch {

                }
                const clusterName = cluster.name
                out.push(<tr key={clusterName}>
                    <td>{clusterName}</td>
                    <td><code>{cluster.address}</code></td>
                    <td><code>{NumberOfPins}</code></td>
                    <td><code>{PrettyBytes(clusterSize)}</code></td>
                    <td>
                        <Button onClick={() => this.openManage(clusterName)}>
                            Manage
                        </Button>
                    </td>
                </tr>);
            }
            this.setState({
                clusters: out
            })
        }
    }
    generateBreadcrumb() {
        this.breadcrumb = [];
        var path = [];
        {
            location.hash.replace("#", "").split("/").map((d, idx) => {
                if (d === "") {
                    return;
                }
                path.push(d);
                this.breadcrumb.push(<Breadcrumb.Item href={`#/${path.join("/")}`} key={idx}>{d}</Breadcrumb.Item>)
            })
        }
        this.forceUpdate()
    }
    openManage(name) {
        location.hash = `#/clusters/${name}`
    }
    createCluster() {

    }
    joinCluster() {

    }
    render() {
        return <div>
            <Breadcrumb>
                {this.breadcrumb}
            </Breadcrumb>
            
            <Switch>
                <Route path="/clusters" exact render={() =>
                    <React.Fragment>
                        <Container style={{border:"1px solid #cecece", borderBottom: "none"}}>
                            <Row>
                                <Col style={{textAlign:"right"}}>
                                    <Button style={{marginRight: "5px"}} variant="success" onClick={this.joinCluster}>
                                        <AiOutlinePlus/>
                                        Join 
                                    </Button>
                                    <Button variant="success" onClick={this.createCluster}>
                                        <AiOutlinePlus/>
                                        Create 
                                    </Button>
                                </Col>
                            </Row>
                        </Container>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Address</th>
                                    <th>Number of Pins</th>
                                    <th>Total stored</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.clusters
                                }
                            </tbody>
                        </Table>
                    </React.Fragment>
                }/>
                <Route path="/clusters/:name" component={Manage}/>
            </Switch>

        </div>
    }
}
export default Clusters;