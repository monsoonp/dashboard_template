// import Index from "views/Index.jsx";
// import Index from "pages/Index";
import TestContainer from "containers/TestContainer";
import Profile from "pages/test/Profile";
// import Maps from "views/examples/Maps.jsx";
// import Register from "pages/Register";
// import Login from "pages/Login";
import Tables from "pages/test/Tables";
import Icons from "pages/test/Icons";

// Test Pages 여러가지 화면 만들어보기
//

// primary, secondary, success, danger, warning, info , light, dark, muted, white
var testPages = [
  {
    path: "/home",
    name: "Dashboard",
    icon: "ni ni-ui-04 text-success",
    // component: Index,
    component: TestContainer,
    layout: "/test"
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "ni ni-world text-muted",
    component: Icons,
    layout: "/test"
  },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "ni ni-user-run text-dark",
    component: Profile,
    layout: "/test"
  },
  {
    path: "/tables",
    name: "Tables",
    icon: "ni ni-collection text-warning",
    component: Tables,
    layout: "/test"
  }
];
export default testPages;
