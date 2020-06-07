import React from 'react';
import { Card, InputGroup, Form, FormControl, Button } from 'react-bootstrap'

class Settings extends React.Component {
    render() {
        return <div>
            <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>IPFS</Card.Title>
                    <hr/>
                    <Card.Text>
                        <Form>
                            <Form.Label srOnly>
                                apiAddr
                            </Form.Label>
                            
                            <InputGroup>
                                <InputGroup.Prepend>
                                <InputGroup.Text>apiAddr</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl name="ipfs.apiAddr" placeholder="" />
                            </InputGroup>
                            <hr/>
                            <Button type="submit">
                               Save
                            </Button>
                        </Form>
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    }
}
export default Settings;