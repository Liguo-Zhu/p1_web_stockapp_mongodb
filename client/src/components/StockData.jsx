import React from "react";
import Finnhub from "../api/Finnhub";
import { useState, useEffect } from "react";

export default function StockData({ symbol }) {
  const [stockData, setStockData] = useState();

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const res = await Finnhub.get("/stock/profile2", {
          params: {
            symbol,
          },
        });

        if (isMounted) {
          setStockData(res.data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
    return () => {
      isMounted = false;
    };
  }, [symbol]);

  return (
    <div className="container">
      {stockData && (
        <div className="row border bg-white rounded shadow-sm p-4 my-3">
          <div className="col">
            <div>
              <span className="fw-bold">Name: </span>
              {stockData.name}
            </div>
            <div>
              <span className="fw-bold">Ticker: </span>
              {stockData.ticker}
            </div>
            <div>
              <span className="fw-bold">Country: </span>
              {stockData.country}
            </div>
          </div>
          <div className="col">
            <div>
              <span className="fw-bold">Exchange: </span>
              {stockData.exchange}
            </div>
            <div>
              <span className="fw-bold">Industry: </span>
              {stockData.finnhubIndustry}
            </div>
            <div>
              <span className="fw-bold">IPO year: </span>
              {stockData.ipo}
            </div>
          </div>
          <div className="col">
            <div>
              <span className="fw-bold">MarketCap: </span>
              {stockData.marketCapitalization}
            </div>
            <div>
              <span className="fw-bold">Share Outstanding: </span>
              {stockData.shareOutstanding}
            </div>
            <div>
              <span className="fw-bold">Web url: </span>
              <a href={stockData.weburl}>{stockData.weburl}</a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// const dataType = {
//   country: "US",
//   currency: "USD",
//   estimateCurrency: "USD",
//   exchange: "NASDAQ NMS - GLOBAL MARKET",
//   finnhubIndustry: "Technology",
//   ipo: "1980-12-12",
//   logo: "https://static2.finnhub.io/file/publicdatany/finnhubimage/stock_logo/AAPL.svg",
//   marketCapitalization: 2957939.7942471122,
//   name: "Apple Inc",
//   phone: "14089961010.0",
//   shareOutstanding: 15728.7,
//   ticker: "AAPL",
//   weburl: "https://www.apple.com/",
// };
