import React from 'react';
import { Table, Breadcrumb, Button, Container, Row, Col } from 'react-bootstrap'
import Manage from './Manage'
import {
    Route,
    Switch
} from 'react-router-dom'
import { AiOutlinePlus } from 'react-icons/ai'

class Clusters extends React.Component {
    constructor(props) {
        super(props);

        this.breadcrumb = [];
        window.onhashchange = () => {
            this.generateBreadcrumb()
        }
    }
    componentDidMount() {
        this.generateBreadcrumb()
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
                                <tr>
                                    <td>MyCluster</td>
                                    <td>
                                        <code>
                                            /orbitdb/zdpuAyTBnYSugBZhqJuLsNpzjmAjSmxDqBbtAqXMtsvxiN2v3/MyCluster
                                        </code>
                                    </td>
                                    <td>14</td>
                                    <td>5 Gb</td>
                                    <td>
                                        <Button onClick={() => this.openManage("MyCluster")}>
                                            Manage
                                        </Button>
                                    </td>
                                </tr>
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