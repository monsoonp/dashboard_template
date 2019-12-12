import React, { useState } from "react";
// reactstrap components
import { Card, CardHeader, CardBody, Container, Row } from "reactstrap";
// locale
import ko from "date-fns/locale/ko";
// datepicker;
import "assets/css/react-datepicker.css";
import DatePicker, { registerLocale } from "react-datepicker";
// core components
import Header from "components/Headers/Header.jsx";

const DatePick = () => {
  const [start, setStart] = useState();
  const [end, setEnd] = useState();
  const [time, setTime] = useState(new Date());

  registerLocale("ko", ko);

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt-4 mb-4" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="bg-info">
                <h3 className="mb-0">DatePicker</h3>
              </CardHeader>
              <CardBody>
                <Row>
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
                </Row>
              </CardBody>
              <CardBody>
                <Row>
                  <DatePicker
                    locale="ko"
                    selected={time}
                    onChange={date => setTime(date)}
                    selectsEnd
                    // minDate={start}
                    showTimeSelect
                    // withPortal
                    timeFormat="HH:mm"
                    // timeIntervals={15}
                    // timeCaption="time"
                    dateFormat="MM/dd h:mm:ss aa"
                    placeholderText="DatePicker"
                  />
                </Row>
              </CardBody>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default DatePick;
