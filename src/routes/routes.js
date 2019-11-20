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
// import Index from "views/Index.jsx";
// import Index from "pages/Index";
import HomeContainer from "containers/HomeContainer";
import Profile from "pages/Profile";
// import Maps from "views/examples/Maps.jsx";
import Register from "pages/Register";
import Login from "pages/Login";
import Tables from "pages/Tables";
import Icons from "pages/Icons";

const path = `${process.env.PUBLIC_URL}`;
var routes = [
  {
    path: "/home",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    // component: Index,
    component: HomeContainer,
    layout: `${path}/admin`
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "ni ni-planet text-blue",
    component: Icons,
    layout: `${path}/admin`
  },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "ni ni-single-02 text-yellow",
    component: Profile,
    layout: `${path}/admin`
  },
  {
    path: "/tables",
    name: "Tables",
    icon: "ni ni-settings text-grey",
    component: Tables,
    layout: `${path}/admin`
  },
  {
    path: "/tables",
    name: "Tables",
    icon: "ni ni-bullet-list-67 text-red",
    component: Tables,
    layout: `${path}/admin`
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-single-02 text-info",
    component: Login,
    layout: `${path}/auth`
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: Register,
    layout: `${path}/auth`
  }
];
export default routes;
