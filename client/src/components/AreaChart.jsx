import React from "react";
import Chart from "react-apexcharts";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import StockData from "./StockData";

export default function AreaChart({ chartData, symbol }) {
  const { day, week, year } = chartData;
  const [dateFormat, setDateFormat] = useState("1Day");

  const chooseDateFormat = () => {
    switch (dateFormat) {
      case "1Day":
        return day;
      case "7Days":
        return week;
      case "1Year":
        return year;
      default:
        return day;
    }
  };

  const renderBtnSelect = (btn) => {
    const classBase = " btn m-1"; //note: before the string, it needs a space.
    if (btn === dateFormat) {
      return "btn-primary" + classBase;
    } else {
      return "btn-outline-primary" + classBase;
    }
  };

  // get the data, and check the first and last element.
  const colorType =
    chooseDateFormat()[chooseDateFormat().length - 1].y -
      chooseDateFormat()[0].y >
    0
      ? "#32cd32"
      : "#dc143c";

  const options = {
    colors: [colorType],
    title: {
      text: "",
      align: "center",
      style: {
        fontSize: "18px",
      },
    },
    chart: {
      id: "stock-data",
      animations: {
        speed: 1,
      },
    },
    xaxis: {
      type: "datetime",
      labels: {
        datetimeUTC: false,
      },
    },
    tooltip: {
      x: {
        format: "MMM dd HH:MM",
      },
    },
  };

  const series = [
    {
      name: symbol,
      data: chooseDateFormat(),
    },
  ];

  return (
    <div className="container my-5">
      <h2>Stock Detail: {symbol} </h2>
      <NavLink to={"/stock"} className="nav-link ">
        (Back to Stock)
      </NavLink>
      <hr />
      <StockData symbol={symbol} />
      <div>
        <button
          className={renderBtnSelect("1Day")}
          onClick={() => setDateFormat("1Day")}
        >
          1Day
        </button>
        <button
          className={renderBtnSelect("7Days")}
          onClick={() => setDateFormat("7Days")}
        >
          7Days
        </button>
        <button
          className={renderBtnSelect("1Year")}
          onClick={() => setDateFormat("1Year")}
        >
          1Year
        </button>
      </div>
      <Chart options={options} series={series} type="area" width="100%" />
    </div>
  );
}
