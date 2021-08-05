import React, {Component } from "react";
import { NavLink } from "react-router-dom";
import {
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBuilding,
  faHome,
  faObjectGroup,
  faQuestion,
  faUser,
  faUsers,
  faBars,
} from "@fortawesome/free-solid-svg-icons";

const nav_space = {
  display: "block",
  padding: "8px 16px",
  color: "rgba(0,0,0,.55)",
};

const toggler = {
  backgroundColor: "white",
  border: "1px solid rgba(0,0,0,.1)",
  color: "rgba(0,0,0,.55)",
};

const nav_toggler = {
  display: "block",
  margin: "0",
  padding: "0",
};

class NavHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      others_type: [],
    };
    this.toggle = this.toggle.bind(this);
  }
  toggle() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  getOthersType() {
    fetch(process.env.REACT_APP_API+"/api/otherstype")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ others_type: data });
      });
  }

  componentDidMount() {
    this.getOthersType();
  }

  render() {
    return (
      <Navbar color='white' expand='md'>
        <NavbarBrand href='#'>
          <img
            src={"https://www.tuvsud.com/images/TS_TS_f_4c.png"}
            height='55'
            style={{ verticalAlign: "middle" }}
          />
        </NavbarBrand>
        <NavbarToggler onClick={this.toggle} bg-color='light' style={toggler}>
          <FontAwesomeIcon icon={faBars}></FontAwesomeIcon>
        </NavbarToggler>
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className='navbar-nav ml-auto mb-2 mb-lg-0' navbar>
            <NavItem>
              <NavLink
                exact
                to='/'
                activeClassName='nav_link--active'
                className='nav_link'
                style={nav_space}
                href='#'
              >
                <FontAwesomeIcon icon={faHome} />
                &nbsp;Dashboard
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                to='/admin/question'
                activeClassName='nav_link--active'
                className='nav_link'
                style={nav_space}
                href='#'
              >
                <FontAwesomeIcon icon={faQuestion} />
                &nbsp;Question
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                to='/admin/sdg_choice/create'
                className='nav_link'
                style={nav_space}
                href='#'
              >
                <FontAwesomeIcon icon={faObjectGroup} />
                &nbsp;User Questions Filter
              </NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav='rgba(0,0,0,.55)' caret>
                <FontAwesomeIcon icon={faBuilding} />
                &nbsp;
                <span style={{ color: "rgba(0,0,0,.55) !important" }}>
                  Companies
                </span>
              </DropdownToggle>
              <DropdownMenu>
                  <DropdownItem href="/admin/organizations/">All Companies</DropdownItem>
                  <DropdownItem href="/admin/suppliergroup/">Supplier Groups</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <NavItem>
              <NavLink
                to='/admin/users'
                className='nav_link'
                style={nav_space}
                href='#'
              >
                <FontAwesomeIcon icon={faUsers} />
                &nbsp;Users
              </NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav='rgba(0,0,0,.55)' caret>
                <FontAwesomeIcon icon={faUser} />
                &nbsp;
                <span style={{ color: "rgba(0,0,0,.55) !important" }}>
                  Others
                </span>
              </DropdownToggle>
              <DropdownMenu>
                {this.state.others_type.map((ot) => (
                  <DropdownItem
                    key={ot.id}
                    href={"/admin/others/list/" + ot.type_name}
                  >
                    {ot.type_name}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </UncontrolledDropdown>
            <NavItem>
              <a
                to='/admin/question'
                className='nav_link'
                style={nav_space}
                href='#'
              >
                <FontAwesomeIcon icon={faUser} />
                &nbsp;Your Name
              </a>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}

export default NavHeader;
