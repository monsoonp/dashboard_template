import React, { useState, useEffect } from "react";
// reactstrap components
import { Card, CardHeader, CardBody, Container, Row, Col } from "reactstrap";
import { Bar, Line, Pie, Doughnut } from "react-chartjs-2";
import "chartjs-plugin-datalabels";

// core components
import Header from "components/Headers/Header.jsx";
import test_data from "assets/data/test_data";

const Graphs = () => {
  const [pageName, setPageName] = useState([]);
  const [visitors, setvisitors] = useState([]);
  const [users, setusers] = useState([]);
  const [bounceRate, setBounceRate] = useState([]);
  const [checkTime, setCheckTime] = useState([]);

  const dataList = {
    showLabel: true,
    typeShow: { bar: true },
    labels: pageName,
    datasets: [
      {
        type: "line",
        label: "방문수",
        data: visitors,
        borderColor: "rgba(50,50,230,0.5)",
        backgroundColor: "rgba(80,120,230,0.2)",
        borderWidth: 0.5,
        pointRadius: 15,
        pointHoverRadius: 20,
        pointBackgroundColor: "transparent", //#609ACF
        hoverBackgroundColor: "rgba(80,120,230,0.1)",
        pointBorderWidth: 0,
        spanGaps: true
      },
      {
        type: "bar",
        label: "가입수",
        data: users,
        borderColor: "rgba(230,50,50,0.5)",
        backgroundColor: "rgba(230,120,80,0.2)",
        hoverBackgroundColor: "rgba(230,50,0,0.5)",
        borderWidth: 0.2
        // maxBarThickness: 10
      },
      {
        type: "bar",
        label: "증가율",
        data: bounceRate,
        borderColor: "rgba(50,230,50,0.5)",
        backgroundColor: "rgba(120,230,120,0.3)",
        hoverBackgroundColor: "rgba(80,230,80,0.5)",
        borderWidth: 0.2
        // maxBarThickness: 10
      }
    ]
  };
  const barData = {
    labels: checkTime,
    datasets: [
      {
        label: "visitors",
        backgroundColor: "rgba(255,99,132,0.2)",
        borderColor: "rgba(255,99,132,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(255,99,132,0.4)",
        hoverBorderColor: "rgba(255,99,132,1)",
        data: visitors
      }
    ]
  };
  const lineData = {
    labels: checkTime,
    datasets: [
      {
        label: "users",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: users
      }
    ]
  };
  const pieData = {
    labels: pageName.filter((e, i) => i < 5),
    datasets: [
      {
        data: users.filter((e, i) => i < 5),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#ffff52",
          "#16f25c"
        ],
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#ffff52",
          "#16f25c"
        ]
      }
    ]
  };
  const legendOpts = {
    display: true,
    position: "bottom",
    fullWidth: true,
    reverse: false,
    labels: {
      fontColor: "rgb(255, 99, 132)"
    }
  };

  useEffect(() => {
    const list = test_data.filter((e, i) => i < 10);
    console.log(list);

    setPageName(list.map(e => e.pageName));
    setvisitors(list.map(e => e.visitors));
    setusers(list.map(e => e.users));
    setBounceRate(list.map(e => e.bounceRate));
    setCheckTime(list.map(e => e.checkTime));
  }, []);

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt-4 mb-4" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="bg-gradient-warning">
                <h3 className="mb-0">Graphs</h3>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col xl="4">
                    <Pie data={pieData} legend={legendOpts} />
                  </Col>
                  <Col xl="8">
                    <Bar
                      data={barData}
                      // width={100}
                      // height={50}
                      options={{
                        maintainAspectRatio: true
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col xl="4">
                    <Doughnut data={pieData} />
                  </Col>
                  <Col xl="8">
                    <Line data={lineData} />
                  </Col>
                </Row>
                <Row>
                  <Col xl="12">
                    <Bar
                      data={dataList}
                      // height={200}
                      options={{
                        responsive: true,
                        maintainAspectRatio: true,
                        plugins: { display: true },
                        scales: {
                          xAxes: [
                            {
                              stacked: true
                              // barThickness: 15,
                              // maxBarThickness: 20
                            }
                          ]
                        },
                        title: {
                          display: true,
                          text: "Line Chart",
                          fontSize: 15
                        }
                      }}
                      legend={{ display: true }}
                    />
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Graphs;
