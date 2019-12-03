// import Index from "views/Index.jsx";
// import Index from "pages/Index";
import HomeContainer from "containers/HomeContainer";
import Profile from "pages/Profile";
// import Maps from "views/examples/Maps.jsx";
import Register from "pages/Register";
import Login from "pages/Login";
import Tables from "pages/Tables";
import Icons from "pages/Icons";

// Test Pages 여러가지 화면 만들어보기
//
var testPages = [
  {
    path: "/home",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    // component: Index,
    component: HomeContainer,
    layout: "/admin"
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "ni ni-planet text-blue",
    component: Icons,
    layout: "/admin"
  },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "ni ni-single-02 text-yellow",
    component: Profile,
    layout: "/admin"
  },
  {
    path: "/tables",
    name: "Tables",
    icon: "ni ni-bullet-list-67 text-red",
    component: Tables,
    layout: "/admin"
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-single-02 text-info",
    component: Login,
    layout: "/auth"
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: Register,
    layout: "/auth"
  }
];
export default testPages;
