import React from "react";
import { Route, Switch } from "react-router-dom";
// reactstrap components
// import { Container } from "reactstrap";
// core components
// import AdminNavbar from "components/Navbars/AdminNavbar.jsx";
// import AdminFooter from "components/Footers/AdminFooter.jsx";
import Sidebar from "components/Sidebar/Sidebar.jsx";

// import routes from "routes.js";
import routes from "routes/routes.js";
import testPages from "routes/testPages.js";

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
        if (prop.layout === "/test") {
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
    for (let i = 0; i < routes.length; i++) {
      if (
        this.props.location.pathname.indexOf(
          routes[i].layout + routes[i].path
        ) !== -1
      ) {
        return routes[i].name;
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
          logo={{
            innerLink: "/admin/home",
            imgSrc: require("assets/img/icons/유니테크아이콘.ico"),
            imgAlt: "UNITECH"
          }}
        />
        <div className="main-content" ref="mainContent">
          {/* 상단 검색창 nav 
          <AdminNavbar
            {...this.props}
            brandText={this.getBrandText(this.props.location.pathname)}
          />
          */}

          {/* main content */}
          <Switch>{this.getRoutes(testPages)}</Switch>
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
