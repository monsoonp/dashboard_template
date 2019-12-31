// import Index from "views/Index.jsx";
// import Index from "pages/Index";
import TestContainer from "containers/TestContainer";
import Profile from "pages/test/Profile";
// import Maps from "views/examples/Maps.jsx";
// import Register from "pages/Register";
// import Login from "pages/Login";
import Tables from "pages/test/Tables";
import Tables2 from "pages/test/Tables2";
import Icons from "pages/test/Icons";
import Tree from "pages/test/Tree";
import Modals from "pages/test/Modals";
import DatePick from "pages/test/DatePick";
import Forms from "pages/test/Forms";
import Graphs from "pages/test/Graphs";

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
  },
  {
    path: "/tables2",
    name: "Tables2",
    icon: "ni ni-collection text-warning",
    component: Tables2,
    layout: "/test"
  },
  {
    path: "/tree",
    name: "Tree",
    icon: "ni ni-bullet-list-67 text-primary",
    component: Tree,
    layout: "/test"
  },
  {
    path: "/modal",
    name: "Modals",
    icon: "ni ni-ungroup text-danger",
    component: Modals,
    layout: "/test"
  },
  {
    path: "/date-picker",
    name: "DatePick",
    icon: "ni ni-calendar-grid-58 text-info",
    component: DatePick,
    layout: "/test"
  },
  {
    path: "/forms",
    name: "Forms",
    icon: "ni ni-archive-2 text-dark",
    component: Forms,
    layout: "/test"
  },
  {
    path: "/graphs",
    name: "Graphs",
    icon: "ni ni-chart-bar-32 text-warning",
    component: Graphs,
    layout: "/test"
  }
];
export default testPages;
