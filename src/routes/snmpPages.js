// import TestContainer from "containers/TestContainer";
import LocalList from "pages/snmp/LocalList";
import DeviceList from "pages/snmp/DeviceList";
import TcpList from "pages/snmp/TcpList";

// Test Pages 여러가지 화면 만들어보기
//

// primary, secondary, success, danger, warning, info , light, dark, muted, white
let snmpPages = [
  {
    path: "/local",
    name: "Local Ip Address",
    icon: "ni ni-world text-primary",
    component: LocalList,
    layout: "/snmp"
  },
  {
    path: "/deice",
    name: "Device",
    icon: "ni ni-laptop text-info",
    component: DeviceList,
    layout: "/snmp"
  },
  {
    path: "/tcp",
    name: "Tcp List",
    icon: "ni ni-curved-next text-info",
    component: TcpList,
    layout: "/snmp"
  }
];
export default snmpPages;
