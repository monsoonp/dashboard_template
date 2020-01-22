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
  Row,
  UncontrolledTooltip
  // UncontrolledTooltip
} from "reactstrap";

// SNMP(net-snmp) test List
const DeviceList = () => {
  const [deviceList, setDeviceList] = useState(false);

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
    /*
    up(1), -- ready to pass packets
    down(2),
    testing(3) -- in some test mode
    /////////// admin / oper
    unknown(4), -- status can not be determined
    -- for some reason.
    dormant(5),
    notPresent(6), -- some component is missing
    lowerLayerDown(7) -- down due to state of -- lower-layer interface(s)
    */
  };

  useEffect(() => {
    const bindDevice = setInterval(async () => {
      try {
        const response = await fetch(`/snmp/device`);
        const resJson = await response.json();
        if (resJson && resJson.toString() !== deviceList.toString()) {
          console.log(
            "device connection changed!",
            _.differenceWith(resJson, deviceList, _.isEqual)
          );
          setDeviceList(resJson);
          console.log("tcp connection changed!", deviceList, resJson);
        } else {
          // console.log("nothing changed");
        }
        // return resJson;
      } catch (error) {
        console.log(error);
      }
    }, 3000);

    return () => {
      clearInterval(bindDevice);
    };
  }, [deviceList]);

  return (
    <>
      {/* Page content */}
      <Container className="mt-4 mb-4" fluid>
        {/* Table */}

        {/* device list */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="bg-gradient-info border-0">
                <h3 className="mb-0 text-white">
                  Device List (interface - 1.3.6.1.2.1.2.2)
                </h3>
              </CardHeader>
              <Table
                className="align-items-center table-flush" // table-dark  / tag, size, bordered, borderless, striped, dark, hover, responsive
                responsive
                bordered
                hover
                size="sm"
                dark
              >
                <thead className="thead-dark font-weight-bold">
                  <tr>
                    {/*<th scope="col">Index</th>*/}
                    <td>Index</td>
                    <td>Desc</td>
                    <td>Type</td>
                    <td id="mtuTooltip">Mtu</td>
                    <UncontrolledTooltip
                      delay={0}
                      placement="bottom-start"
                      trigger="hover focus"
                      target={`mtuTooltip`}
                      // className="bg-gradient-primary"
                    >
                      Maxumum Transfer Unit <br />
                      해당 레이어가 전송할 수 있는 최대 프로토콜 데이터 단위의
                      크기(바이트)
                    </UncontrolledTooltip>
                    <td>Speed</td>
                    {/*<td>PhysAddress</td>*/}
                    <td id="adminTooltip">AdminStatus</td>

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
                        {/*<td>{new Buffer(e[6].data)}</td>*/}
                        {e[7] === 1 ? (
                          <td className="bg-success">up(1)</td>
                        ) : (
                          <td className="bg-danger text-white">
                            {e[7] === 2 ? "down(2)" : "testing(3)"}
                          </td>
                        )}
                        {ifTypeChecker(e[8])}
                      </tr>
                    ))}
                </tbody>
              </Table>
            </Card>
          </div>
        </Row>
        {/* tcp ip list */}
      </Container>
    </>
  );
};

export default DeviceList;
