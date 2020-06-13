import React from 'react';
import { Jumbotron, Container, Col, Row } from 'react-bootstrap';
import { shell } from 'electron'


class Home extends React.Component {
    render() {
        return <div>
            <Row>
                <Col>
                    <Jumbotron fluid>
                        <Container>
                            <h5>Welcome to pinza dashboard!</h5>

                            Pinza dashboard is a app designed for the purpose of making using pinza easy and accessible to everyone.
                            Read more about pinza on <a href="" target="_blank" onClick={(e) => {e.preventDefault(); shell.openExternal("https://github.com/vaultec81/js-pinza")}}>github</a>.
                            From this app you can do basic to more advanced operations.
                            This app provides plenty of controls and information for you to manage your storage cluster, or a remote 3rd party cluster.
                            Such as creating a cluster, stopping and starting ipfs daemon, modifying replication factor, add/removing access and more!
                            <hr/>
                            On the right side of this page you will see a general overview of all clusters belonging to this node.
                        </Container>
                    </Jumbotron>
                </Col>
                <Col>
                    <Jumbotron fluid>
                        <Container>
                            <h5>Overview</h5>
                        </Container>
                    </Jumbotron>
                </Col>
            </Row>
        </div>
    }
}
export default Home;