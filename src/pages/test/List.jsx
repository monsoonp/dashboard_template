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
  const [list, setList] = useState([]);
  const [deviceList, setDeviceList] = useState([]);

  const bindDevice = async () => {
    try {
      const response = await fetch(`/snmp/device`);
      const resJson = await response.json();
      if (resJson.toString() !== deviceList.toString()) {
        setDeviceList(resJson);
        console.log("device connection changed!");
      } else {
        console.log("nothing changed");
      }
      // return resJson;
    } catch (error) {
      console.log(error);
    }
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
              <CardHeader className="bg-warning border-0">
                <h3 className="mb-0">Device List</h3>
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
                  {deviceList.length !== 0 &&
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

        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="bg-warning border-0">
                <h3 className="mb-0">Local IP Address</h3>
              </CardHeader>
              <Table
                responsive
                className="align-items-center table-flush" // table-dark  / tag, size, bordered, borderless, strped, dark, hover, responsive
                striped
                dark
                hover
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
                  {list.length !== 0 &&
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
      </Container>
    </>
  );
};

export default List;
