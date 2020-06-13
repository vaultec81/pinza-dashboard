import React from 'react';
import { Modal, Button } from 'react-bootstrap'
import utils from '../../main/utils'
import fs from 'fs'
import Path from 'path'
import os from 'os'
import { EventEmitter } from 'events';
import promiseIpc from 'electron-promise-ipc'

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
    static async startIpfs() {
        fs.writeFileSync(Path.join(os.tmpdir(), "ipfs.pid"), await utils.ipfs.run());
        await promiseIpc.send("pinza.start");
    }
    static async stopIpfs() {
        IpfsHelper.events.emit("ipfs.stopping")
        await promiseIpc.send("pinza.stop");
        process.kill(Number(fs.readFileSync(Path.join(os.tmpdir(), "ipfs.pid"))))
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
IpfsHelper.events = new EventEmitter();
export default IpfsHelper;