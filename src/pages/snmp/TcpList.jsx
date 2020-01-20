/* eslint-disable no-fallthrough */
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

// SNMP(net-snmp) test List
const TcpList = () => {
  const [tcp, setTcp] = useState(false);
  const [tcpInsertList, setTcpInsertList] = useState(false);
  const [tcpDelList, setTcpDelList] = useState(false);

  const tcpTypeChecker = e => {
    let stat = "";
    switch (e) {
      case 1:
        stat = "closed";
        break;
      case 2:
        stat = "listen";
        break;
      case 3:
        stat = "synSent";
        break;
      case 4:
        stat = "synReceived";
        break;
      case 5:
        stat = "established";
        break;
      case 6:
        stat = "finWait1";
        break;
      case 7:
        stat = "finWait2";
        break;
      case 8:
        stat = "closeWait";
        break;
      case 9:
        stat = "lastAck";
        break;
      case 10:
        stat = "closing";
        break;
      case 11:
        stat = "timeWait";
        break;
      case 12:
        stat = "deleteTCB";

      default:
        return <td className="bg-danger text-white">{e}</td>;
    }
    return (
      <td className="bg-success text-white">
        {stat}({e})
      </td>
    );

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

  useEffect(() => {
    const bindTcp = setInterval(async () => {
      try {
        const response = await fetch(`/snmp/tcp`);
        const resJson = await response.json();

        if (resJson.toString() !== tcp.toString()) {
          if (tcp) {
            setTcpInsertList(_.differenceWith(resJson, tcp, _.isEqual));
            setTcpDelList(_.differenceWith(tcp, resJson, _.isEqual));
            // console.log("insertion", tcpInsertList);
            // console.log("deletion", tcpDelList);
          }
          setTcp(resJson);
          console.log("tcp connection changed!");
        } else {
          // console.log("nothing changed");
        }
        // return resJson;
      } catch (error) {
        console.log(error);
      }
    }, 3000);
    // bindTcp();

    return () => {
      clearInterval(bindTcp);
    };
  }, [tcp]);

  return (
    <>
      {/* Page content */}
      <Container className="mt-4 mb-4" fluid>
        {/* Table */}

        {/* tcp ip list */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="bg-gradient-info border-0">
                <h3 className="mb-0 text-secondary">
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
                    <td>LocalAddr(Port)</td>
                    <td>RemAddr(port)</td>
                  </tr>
                </thead>
                <tbody>
                  {tcp &&
                    tcp
                      .filter(
                        e =>
                          e[2] &&
                          // e[2].includes("192.168.0") &&
                          e[2] !== "0.0.0.0" &&
                          e[2] !== "127.0.0.1" &&
                          e[4] !== "192.168.0.38"
                      )
                      .map((e, i) => (
                        <tr key={i}>
                          <th>{i}</th>
                          {tcpTypeChecker(e[1])}
                          <td>
                            <b>{e[2]}</b> ({e[3]})
                          </td>
                          <td>
                            <b>{e[4]}</b> ({e[5]})
                          </td>
                        </tr>
                      ))}
                </tbody>
                <tbody>
                  {tcpInsertList &&
                    tcpInsertList.map((e, i) => (
                      <tr key={i} className="bg-info">
                        <th>{i}</th>
                        {tcpTypeChecker(e[1])}
                        <td>
                          {e[3]} ({e[2]})
                        </td>
                        <td>{e[4]}</td>
                        <td>{e[5]}</td>
                      </tr>
                    ))}
                  {tcpDelList &&
                    tcpDelList.map((e, i) => (
                      <tr key={i} className="bg-warning text-white">
                        <th>{i}</th>
                        {tcpTypeChecker(e[1])}
                        <td>
                          {e[3]} ({e[2]})
                        </td>
                        <td>{e[4]}</td>
                        <td>{e[5]}</td>
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

export default TcpList;
