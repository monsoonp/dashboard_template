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

const Tables2 = ({ socket }) => {
  const [list, setList] = useState([]);
  const [deviceList, setDeviceList] = useState([]);

  const bindDevice = async () => {
    try {
      const response = await fetch(`/snmp/device`);
      const resJson = await response.json();
      setDeviceList(resJson);
      // return resJson;
    } catch (error) {
      console.log(error);
    }
  };

  const ipTypeChecker = e => {
    switch (e) {
      case 1:
        return <td class="bg-warning">other(1)</td>;
      case 2:
        return <td class="bg-danger">invalid(2)</td>;
      case 3:
        return <td class="bg-info">dynamic(3)</td>;
      case 4:
        return <td class="bg-success">static(4)</td>;
      default:
        return <td class="bg-danger" />;
    }
  };
  const ifTypeChecker = e => {
    switch (e) {
      case 1:
        return <td class="bg-success">up(1)</td>;
      case 2:
        return <td class="bg-danger text-white">down(2)</td>;
      case 3:
        return <td class="bg-warning">testing(3)</td>;
      case 4:
        return <td class="bg-warning">unknown(4)</td>;
      case 5:
        return <td class="bg-info">dormant(5)</td>;
      case 6:
        return <td class="bg-danger text-white">notPresent(6)</td>;
      case 7:
        return <td class="bg-warning">lowerLayerDown(7)</td>;
      default:
        return <td class="bg-danger" />;
    }
  };
  useEffect(() => {
    if (deviceList.length === 0) {
      bindDevice();
    }
  }, [socket, list, deviceList.length]);

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
                    <th scope="col">Desc</th>
                    <th scope="col">Type</th>
                    <th scope="col">Mtu</th>
                    <th scope="col">Speed</th>
                    <th scope="col">PhysAddress</th>
                    <th scope="col">AdminStatus</th>
                    <th scope="col">OperStatus</th>
                  </tr>
                </thead>
                <tbody>
                  {deviceList.map((e, i) => (
                    <tr key={i}>
                      <td>{e[1]}</td>
                      <td>{new Buffer(e[2].data).toString()}</td>
                      <td>{e[3]}</td>
                      <td>{e[4]}</td>
                      <td>{e[5]}</td>
                      <td>{new Buffer(e[6].data)}</td>
                      {e[7] === 1 ? (
                        <td class="bg-success">up(1)</td>
                      ) : (
                        <td class="bg-danger text-white">
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
                    <td>Addr</td>
                    <td>IP</td>
                    <td>Type</td>
                  </tr>
                </thead>
                <tbody>
                  {list.map((e, i) => (
                    <tr key={i}>
                      <th>{e.index}</th>
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

export default Tables2;
