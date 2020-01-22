/*!

=========================================================
* Argon Dashboard React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
/*eslint-disable*/
import React from "react";
import { NavLink as NavLinkRRD, Link } from "react-router-dom";
// nodejs library to set properties for components
import { PropTypes } from "prop-types";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Collapse,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Media,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,
  UncontrolledCollapse
} from "reactstrap";
import { ArrowUnsorted } from "styled-icons/typicons";
// var ps;

class Sidebar extends React.Component {
  state = {
    collapseOpen: false,
    homeToggle: this.props.location.pathname.includes("admin"),
    testToggle: this.props.location.pathname.includes("test"),
    snmpToggle: this.props.location.pathname.includes("snmp")
  };
  componentDidMount() {
    console.log();
  }
  // verifies if routeName is the one active (in browser input)
  activeRoute = routeName => {
    return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };
  // toggles collapse between opened and closed (true/false)
  toggleCollapse = () => {
    this.setState({
      collapseOpen: !this.state.collapseOpen
    });
  };
  // closes the collapse
  closeCollapse = () => {
    this.setState({
      collapseOpen: false
    });
  };

  // creates the links that appear in the left menu / Sidebar
  // NavItem - tag, active / NavLink - disabled, active, tag, innerRef
  createLinks = routes => {
    return routes
      .sort((a, b) => a - b)
      .map((prop, key) => {
        return (
          <NavItem key={key}>
            <NavLink
              to={prop.layout + prop.path}
              tag={NavLinkRRD}
              // onClick={this.closeCollapse}
              activeClassName="active bg-gradient-secondary text-info"
            >
              <i
                className={
                  prop.icon +
                  `${
                    location.pathname.startsWith(prop.layout + prop.path)
                      ? ""
                      : " text-muted"
                  }`
                }
              />
              {prop.name}
            </NavLink>
          </NavItem>
        );
      });
  };
  menuToggle = menu => {
    this.setState({ [menu]: !this.state[menu] });
  };

