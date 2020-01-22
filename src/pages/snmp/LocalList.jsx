import React, { useEffect, useState } from "react";
import _ from "lodash";
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
      case 2:
        return <td className="bg-danger text-white">invalid(2)</td>;
      case 3:
        return <td className="bg-info text-white">dynamic(3)</td>;
      case 4:
        return <td className="bg-success text-white">static(4)</td>;
      default:
        return <td className="bg-warning text-white">other(1)</td>;
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
      try {
        socket.on("localAddress", data => {
          if (data && list && data.toString() !== list.toString()) {
            console.log(
              `local ip address insertion, deletion list`,
              _.differenceWith(data, list, _.isEqual),
              _.differenceWith(list, data, _.isEqual)
            );
          }
          setList(data);
        });
      } catch (err) {
        alert(err);
      }
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
              <CardHeader className="bg-gradient-info border-0">
                <h3 className="mb-0 text-white">
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
                <thead className="thead-light font-weight-bold">
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
