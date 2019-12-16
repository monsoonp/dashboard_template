import React, { useEffect, useState } from "react";
// node.js library that concatenates classes (strings)
// import classnames from "classnames";
// javascipt plugin for creating charts
// import Chart from "chart.js";
// react plugin used to create charts
// import { Line } from "react-chartjs-2";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  // NavItem,
  // NavLink,
  // Nav,
  // Progress,
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
  PaginationLink,
  // Label,
  CustomInput,
  ButtonGroup,
  UncontrolledTooltip
} from "reactstrap";

// core components
// clipboard
import { CopyToClipboard } from "react-copy-to-clipboard";
// locale
import ko from "date-fns/locale/ko";
// datepicker;
import "assets/css/react-datepicker.css";
import DatePicker, { registerLocale } from "react-datepicker";
// styled icon
// import styled from "styled-components";
// import { ArrowSync, ArrowSyncOutline } from "styled-icons/typicons";
// import {RadioButtonChecked, RadioButtonUnchecked} from "styled-icons/material";
import moment from "moment";
// import { DownArrow, UpArrow } from "styled-icons/boxicons-solid";

// import Header from "components/Headers/Header.jsx";
import BarGraph from "components/Graph/BarGraph";
import TableTitle from "components/Table/TableTitle";
import PageList from "pages/test/PageList";
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
  const onSubmit = e => {
    e.preventDefault();
    if (text !== "") {
      insert();
    }
  };
  const resetTime = e => {
    e.preventDefault();
    // setStart(new Date().getTime() - 1 * 24 * 60 * 60 * 1000);
    setStart();
    setEnd();
  };
  const weekAgo = e => {
    e.preventDefault();
    if (start) {
      setStart(start - 7 * 24 * 60 * 60 * 1000);
    } else {
      setStart(new Date().getTime() - 7 * 24 * 60 * 60 * 1000);
    }
  };
  const dayAgo = e => {
    e.preventDefault();
    if (start) {
      setStart(start - 1 * 24 * 60 * 60 * 1000);
    } else {
      setStart(new Date().getTime() - 1 * 24 * 60 * 60 * 1000);
    }
  };
  const hourAgo = e => {
    e.preventDefault();
    if (start) {
      setStart(start - 1 * 60 * 60 * 1000);
    } else {
      setStart(new Date().getTime() - 1 * 60 * 60 * 1000);
    }
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
  const [page, setPage] = useState(1);
  const [scroll, setScroll] = useState(1);

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
  const [tableList, setTableList] = useState([]);
  const selectList = [5, 10, 20, 40, 80];
  const [selectView, setSelectView] = useState(20);

  useEffect(() => {
    setTableList(
      test_list
        .filter(e => {
          setPage(1);
          setScroll(1);
          return start
            ? end
              ? stampToDate(e.checkTime) >= start &&
                stampToDate(e.checkTime) <= end
              : stampToDate(e.checkTime) >= start
            : end
            ? stampToDate(e.checkTime) <= end
            : e;
        })
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
    );
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
  }, [end, socket, sort.asc, sort.value, start, test_list, text]);
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
                  className="ml-2 mr-0"
                  color="info"
                  href="#pablo"
                  onClick={resetTime}
                  size="sm"
                >
                  Reset
                </Button>
                <ButtonGroup className="mx-2">
                  <Button outline color="warning" onClick={weekAgo} size="sm">
                    일주일 전
                  </Button>
                  <Button outline color="warning" onClick={dayAgo} size="sm">
                    하루 전
                  </Button>
                  <Button outline color="warning" onClick={hourAgo} size="sm">
                    1시간 전
                  </Button>
                </ButtonGroup>
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
                    <div key={e.id}>
                      <CopyToClipboard text={e.text}>
                        <p
                          style={{
                            textDecoration: e.checked
                              ? "Crimson double line-through" //solid, double, dotted, dashed, wavy
                              : "none" // overline underline / inherit, initial, unset
                            // display: "inline-block",
                          }}
                          id={`tooltip${e.id}`}
                          onClick={() => clickHandler(e.id)}
                        >
                          {index + 1}. {e.text} (
                          {btoa(unescape(encodeURIComponent(e.text)))}) (
                          {decodeURIComponent(
                            escape(atob(new Buffer(e.text).toString("base64")))
                          )}
                          )
                        </p>
                      </CopyToClipboard>
                      <UncontrolledTooltip
                        delay={0}
                        placement="bottom-start"
                        trigger="hover focus"
                        target={`tooltip${e.id}`}
                        className="bg-gradient-primary"
                      >
                        {e.checked
                          ? "Double Click to Delete"
                          : "Click to copy and done"}
                      </UncontrolledTooltip>
                    </div>
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
                  <div className="my-auto py-auto">
                    <h3 className="my-auto mx-0 px-3">Test List</h3>
                  </div>
                  <FormGroup
                    className="m-0 p-0"
                    onClick={e => e.stopPropagation()}
                  >
                    {/*<Label for="exampleCustomSelect">Custom Select</Label>*/}
                    <CustomInput
                      type="select"
                      bsSize="sm"
                      id="exampleCustomSelect"
                      name="customSelect"
                      onChange={e => {
                        setSelectView(e.target.value);
                        setPage(1);
                        setScroll(1);
                      }}
                      defaultValue={`${selectView}`}
                    >
                      {selectList.map((e, i) => (
                        <option key={`${i}`}>{e}</option>
                      ))}
                    </CustomInput>
                  </FormGroup>
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
                <Table
                  className="align-items-center table-flush" // table-dark  / tag, size, bordered, borderless, strped, dark, hover, responsive
                  responsive
                  hover
                  // dark
                >
                  <thead className="thead-light">
                    <TableTitle sort={sort} sorter={sorter} />
                  </thead>
                  <tbody>
                    {tableList
                      .filter(
                        (e, i) =>
                          i >= (page - 1) * selectView &&
                          i <= (page - 1) * selectView + (selectView - 1)
                      )
                      .map(e => {
                        return (
                          <tr key={e.id} className="py-0">
                            <td className="py-0">
                              <CustomInput
                                type="checkbox"
                                // id="exampleCustomInline2"
                                id={`${e.id}`}
                                label={`${e.id}`}
                                inline
                                // checked
                              />
                            </td>
                            <td className="py-0">{e.pageName}</td>
                            <td className="py-0">{e.visitors}</td>
                            <td className="py-0">{e.users}</td>
                            <td className="py-0">
                              <i
                                className={`fas fa-arrow-${
                                  e.bounceRate >= 40 ? "up" : "down"
                                } text-${
                                  e.bounceRate >= 40 ? "success" : "danger"
                                } mr-3`}
                              />
                              {e.bounceRate}
                            </td>
                            <td className="py-0">
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
              </Collapse>
              <CardFooter className="align-content-center py-1">
                <nav aria-label="..." style={{ display: "flex" }}>
                  <Input
                    className="justify-content-start my-auto mr-4"
                    placeholder="검색"
                    type="input"
                    onChange={e => input(e)}
                    value={`${text}`}
                    bsSize="sm"
                  />
                  <Pagination
                    className="pagination justify-content-end mb-0"
                    listClassName="justify-content-end mb-0"
                  >
                    <PaginationItem
                      className={`${scroll === 1 ? "disabled" : ""}`}
                    >
                      <PaginationLink
                        // href="#pablo"
                        onClick={() => {
                          scroll > 1 ? setScroll(scroll - 1) : setScroll(1);
                          setPage((scroll - 2) * 10 + 1);
                        }}
                        tabIndex="-1"
                      >
                        <i className="fas fa-angle-left" />
                        <span className="sr-only">Previous</span>
                      </PaginationLink>
                    </PaginationItem>

                    <PageList
                      page={page}
                      setPage={setPage}
                      scroll={scroll}
                      setScroll={setScroll}
                      scrollLength={tableList.length}
                      text={text}
                      selectView={selectView}
                    />

                    <PaginationItem
                      className={`${
                        scroll * selectView * 10 > tableList.length
                          ? "disabled"
                          : ""
                      }`}
                    >
                      <PaginationLink
                        onClick={() => {
                          setScroll(scroll + 1);
                          setPage(scroll * 10 + 1);
                        }}
                      >
                        <i className="fas fa-angle-right" />
                        <span className="sr-only">Next</span>
                      </PaginationLink>
                    </PaginationItem>
                  </Pagination>
                </nav>
              </CardFooter>
            </Card>
          </Col>
        </Row>
        <Row className="mt-2">
          <Col className="mb-5 mb-xl-0" xl="12">
            <Card className="shadow">
              <CardHeader className="border-0"></CardHeader>
              <CardBody className="border-0">
                <BarGraph data={test_list} start={start} end={end} />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Index;