  render() {
    // console.log(this.props.location, this.props.history);
    const { bgColor, routes, testRoutes, snmpRoutes, logo } = this.props;
    let navbarBrandProps;
    if (logo && logo.innerLink) {
      navbarBrandProps = {
        to: logo.innerLink,
        tag: Link
      };
    } else if (logo && logo.outterLink) {
      navbarBrandProps = {
        href: logo.outterLink,
        target: "_blank"
      };
    }
    return (
      <Navbar
        className="navbar-vertical fixed-left navbar-light bg-white"
        expand="md"
        id="sidenav-main"
      >
        <Container fluid>
          {/* Toggler */}
          <button
            className="navbar-toggler"
            type="button"
            onClick={this.toggleCollapse}
          >
            <span className="navbar-toggler-icon" />
          </button>
          {/* Brand */}

          {/* 웹화면 로고 */}
          {logo ? (
            <NavbarBrand className="pt-0" {...navbarBrandProps}>
              <img
                alt={logo.imgAlt}
                className="navbar-brand-img"
                src={logo.imgSrc}
              />
              <h2 style={{ textAlign: "center" }}>UNITECH</h2>
            </NavbarBrand>
          ) : null}
          {/* User */}
          <Nav className="align-items-center d-md-none">
            <UncontrolledDropdown nav>
              <DropdownToggle nav className="nav-link-icon">
                <i className="ni ni-bell-55" />
              </DropdownToggle>
              <DropdownMenu
                aria-labelledby="navbar-default_dropdown_1"
                className="dropdown-menu-arrow"
                right
              >
                <DropdownItem>Action</DropdownItem>
                <DropdownItem>Another action</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Something else here</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            {/*
            <UncontrolledDropdown nav>
               
              <DropdownToggle nav>
                <Media className="align-items-center">
                  <span className="avatar avatar-sm rounded-circle">
                    <img
                      alt="..."
                      src={require("assets/img/theme/team-1-800x800.jpg")}
                    />
                  </span>
                </Media>
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-arrow" right>
                <DropdownItem className="noti-title" header tag="div">
                  <h6 className="text-overflow m-0">Welcome!</h6>
                </DropdownItem>
                <DropdownItem to="/admin/user-profile" tag={Link}>
                  <i className="ni ni-single-02" />
                  <span>Profile</span>
                </DropdownItem>
                <DropdownItem to="/admin/user-profile" tag={Link}>
                  <i className="ni ni-settings-gear-65" />
                  <span>Settings</span>
                </DropdownItem>
                <DropdownItem to="/admin/user-profile" tag={Link}>
                  <i className="ni ni-calendar-grid-58" />
                  <span>Activity</span>
                </DropdownItem>
                <DropdownItem to="/admin/user-profile" tag={Link}>
                  <i className="ni ni-support-16" />
                  <span>Support</span>
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem href="#pablo" onClick={e => e.preventDefault()}>
                  <i className="ni ni-user-run" />
                  <span>Logout</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            */}
          </Nav>
          {/* Collapse 토글 닫힘 메뉴(모바일 화면) */}
          <Collapse navbar isOpen={this.state.collapseOpen}>
            {/* Collapse header */}
            <div className="navbar-collapse-header d-md-none">
              <Row>
                {logo ? (
                  <Col className="collapse-brand" xs="6">
                    {logo.innerLink ? (
                      <Link to={logo.innerLink}>
                        <img alt={logo.imgAlt} src={logo.imgSrc} />
                      </Link>
                    ) : (
                      <a href={logo.outterLink}>
                        <img alt={logo.imgAlt} src={logo.imgSrc} />
                      </a>
                    )}
                    <a
                      style={{
                        fontSize: 18,
                        fontWeight: "bold",
                        textAlign: "center"
                      }}
                    >
                      UNITECH
                    </a>
                  </Col>
                ) : null}
                <Col className="collapse-close" xs="6">
                  {/* 닫힘 토글버튼 */}
                  <button
                    className="navbar-toggler"
                    type="button"
                    onClick={this.toggleCollapse}
                  >
                    <span />
                    <span />
                  </button>
                </Col>
              </Row>
            </div>
            {/* Form */}
            <Form className="mt-4 mb-3 d-md-none">
              <InputGroup className="input-group-rounded input-group-merge">
                <Input
                  aria-label="Search"
                  className="form-control-rounded form-control-prepended"
                  placeholder="Search Content."
                  type="search"
                />
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <span className="fa fa-search" />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </Form>
            {/* Divider */}
            <hr className="mt--5 mb-2" />
            <h5
              className="navbar-heading text-muted my-0"
              onClick={() => this.menuToggle("homeToggle")}
            >
              Home
              {!this.state.homeToggle && (
                <ArrowUnsorted size="15" color="#afafaf" />
              )}
            </h5>
            {/* Navigation list */}
            <Collapse isOpen={this.state.homeToggle}>
              <Nav navbar>{this.createLinks(routes)}</Nav>
              {/* vertical, navbar, pills, tabs, card, justified, fill, horizontal, tag */}
            </Collapse>

            {/* Divider - testPages */}
            <hr className="mt-2 mb-2" />
            <h5
              className="navbar-heading text-muted my-0"
              onClick={() => this.menuToggle("testToggle")}
            >
              Test
              {!this.state.testToggle && (
                <ArrowUnsorted size="15" color="#afafaf" />
              )}
            </h5>
            {/* Navigation list */}
            <Collapse isOpen={this.state.testToggle}>
              <Nav navbar>{this.createLinks(testRoutes)}</Nav>
              {/* vertical, navbar, pills, tabs, card, justified, fill, horizontal, tag */}
            </Collapse>

            {/* Divider - snmpPages */}
            <hr className="mt-2 mb-2" />
            <h5
              className="navbar-heading text-muted my-0"
              onClick={() => this.menuToggle("snmpToggle")}
            >
              SNMP
              {!this.state.snmpToggle && (
                <ArrowUnsorted size="15" color="#afafaf" />
              )}
            </h5>
            {/* Navigation list */}
            <Collapse isOpen={this.state.snmpToggle}>
              <Nav navbar>{this.createLinks(snmpRoutes)}</Nav>
            </Collapse>

            {/* Divider */}
            <hr className="my-2" />
            {/* Heading */}
            <h5 className="navbar-heading text-muted">네트워크 패킷</h5>
            <h5 className="navbar-heading text-muted">유효성 검사</h5>
            <h5 className="navbar-heading text-muted">GOOSE</h5>
            <h5 className="navbar-heading text-muted">MMS</h5>
            <h5 className="navbar-heading text-muted">Option</h5>

            {/* Navigation */}
            <hr className="my-0" />
            <Nav className="mb-md-3" navbar>
              <NavItem>
                <NavLink href="https://github.com/monsoonp/dashboard_template">
                  <i className="ni ni-spaceship" />
                  Getting started
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://demos.creative-tim.com/argon-dashboard-react/#/documentation/quick-start">
                  <i className="ni ni-palette" />
                  Documentation
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://demos.creative-tim.com/argon-dashboard-react/">
                  <i className="ni ni-ui-04" />
                  preview
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    );
  }
}

Sidebar.defaultProps = {
  routes: [{}]
};

Sidebar.propTypes = {
  // links that will be displayed inside the component
  routes: PropTypes.arrayOf(PropTypes.object),
  logo: PropTypes.shape({
    // innerLink is for links that will direct the user within the app
    // it will be rendered as <Link to="...">...</Link> tag
    innerLink: PropTypes.string,
    // outterLink is for links that will direct the user outside the app
    // it will be rendered as simple <a href="...">...</a> tag
    outterLink: PropTypes.string,
    // the image src of the logo
    imgSrc: PropTypes.string.isRequired,
    // the alt for the img
    imgAlt: PropTypes.string.isRequired
  })
};

export default Sidebar;
