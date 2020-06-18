import React from 'react';
import { Modal, Form, FormControl, Button } from 'react-bootstrap';
import utils from '../../main/utils';
import { JsonEditor as Editor } from 'jsoneditor-react';
import 'jsoneditor-react/es/editor.min.css';
import CID from 'cids';
import ace from 'brace';
import 'brace/mode/json';
import 'brace/theme/dreamweaver';
import Popup from 'react-popup'

class PinAdd extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            formErrors: {},
            noError: true,
            meta: {}
        }
        this.handleUserInput = this.handleUserInput.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleMetaChange = this.handleMetaChange.bind(this)
    }
    validateField(name, value) {
        let fieldValidationErrors = this.state.formErrors;
        switch(name) {
            case "cid": {
                try {
                    new CID(value);
                    fieldValidationErrors.cid = null;
                } catch {
                    fieldValidationErrors.cid = "Cid is invalid"
                }
            }
            default: {

            }
        }
        let noError = true;
        for(var error of Object.values(fieldValidationErrors)) {
            if(error !== null) {
                noError = false;
            }
        }
        this.setState({formErrors:fieldValidationErrors, noError})
    }
    handleUserInput(e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value },
            () => { this.validateField(name, value) });
    }
    async handleSubmit(e) {
        e.preventDefault()
        var formData = new FormData(e.target);
        let obj = utils.formToObj(formData) 
        
        var { pinza } = await utils.getPinza();
        var cluster = await pinza.cluster(this.props.targetCluster);
        try {
            await cluster.pin.add(obj.cid, this.state.meta)
        } catch(err) {
            Popup.alert(err.message)
        }
        
        this.props.onHide();
    }
    handleMetaChange(e) {
        this.setState({
            meta: e
        })
    }
    render() {
        return <div>
            <Form onSubmit={this.handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>Pin Add</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5>
                        Cid
                    </h5>
                    <FormControl
                        placeholder="Cid"
                        aria-label="Cid"
                        aria-describedby="basic-addon1"
                        onChange={(e) => {this.handleUserInput(e)}}
                        name="cid"
                        required
                    />
                    <p style={{color:"red"}}>
                        {this.state.formErrors.cid}
                    </p>
                    <hr />
                    <h5>
                        Meta
                    </h5>
                    <Editor ace={ace} theme="ace/theme/github" mode="code" onChange={this.handleMetaChange} value={this.state.meta}>

                    </Editor>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.onHide}>
                        Close
                    </Button>
                    <Button variant="primary" disabled={!this.state.noError} type="submit">Add</Button>
                </Modal.Footer>
            </Form>
        </div>
    }
}
export default PinAdd;