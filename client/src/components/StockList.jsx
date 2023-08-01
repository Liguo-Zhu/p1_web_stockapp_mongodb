import React from "react";
import Finnhub from "../api/Finnhub";
import { useNavigate } from "react-router-dom";
import { Table } from "reactstrap";
import { useState, useEffect, useContext } from "react";
import {
  HiOutlineArrowNarrowDown,
  HiOutlineArrowNarrowUp,
} from "react-icons/hi";
import { UserContext } from "../context/UserContext";

export default function StockList() {
  const navigate = useNavigate();
  const [stock, setStock] = useState();
  const { watchList, deleteStock } = useContext(UserContext);

  const changeColor = (i) => {
    return i > 0 ? "success" : "danger";
  };

  const renderIcon = (i) => {
    return i > 0 ? <HiOutlineArrowNarrowUp /> : <HiOutlineArrowNarrowDown />;
  };

  const handleSelectStock = (symbol) => {
    navigate(`/stock/detail/${symbol}`);
  };

  useEffect(() => {
    let isMounter = true;

    const fetchData = async () => {
      try {
        const res = await Promise.all(
          watchList.map((stock) => {
            return Finnhub.get("/quote", {
              params: {
                symbol: stock,
              },
            });
          })
        );

        //process the data
        const data = res.map((res) => {
          return {
            data: res.data,
            symbol: res.config.params.symbol,
          };
        });

        // set the data
        if (isMounter) {
          setStock(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
    return () => {
      isMounter = false;
    };
  }, [watchList]);

  return (
    <div className="container mt-3">
      <h2>2. Your Stock Watch List</h2>
      <div>
        <Table hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Last</th>
              <th>Chg</th>
              <th>Chg%</th>
              <th>High</th>
              <th>Low</th>
              <th>Open</th>
              <th>pClose</th>
            </tr>
          </thead>
          <tbody>
            {stock?.map((item) => {
              return (
                <tr
                  key={item.symbol}
                  className="table-row"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleSelectStock(item.symbol)}
                >
                  <th scope="row">{item.symbol.toUpperCase()}</th>
                  <td>{item.data.c}</td>
                  <td className={`text-${changeColor(item.data.d)}`}>
                    {item.data.d}
                    {renderIcon(item.data.d)}
                  </td>
                  <td className={`text-${changeColor(item.data.dp)}`}>
                    {item.data.dp}
                    {renderIcon(item.data.dp)}
                  </td>
                  <td>{item.data.h}</td>
                  <td>{item.data.l}</td>
                  <td>{item.data.o}</td>
                  <td>
                    {item.data.pc}
                    <button
                      className="btn btn-danger btn-sm d-inline-block delete-button"
                      onClick={(e) => {
                        //prevent the event from bubbling up to its parent component.
                        e.stopPropagation();
                        deleteStock(item.symbol);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
