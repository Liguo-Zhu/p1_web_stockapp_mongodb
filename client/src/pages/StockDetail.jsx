import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Finnhub from "../api/Finnhub";
import AreaChart from "../components/AreaChart";

const processData = (data) => {
  return data.t.map((item, index) => {
    return {
      x: item * 1000,
      y: data.c[index].toFixed(2), // 2 decimals
    };
  });
};

export default function StockDetail() {
  const [chartData, setChartData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { symbolID } = useParams();

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    const fetchData = async () => {
      const date = new Date();
      const currentTime = Math.floor(date.getTime() / 1000);

      // note: during weekend, it is no data.
      // sunday--saturday: 0-6
      let ondDay;
      if (date.getDay() === 6) {
        ondDay = currentTime - 60 * 60 * 24 * 2;
      } else if (date.getDay() === 0) {
        ondDay = currentTime - 60 * 60 * 24 * 3;
      } else {
        ondDay = currentTime - 60 * 60 * 24;
      }

      const oneWeek = currentTime - 60 * 60 * 24 * 7;
      const oneYear = currentTime - 60 * 60 * 24 * 365;

      try {
        const res = await Promise.all([
          Finnhub.get("/stock/candle", {
            params: {
              symbol: symbolID,
              from: ondDay,
              to: currentTime,
              resolution: 30, //every 30 minutes
            },
          }),
          Finnhub.get("/stock/candle", {
            params: {
              symbol: symbolID,
              from: oneWeek,
              to: currentTime,
              resolution: 60, //every 60 minutes
            },
          }),
          Finnhub.get("/stock/candle", {
            params: {
              symbol: symbolID,
              from: oneYear,
              to: currentTime,
              resolution: "D", //every day
            },
          }),
        ]);

        console.log(res[0]);

        if (isMounted) {
          //store data to the state
          setChartData({
            day: processData(res[0].data),
            week: processData(res[1].data),
            year: processData(res[2].data),
          });
          setIsLoading(false);
        }
      } catch (error) {
        // console.log(error.message);
        setIsLoading(false);
      }
    };

    fetchData();
    return () => {
      isMounted = false;
    };
  }, [symbolID]);

  if (isLoading) {
    return <div className="container my-5 text-center">Loading...</div>;
  }

  return (
    <div className="container my-5">
      {chartData && (
        <div>
          <AreaChart chartData={chartData} symbol={symbolID} />
        </div>
      )}
    </div>
  );
}
//https://finnhub.io/api/v1/stock/candle?symbol=AAPL&resolution=1&from=1679476980&to=1679649780&token=chk6q19r01qnu4tr0i20chk6q19r01qnu4tr0i2g

// Arguments:

// symbolREQUIRED
// Symbol.

// resolutionREQUIRED
// Supported resolution includes 1, 5, 15, 30, 60, D, W, M .Some timeframes might not be available depending on the exchange.

// fromREQUIRED
// UNIX timestamp. Interval initial value.

// toREQUIRED
// UNIX timestamp. Interval end value.
