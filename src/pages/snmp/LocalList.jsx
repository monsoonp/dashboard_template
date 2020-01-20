import React, { useEffect, useState } from "react";
// import _ from "lodash";
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

// import Header from "components/Headers/Header.jsx";

// SNMP(net-snmp) test List
const LocalList = ({ socket }) => {
  const [list, setList] = useState(false);

  const ipTypeChecker = e => {
    switch (e) {
      case 1:
        return <td className="bg-warning text-secondary">other(1)</td>;
      case 2:
        return <td className="bg-danger text-secondary">invalid(2)</td>;
      case 3:
        return <td className="bg-info text-secondary">dynamic(3)</td>;
      case 4:
        return <td className="bg-success text-secondary">static(4)</td>;
      default:
        return <td className="bg-danger text-secondary" />;
    }
    /*
    other(1), -- none of the following
    invalid(2), -- an invalidated mapping
    dynamic(3),
    static(4)
    */
  };

  useEffect(() => {
    if (socket) {
      socket.on("localAddress", data => {
        setList(data);
      });
    }
    return () => {
      if (socket) {
        socket.off("localAddress");
      }
    };
  }, [socket, list]);

  return (
    <>
      {/*<Header />*/}
      {/* Page content */}
      <Container className="mt-4 mb-4" fluid>
        {/* Table */}
        {/* local ip list in network */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="bg-gradient-primary border-0">
                <h3 className="mb-0 text-secondary">
                  Local IP Address (ipNetToMedia - 1.3.6.1.2.1.4.22)
                </h3>
              </CardHeader>
              <Table
                responsive
                className="align-items-center table-flush"
                striped
                hover
                size="sm"
              >
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Index</th>
                    <td>Key</td>
                    {/*<td>PhysAddr</td>*/}
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
                        {/*<td>{new Buffer(e.table[2])}</td>*/}
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

export default LocalList;
