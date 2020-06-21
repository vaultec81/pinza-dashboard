import React from 'react';
import { Modal, Form, FormControl, Button } from 'react-bootstrap';
import Utils from '../../main/utils';
import Popup from 'react-popup';


class ClusterJoin extends React.Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this)
    }
    async handleSubmit(e) {
        e.persist()
        e.preventDefault()
        var obj = Utils.formToObj(new FormData(e.target));
        var { pinza } = await Utils.getPinza()
        try {
            await pinza.joinCluster(obj.name, obj.address.replace(" ", ""))
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
                    <Modal.Title>Cluster Create</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                        <h5>
                            Name
                        </h5>
                        <FormControl
                            placeholder="Name"
                            aria-label="name"
                            name="name"
                            required/>
                        <h5>
                            Address
                        </h5>
                        <FormControl
                            placeholder="Address"
                            aria-label="address"
                            name="address"
                            required/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.onHide}>
                        Close
                    </Button>
                    <Button variant="primary" type="submit">Join</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    }
}
export default ClusterJoin;