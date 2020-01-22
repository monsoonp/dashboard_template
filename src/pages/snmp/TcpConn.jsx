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
  // Table,
  Button,
  Container,
  Row,
  CardBody
  // UncontrolledTooltip
} from "reactstrap";

// SNMP(net-snmp) test List
const TcpConn = ({ socket }) => {
  const [local, setLocal] = useState(false);
  const [tcp, setTcp] = useState(false);

  const [connect, setConnect] = useState(false);
  const [disconnect, setDisconnect] = useState(false);
  /*
    other(1), -- none of the following
    invalid(2), -- an invalidated mapping
    dynamic(3),
    static(4)
  */

  useEffect(() => {
    if (socket) {
      try {
        socket.on("localAddress", data => {
          /*
          if (data && list && data.toString() !== list.toString()) {
            console.log(
              `local ip address insertion, deletion list`,
              _.differenceWith(data, list, _.isEqual),
              _.differenceWith(list, data, _.isEqual)
            );
          }
          */
          setLocal(data);
        });
      } catch (err) {
        alert(err);
      }
    }
    const bindTcp = setInterval(async () => {
      try {
        const response = await fetch(`/snmp/tcp`);
        const resJson = await response.json();

        if (resJson && resJson.toString() !== tcp.toString()) {
          if (tcp) {
            // setTcpInsertion(_.differenceWith(resJson, tcp, _.isEqual));
            // setTcpDeletion(_.differenceWith(tcp, resJson, _.isEqual));
          }
          setTcp(resJson);
          // console.log("tcp connection changed!", tcp, resJson);
        } else {
          // console.log("nothing changed");
        }
        // return resJson;
      } catch (error) {
        console.log(error);
      }
    }, 3000);

    if (local && tcp) {
      let list = local.filter(e => e.table[4] !== 2).map(e => e.table[3]);
      let conn = _.uniq(
        // 중복 제거
        tcp.map(e => e[4]).filter(e => e !== "0.0.0.0" && e !== "127.0.0.1")
      );
      setConnect(_.intersection(conn, list)); // 공통
      setDisconnect(_.difference(list, conn, _.isEqual)); // list - conn
    }
    return () => {
      if (socket) {
        socket.off("localAddress");
      }
      clearInterval(bindTcp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket, local, tcp]);

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
                <h3 className="mb-0 text-white">
                  TCP Connection (tcp - 1.3.6.1.2.1.6.13)
                </h3>
              </CardHeader>
              <CardBody className="">
                {/*
                  <Badge color="success" className="badge-dot">
                    <i className="bg-success" />
                    {e}
                  </Badge>
                */
                connect &&
                  connect.map((e, i) => (
                    <>
                      <Button
                        key={i}
                        color="success"
                        size="md"
                        className="mb-2"
                        style={{ width: 150 }}
                      >
                        {e}
                      </Button>
                      {(i + 1) % 3 === 0 ? (
                        <br />
                      ) : (
                        i + 1 === connect.length && <br />
                      )}
                    </>
                  ))}
                {disconnect &&
                  disconnect.map((e, i) => (
                    <>
                      <Button
                        key={i}
                        color="secondary"
                        size="md"
                        className="mb-2"
                        style={{ width: 150 }}
                      >
                        {e}
                      </Button>
                      {(i + 1) % 3 === 0 && <br />}
                    </>
                  ))}
              </CardBody>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default TcpConn;
