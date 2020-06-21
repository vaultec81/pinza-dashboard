import React from 'react';
import { Modal, Form, FormControl, Button } from 'react-bootstrap';
import Utils from '../../main/utils';
import Popup from 'react-popup';

class ClusterCreate extends React.Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this)
    }
    async handleSubmit(e) {
        var obj = Utils.formToObj(new FormData(e.target));
        e.preventDefault()
        var { pinza } = await Utils.getPinza()
        try {
            await pinza.createCluster(obj.name)
        } catch(err) {
            Popup.alert(err.message)
        }
        this.props.onHide();
    }
    render() {
        return <Modal show={true} backdrop="static"
        keyboard={false} onHide={this.props.onHide}>
            <Form onSubmit={this.handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>Create Create</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                        <h5>
                            Cluster Name
                        </h5>
                        <FormControl
                            placeholder="Name"
                            aria-label="name"
                            name="name"
                            required/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.onHide}>
                        Close
                    </Button>
                    <Button variant="primary" type="submit">Create</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    }
}
export default ClusterCreate;