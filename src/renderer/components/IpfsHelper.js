import React from 'react';
import { Modal, Button } from 'react-bootstrap'
import utils from '../../main/utils'

class IpfsHelper extends React.Component {
    constructor(props) {
        super(props);

        this.installPrompt = React.createRef();
        this.state = {
            installPrompt: false
        }
        this.ipfsInfo = {};
        this.initializeIpfs = this.initializeIpfs.bind(this);
    }
    async componentDidMount() {
        this.ipfsInfo = await utils.ipfs.getIpfs();
        if(!this.ipfsInfo.exists) {
            this.setState({
                installPrompt: true
            })
        }
    }
    async initializeIpfs() {
        var ipfsInfo = await utils.ipfs.getIpfs();
        await utils.ipfs.init(ipfsInfo.ipfsPath);
        this.setState({
            installPrompt: false
        })
    }
    render() {
        return <div>
            <Modal
                show={this.state.installPrompt}
                backdrop="static"
                keyboard={false}
                onHide={() => this.setState({
                    installPrompt: false
                })}
                ref={this.installPrompt}>
                <Modal.Header closeButton>
                    <Modal.Title>Ipfs Repo Not Found</Modal.Title>
                </Modal.Header>
                    <Modal.Body>
                        We noticed you don't have an initialized, and running IPFS repo on your computer.
                        IPFS is a crucial component in Pinza, and won't work without it.
                        Would you like us to setup a IPFS repo on your computer? {__dirname}
                    </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => {
                        this.setState({
                            installPrompt: false
                        })
                    }}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={this.initializeIpfs}>Initialize</Button>
                </Modal.Footer>
            </Modal>
        </div>
    }
}
export default IpfsHelper;