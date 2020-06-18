import React from 'react';
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import { Container, Button } from 'react-bootstrap'
import { BsFillHouseDoorFill, BsFillGearFill } from 'react-icons/bs'
import { AiOutlineCluster } from 'react-icons/ai'
import { GiPin } from 'react-icons/gi'

class Sidebar extends React.PureComponent {
    render() {
        let selectedEventKey;
        var firstPath = location.hash.split("/")[1]
        if(firstPath) {
            selectedEventKey = firstPath
        } else {
            selectedEventKey = "home"
        }
        return (
            <Container>
                <SideNav style={{background:"indigo"}}
                    onSelect={(selected) => {
                        // Add your code here
                        location.hash = selected
                    }}>
                    <SideNav.Toggle />
                    <SideNav.Nav defaultSelected={selectedEventKey}>
                        <NavItem eventKey="home">
                            <NavIcon>
                                <BsFillHouseDoorFill style={{fontSize:"1.75em"}}/>
                            </NavIcon>
                            <NavText>
                                Home
                            </NavText>
                        </NavItem>
                        <NavItem eventKey="clusters">
                            <NavIcon>
                                <AiOutlineCluster style={{fontSize:"1.75em", fill:"white"}}/>
                            </NavIcon>
                            <NavText>
                                Clusters
                            </NavText>
                        </NavItem>
                        <NavItem eventKey="pins">
                            <NavIcon>
                                <GiPin style={{fontSize:"1.75em", fill:"white"}}/>
                            </NavIcon>
                            <NavText>
                                Pins
                            </NavText>
                        </NavItem>
                        <NavItem eventKey="settings">
                            <NavIcon>
                                <BsFillGearFill style={{fontSize:"1.75em"}}/>
                            </NavIcon>
                            <NavText>
                                Settings
                            </NavText>
                        </NavItem>
                    </SideNav.Nav>
                </SideNav>
            </Container>
        );
    }
}
export default Sidebar