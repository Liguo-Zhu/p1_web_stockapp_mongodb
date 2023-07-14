import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserContextProvider = (props) => {
  const [watchList, setWatchList] = useState(
    //split() will convert the string('TSLA,AMD,AAPL') to array ['TSLA','AMD','AAPL']
    //The split() method takes a pattern and divides a String into an ordered list of substrings by searching for the pattern, puts these substrings into an array, and returns the array.
    localStorage.getItem("@watchListStorage")?.split(",") || ["TSLA", "AMD"]
  );

  const user = JSON.parse(localStorage.getItem("@stockAppUser"));
  const [userInfo, setUserInfo] = useState(
    user && {
      username: user.username,
      email: user.email,
    }
  );

  useEffect(() => {
    localStorage.setItem("@watchListStorage", watchList);
  }, [watchList]);

  const addStock = (stock) => {
    //The indexOf() method returns the first index at which a given element can be found in the array, or -1 if it is not present.
    if (watchList.indexOf(stock) === -1) {
      setWatchList([...watchList, stock]);
    }
  };

  const deleteStock = (stock) => {
    //The filter() method creates a shallow copy of a portion of a given array, filtered down to just the elements from the given array that pass the test implemented by the provided function.
    setWatchList(
      watchList.filter((item) => {
        return item !== stock;
      })
    );
  };

  return (
    <UserContext.Provider
      value={{ watchList, userInfo, setWatchList, addStock, deleteStock }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
