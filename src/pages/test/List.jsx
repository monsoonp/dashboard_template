import React, { useEffect, useState } from "react";

// reactstrap components
import {
  // Badge,
  Card,
  CardHeader,
  // CardFooter,
  // DropdownMenu,
  // DropdownItem,
  // UncontrolledDropdown,
  // DropdownToggle,
  // Media,
  // Pagination,
  // PaginationItem,
  // PaginationLink,
  // Progress,
  Table,
  Container,
  Row
  // UncontrolledTooltip
} from "reactstrap";
// core components
import Header from "components/Headers/Header.jsx";

const List = ({ socket }) => {
  const [list, setList] = useState(false);
  const [tcp, setTcp] = useState(false);
  const [deviceList, setDeviceList] = useState(false);

  const bindDevice = async () => {
    try {
      const response = await fetch(`/snmp/device`);
      const resJson = await response.json();
      if (resJson.toString() !== deviceList.toString()) {
        setDeviceList(resJson);
        console.log("device connection changed!", resJson);
      } else {
        // console.log("nothing changed");
      }
      // return resJson;
    } catch (error) {
      console.log(error);
    }
  };
  const bindTcp = async () => {
    try {
      const response = await fetch(`/snmp/tcp`);
      const resJson = await response.json();
      if (resJson.toString() !== tcp.toString()) {
        setTcp(resJson);
        console.log("tcp connection changed!", resJson);
      } else {
        // console.log("nothing changed");
      }
      // return resJson;
    } catch (error) {
      console.log(error);
    }
  };
  const tcpTypeChecker = e => {
    switch (e) {
      case 2:
      case 5:
      case 11:
        return <td className="bg-success">{e}</td>;
      default:
        return <td className="bg-danger">{e}</td>;
    }
    /*
closed(1),
listen(2),
synSent(3),
synReceived(4),
established(5),
finWait1(6),
finWait2(7),
closeWait(8),
lastAck(9),
closing(10),
timeWait(11),
deleteTCB(12)

    */
  };
  const ipTypeChecker = e => {
    switch (e) {
      case 1:
        return <td className="bg-warning">other(1)</td>;
      case 2:
        return <td className="bg-danger">invalid(2)</td>;
      case 3:
        return <td className="bg-info">dynamic(3)</td>;
      case 4:
        return <td className="bg-success">static(4)</td>;
      default:
        return <td className="bg-danger" />;
    }
  };
  const ifTypeChecker = e => {
    switch (e) {
      case 1:
        return <td className="bg-success">up(1)</td>;
      case 2:
        return <td className="bg-danger text-white">down(2)</td>;
      case 3:
        return <td className="bg-warning">testing(3)</td>;
      case 4:
        return <td className="bg-warning">unknown(4)</td>;
      case 5:
        return <td className="bg-info">dormant(5)</td>;
      case 6:
        return <td className="bg-danger text-white">notPresent(6)</td>;
      case 7:
        return <td className="bg-warning">lowerLayerDown(7)</td>;
      default:
        return <td className="bg-danger" />;
    }
  };
  useEffect(() => {
    bindDevice();
    bindTcp();

    /*
    if (deviceList.length === 0) {
    }
    */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket, list]);

  if (socket) {
    socket.on("localAddress", data => {
      setList(data);
    });
  }

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt-4 mb-4" fluid>
        {/* Table */}

        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="bg-gradient-warning border-0">
                <h3 className="mb-0">
                  TCP IP Address (tcp - 1.3.6.1.2.1.6.13)
                </h3>
              </CardHeader>
              <Table
                responsive
                className="align-items-center table-flush" // table-dark  / tag, size, bordered, borderless, strped, dark, hover, responsive
                striped
                hover
                size="sm"
              >
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Index</th>
                    <td>State</td>
                    <td>LocalPort</td>
                    <td>RemAddr</td>
                    <td>RemPort</td>
                  </tr>
                </thead>
                <tbody>
                  {tcp &&
                    tcp
                      .filter(
                        e => e[2] === "192.168.0.38" && e[4] !== "192.168.0.38"
                      )
                      .map((e, i) => (
                        <tr key={i}>
                          <th>{i}</th>
                          {tcpTypeChecker(e[1])}
                          <td>{e[3]}</td>
                          <td>{e[4]}</td>
                          <td>{e[5]}</td>
                        </tr>
                      ))}
                </tbody>
              </Table>
            </Card>
          </div>
        </Row>
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="bg-warning border-0">
                <h3 className="mb-0">
                  Local IP Address (ipNetToMedia - 1.3.6.1.2.1.4.22)
                </h3>
              </CardHeader>
              <Table
                responsive
                className="align-items-center table-flush"
                striped
                dark
                hover
                size="sm"
              >
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">Index</th>
                    <td>Key</td>
                    <td>PhysAddr</td>
                    <td>IP</td>
                    <td>Type</td>
                  </tr>
                </thead>
                <tbody>
                  {list &&
                    list.map((e, i) => (
                      <tr key={i}>
                        <th>{e.index}</th>
                        <td>{e.key.split(".")[0]}</td>
                        <td>{new Buffer(e.table[2])}</td>
                        <td>{e.table[3]}</td>

                        {ipTypeChecker(e.table[4])}
                      </tr>
                    ))}
                </tbody>
              </Table>
            </Card>
          </div>
        </Row>
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="bg-warning border-0">
                <h3 className="mb-0">
                  Device List (interface - 1.3.6.1.2.1.2.2)
                </h3>
              </CardHeader>
              <Table
                className="align-items-center table-flush" // table-dark  / tag, size, bordered, borderless, striped, dark, hover, responsive
                responsive
                bordered
                hover
                size="sm"
              >
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Index</th>
                    <td>Desc</td>
                    <td>Type</td>
                    <td>Mtu</td>
                    <td>Speed</td>
                    <td>PhysAddress</td>
                    <td>AdminStatus</td>
                    <td>OperStatus</td>
                  </tr>
                </thead>
                <tbody>
                  {deviceList &&
                    deviceList.map((e, i) => (
                      <tr key={i}>
                        <td>{e[1]}</td>
                        <td>{new Buffer(e[2].data).toString()}</td>
                        <td>{e[3]}</td>
                        <td>{e[4]}</td>
                        <td>{e[5]}</td>
                        <td>{new Buffer(e[6].data)}</td>
                        {e[7] === 1 ? (
                          <td className="bg-success">up(1)</td>
                        ) : (
                          <td className="bg-danger text-white">
                            {e[7] === 2 ? "up(2)" : "testing(3)"}
                          </td>
                        )}
                        {ifTypeChecker(e[8])}
                      </tr>
                    ))}
                  <tr>
                    <td></td>
                  </tr>
                </tbody>
              </Table>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default List;
