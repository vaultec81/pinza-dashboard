import React from 'react';
import Sidebar from './components/Sidebar';
import IpfsHelper from './components/IpfsHelper';
import { Navbar, NavDropdown, Nav, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  HashRouter
} from "react-router-dom";
import views from './views'
import Popup from 'react-popup';
import './assets/popup.css'


export class App extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {};

  }
  render() {
    return (
      <div>
        <Sidebar/>
        <Container style={{marginLeft: "64px", padding: "15px 20px 0px"}}>
          <HashRouter>
            <Switch>
              <Route path="/clusters">
                <views.clusters />
              </Route>
              <Route path="/pins">
                <views.pins />
              </Route>
              <Route path="/settings">
                <views.settings />
              </Route>
              <Route path="/home">
                <views.home />
              </Route>
            </Switch>
          </HashRouter>
        </Container>
        <IpfsHelper/>
        <Popup/>
      </div>
    );
  }
}