import React from "react";
import Search from "../components/Search";
import StockList from "../components/StockList";

export default function Stock() {
  return (
    <div className="container my-5">
      <Search />
      <br />
      <StockList />
    </div>
  );
}
