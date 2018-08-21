import React, { Component } from 'react';
import {   
Collapse,
Navbar,
NavbarToggler,
NavbarBrand,
Nav,
NavItem,
NavLink,
UncontrolledDropdown,
DropdownToggle,
DropdownMenu,
DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { API } from '../services/api';

export default class TopBar extends Component {
	constructor(props) {
		super(props);

	}

	logout() {
		localStorage.removeItem('ntkr.tkn');
		window.reload();
	}

	render() {
		return (
			<div className="topbar">
				<Navbar color="light" light expand="md">
					<NavbarBrand href="/">NoTaker</NavbarBrand>
					 <Collapse isOpen={true} navbar>
					<Nav className="ml-auto" navbar>
					<NavItem>
						<NavLink className="logout" href="/" onClick={this.logout}>Log Out</NavLink>
					</NavItem>	
					</Nav>	
					</Collapse>          
				</Navbar>
			</div>
		)
	}
}