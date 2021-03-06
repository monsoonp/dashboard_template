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
import React, { useEffect, useState } from "react";
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line } from "react-chartjs-2";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Collapse,
  CardFooter,
  Pagination,
  PaginationItem,
  PaginationLink
} from "reactstrap";

// core components
import { chartOptions, parseOptions, chartExample1 } from "variables/charts.js";
// locale
import ko from "date-fns/locale/ko";
// datepicker;
import "assets/css/react-datepicker.css";
import DatePicker, { registerLocale } from "react-datepicker";
// styled icon
// import styled from "styled-components";
import { ArrowSync, ArrowSyncOutline } from "styled-icons/typicons";
// import {RadioButtonChecked, RadioButtonUnchecked} from "styled-icons/material";
import moment from "moment";
// import { DownArrow, UpArrow } from "styled-icons/boxicons-solid";

// import Header from "components/Headers/Header.jsx";
import BarGraph from "components/Graph/BarGraph";
import TableTitle from "components/Table/TableTitle";
import test_data from "assets/data/test_data";

const Index = ({
  input,
  insert,
  update,
  remove,
  list,
  text,
  start,
  end,
  setStart,
  setEnd,
  socket
}) => {
  const [activeNav, setActiveNav] = useState(1);
  const [chartExample1Data, setChartExample1Data] = useState("data1");

  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }
  const toggleNavs = (e, index) => {
    e.preventDefault();
    setActiveNav(index);
    setChartExample1Data(chartExample1Data === "data1" ? "data2" : "data1");
  };

  const onSubmit = e => {
    e.preventDefault();
    if (text !== "") {
      insert();
    }
  };
  const resetTime = e => {
    e.preventDefault();
    setStart();
    setEnd();
  };

  const buttonExam = e => {
    e.preventDefault();
    e.stopPropagation();
    sorter("");
    socket.emit("message", text); //, broadcast 나 이외 다른 소켓에 / client에서 이용 ex)채팅
  };
  const [test_list, setTest_list] = useState([]);
  const bindList = async () => {
    try {
      const response = await fetch(`/admin/home/list`, {
        method: "GET",
        mode: "cors",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8"
          // "Access-Control-Allow-Origin": "*"
        }
      });
      const resJson = await response.json();
      setTest_list(resJson);
    } catch (error) {
      console.log(error);
      setTest_list(test_data);
    }
  };
  const [clickTime, setClickTime] = useState({ time: 0, id: "" });
  const clickHandler = e => {
    // 클릭 실행, 단 1초 이내에 다른 클릭이 없었을시
    const time = new Date().getTime();
    if (clickTime.id === e && time - clickTime.time <= 320) {
      remove(e);
    } else {
      update(e);
    }
    setClickTime({ time: time, id: e });
  };
  const [listOpen, setListOpen] = useState(true);
  const listOpener = () => {
    setListOpen(!listOpen);
  };
  const [sort, setSort] = useState({ value: "", asc: false });
  const sorter = value => {
    if (sort.value === value) {
      setSort({ ...sort, asc: !sort.asc });
    } else {
      setSort({ value: value, asc: true });
    }
  };
  registerLocale("ko", ko);
  const stampToDate = t => {
    const date = new Date(t);
    return date;
  };
  const [response, setResponse] = useState(false);

  useEffect(() => {
    console.log("dashboard componentDidMount");

    // socket.io
    if (socket) {
      socket.on("WeatherAPI", data =>
        setResponse({ temp: data.temperature, summ: data.summary })
      );
      socket.on("message", message => {
        console.log(`현재 검색어: ${message}`);
      });
    }

    // table list
    if (test_list.length === 0) {
      bindList();
    }

    return () => {
      console.log("dashboard componentWillUnmount");
      if (socket) {
        socket.off("WeatherAPI");
        socket.off("message");
      }
    };
  }, [socket, test_list.length]);
  // primary, secondary, success, danger, warning, info , light, dark, muted, white
  return (
    <>
      {/* 상단 여백 
      <Header />
      */}
      {/* Page content */}
      <Container className="mt-0 mb-4" fluid>
        <Row className="mt-3">
          <Col className="mb-5 mb-xl-0" xl="12">
            <Card className="shadow">
              <CardHeader className="bg-gradient-primary text-white">
                종합이력 조회
              </CardHeader>
              <CardBody className="align-items-center py-1">
                <DatePicker
                  locale="ko"
                  selected={start}
                  onChange={date => setStart(date)}
                  selectsStart
                  startDate={start}
                  endDate={end}
                  showTimeSelect
                  // withPortal
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  timeCaption="time"
                  dateFormat="MM/dd h:mm:ss aa"
                  placeholderText="시작시간"
                  customStyles={{ dateInput: { borderWidth: 0 } }}
                />
                <DatePicker
                  locale="ko"
                  selected={end}
                  onChange={date => setEnd(date)}
                  selectsEnd
                  endDate={end}
                  minDate={start}
                  showTimeSelect
                  // withPortal
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  timeCaption="time"
                  dateFormat="MM/dd h:mm:ss aa"
                  placeholderText="종료시간"
                />
                <Button
                  className="ml-2"
                  color="info"
                  href="#pablo"
                  onClick={resetTime}
                  size="sm"
                >
                  Reset
                </Button>
                <div style={{ textAlign: "center", display: "inline" }}>
                  {response ? (
                    <p style={{ display: "inline" }}>
                      현재 의정부 기온: {response.temp} °C {response.summ}
                    </p>
                  ) : (
                    <p style={{ display: "inline" }}>Loading...</p>
                  )}
                </div>
              </CardBody>
              <hr className="my-0" />
              <CardBody className="py-2">
                <Form role="form" onSubmit={onSubmit}>
                  <FormGroup className="mb-0">
                    <InputGroup className="input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-left-2" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="검색"
                        type="input"
                        onChange={e => input(e)}
                        value={`${text}`}
                      />
                    </InputGroup>
                  </FormGroup>
                </Form>
              </CardBody>
              <div className="ml-5">
                {list &&
                  list.toJS().map((e, index) => (
                    <p
                      style={{
                        textDecoration: e.checked
                          ? "Crimson double line-through" //solid, double, dotted, dashed, wavy
                          : "none" // overline underline / inherit, initial, unset
                        // display: "inline-block",
                      }}
                      key={e.id}
                      onClick={() => clickHandler(e.id)}
                    >
                      {index + 1}. {e.text} (
                      {btoa(unescape(encodeURIComponent(e.text)))}) (
                      {decodeURIComponent(
                        escape(atob(new Buffer(e.text).toString("base64")))
                      )}
                      )
                    </p>
                  ))}
              </div>
            </Card>
          </Col>
        </Row>
        <Row className="mt-2">
          <Col className="mb-5 mb-xl-0" xl="12">
            <Card className="shadow">
              <CardHeader className="border-0 p-2" onClick={listOpener}>
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Test List</h3>
                  </div>
                  <div className="col text-right my-0">
                    <Button
                      color="primary"
                      href="#pablo"
                      onClick={buttonExam}
                      size="md"
                    >
                      Button example
                    </Button>
                  </div>
                </Row>
              </CardHeader>
              <Collapse isOpen={listOpen}>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <TableTitle sort={sort} sorter={sorter} />
                  </thead>
                  <tbody>
                    {test_list
                      .filter(e =>
                        start
                          ? end
                            ? stampToDate(e.checkTime) >= start &&
                              stampToDate(e.checkTime) <= end
                            : stampToDate(e.checkTime) >= start
                          : end
                          ? stampToDate(e.checkTime) <= end
                          : e
                      )
                      .filter(e => e.pageName.indexOf(text) !== -1)
                      .sort((a, b) =>
                        sort.value
                          ? sort.asc
                            ? a[sort.value] > b[sort.value]
                              ? 1
                              : -1
                            : b[sort.value] > a[sort.value]
                            ? 1
                            : -1
                          : 1
                      )
                      .map(e => {
                        return (
                          <tr key={e.id} className="py-0">
                            <td>{e.id}</td>
                            <td>{e.pageName}</td>
                            <td>{e.visitors}</td>
                            <td>{e.users}</td>
                            <td>
                              <i
                                className={`fas fa-arrow-${
                                  e.bounceRate >= 40 ? "up" : "down"
                                } text-${
                                  e.bounceRate >= 40 ? "success" : "danger"
                                } mr-3`}
                              />
                              {e.bounceRate}
                            </td>
                            <td>
                              {moment(stampToDate(e.checkTime))
                                .locale("ko")
                                // .format("Y.MM.DD / hh:mm:ss a")
                                .format("YY.MM.DD / HH:mm:ss")
                                .toString()}
                              &nbsp;(
                              {moment(
                                stampToDate(e.checkTime)
                                // ,"YYYYMMDD"
                              ).fromNow()}
                              )
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </Table>
                <CardFooter className="py-1">
                  <nav aria-label="...">
                    <Pagination
                      className="pagination justify-content-end mb-0"
                      listClassName="justify-content-end mb-0"
                    >
                      <PaginationItem className="disabled">
                        <PaginationLink
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                          tabIndex="-1"
                        >
                          <i className="fas fa-angle-left" />
                          <span className="sr-only">Previous</span>
                        </PaginationLink>
                      </PaginationItem>

                      <PaginationItem className="active">
                        <PaginationLink
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          1
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          2 <span className="sr-only">(current)</span>
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          3
                        </PaginationLink>
                      </PaginationItem>

                      <PaginationItem>
                        <PaginationLink
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          <i className="fas fa-angle-right" />
                          <span className="sr-only">Next</span>
                        </PaginationLink>
                      </PaginationItem>
                    </Pagination>
                  </nav>
                </CardFooter>
              </Collapse>
            </Card>
          </Col>
        </Row>
        <Row className="mt-2">
          <Col className="mb-5 mb-xl-0" xl="8">
            <Card className="shadow">
              <CardHeader className="border-0"></CardHeader>
              <CardBody className="border-0">
                <BarGraph data={test_list} start={start} end={end} />
              </CardBody>
            </Card>
          </Col>
          <Col className="mb-5 mb-xl-0" xl="4">
            <Card className="bg-gradient-default shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h6 className="text-uppercase text-light ls-1 mb-1">
                      Overview
                    </h6>
                    <h2 className="text-white mb-0">Sales value</h2>
                  </div>
                  <div className="col">
                    <Nav className="justify-content-end" pills>
                      <NavItem>
                        <NavLink
                          className={classnames("py-2 px-3", {
                            active: activeNav === 1
                          })}
                          href="#pablo"
                          onClick={e => toggleNavs(e, 1)}
                        >
                          <span className="d-none d-md-block">
                            Month
                            <ArrowSyncOutline size="15" />
                          </span>
                          <span className="d-md-none">M</span>
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames("py-2 px-3", {
                            active: activeNav === 2
                          })}
                          data-toggle="tab"
                          href="#pablo"
                          onClick={e => toggleNavs(e, 2)}
                        >
                          <span className="d-none d-md-block">
                            Week
                            <ArrowSync size="15" />
                          </span>
                          <span className="d-md-none">W</span>
                        </NavLink>
                      </NavItem>
                    </Nav>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                {/* Chart */}
                <div className="chart">
                  <Line
                    data={chartExample1[chartExample1Data]}
                    options={chartExample1.options}
                    getDatasetAtEvent={e => console.log(e)}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row className="mt-2">
          <Col xl="6">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Social traffic</h3>
                  </div>
                  <div className="col text-right">
                    <Button
                      color="primary"
                      href="#pablo"
                      onClick={e => e.preventDefault()}
                      size="sm"
                    >
                      See all
                    </Button>
                  </div>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Referral</th>
                    <th scope="col">Visitors</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">Facebook</th>
                    <td>1,480</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">60%</span>
                        <div>
                          <Progress
                            max="100"
                            value="60"
                            barClassName="bg-gradient-danger"
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Facebook</th>
                    <td>5,480</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">70%</span>
                        <div>
                          <Progress
                            max="100"
                            value="70"
                            barClassName="bg-gradient-success"
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Google</th>
                    <td>4,807</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">80%</span>
                        <div>
                          <Progress max="100" value="80" />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">Instagram</th>
                    <td>3,678</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">75%</span>
                        <div>
                          <Progress
                            max="100"
                            value="75"
                            barClassName="bg-gradient-info"
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">twitter</th>
                    <td>2,645</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <span className="mr-2">30%</span>
                        <div>
                          <Progress
                            max="100"
                            value="30"
                            barClassName="bg-gradient-warning"
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Index;
