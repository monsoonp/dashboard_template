import React, { useEffect, useState } from "react";

import { Bar } from "react-chartjs-2";
import "chartjs-plugin-datalabels";

const BarGraph = ({ data, start, end }) => {
  const [pageName, setPageName] = useState([]);
  const [visitors, setvisitors] = useState([]);
  const [users, setusers] = useState([]);
  const [bounceRate, setBounceRate] = useState([]);
  // const [checkTime, setCheckTime] = useState([]);

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
        borderWidth: 1,
        pointRadius: 10,
        pointHoverRadius: 15,
        pointBackgroundColor: "transparent", //#609ACF
        pointBorderWidth: 0,
        spanGaps: false
      },
      {
        type: "bar",
        label: "가입수",
        data: users,
        borderColor: "rgba(230,50,50,0.5)",
        backgroundColor: "rgba(230,120,80,0.2)",
        hoverBackgroundColor: "rgba(230,50,0,0.5)",
        borderWidth: 0.2,
        spanGaps: false
      },
      {
        type: "bar",
        label: "증가율",
        data: bounceRate,
        borderColor: "rgba(50,230,50,0.5)",
        backgroundColor: "rgba(120,230,120,0.3)",
        hoverBackgroundColor: "rgba(80,230,80,0.5)",
        borderWidth: 0.2,
        spanGaps: false
      }
    ]
  };
  const stampToDate = t => {
    return new Date(t);
  };
  useEffect(() => {
    const list = data.filter(e =>
      start
        ? end
          ? stampToDate(e.checkTime) >= start && stampToDate(e.checkTime) <= end
          : e
        : e
    );
    setPageName(list.map(e => e.pageName));
    setvisitors(list.map(e => e.visitors));
    setusers(list.map(e => e.users));
    setBounceRate(list.map(e => e.bounceRate));
    // setCheckTime(list.map(e => e.checkTime));

    // console.log(list);
  }, [data, start, end]);
  return (
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
          text: "test_list from DB",
          fontSize: 15
        }
      }}
      legend={{ display: true }}
    />
  );
};

export default BarGraph;
