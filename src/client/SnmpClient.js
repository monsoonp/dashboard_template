import React from "react";
import { Route, Switch } from "react-router-dom";
import Sidebar from "components/Sidebar/Sidebar.jsx";
import SnmpNavbar from "components/Navbars/SnmpNavbar.jsx";
// import AdminFooter from "components/Footers/AdminFooter.jsx";
import routes from "routes/routes.js";
import testPages from "routes/testPages";
import snmpPages from "routes/snmpPages";
import Header from "../components/Headers/Header";

class TestClient extends React.Component {
  componentDidUpdate(e) {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.mainContent.scrollTop = 0;
  }
  getRoutes = routes => {
    return routes
      .sort((a, b) => a - b)
      .map((prop, key) => {
        if (prop.layout === "/snmp") {
          return (
            <Route
              key={key}
              path={prop.layout + prop.path}
              // component={prop.component}
              render={props => <prop.component {...this.props} />}
            />
          );
        } else {
          return null;
        }
      });
  };
  getBrandText = path => {
    for (let i = 0; i < snmpPages.length; i++) {
      if (
        this.props.location.pathname.indexOf(
          snmpPages[i].layout + snmpPages[i].path
        ) !== -1
      ) {
        return snmpPages[i].name;
      }
    }
    return "Brand";
  };
  render() {
    return (
      <>
        <Sidebar
          {...this.props}
          routes={routes}
          testRoutes={testPages}
          snmpRoutes={snmpPages}
          logo={{
            innerLink: "/admin/home",
            imgSrc: require("assets/img/icons/유니테크아이콘.ico"),
            imgAlt: "UNITECH"
          }}
        />
        <div className="main-content" ref="mainContent">
          <SnmpNavbar
            {...this.props}
            brandText={this.getBrandText(this.props.location.pathname)}
          />

          {/* main content */}
          <Header />
          <Switch>{this.getRoutes(snmpPages)}</Switch>
          {/* Footer
          <Container fluid>
            <AdminFooter />
          </Container>
          */}
        </div>
      </>
    );
  }
}

export default TestClient;
