import { useEffect, useState, useContext } from "react";
import { UserContext } from "../Contexts/UserContext";
import "./App.css";
import Navbar from "./Navbar";
import { DateTime } from "luxon";

function App() {
  const { user } = useContext(UserContext);

  const [userGeoIpData, setUserGeoIpData] = useState(null);
  useEffect(() => {
    fetch(
      `https://geo.ipify.org/api/v2/country?apiKey=${process.env.REACT_APP_IPIFY_API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => setUserGeoIpData(data));
  }, []);

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <div className="App component">
      <h1>hi {userGeoIpData && userGeoIpData.ip}</h1>
      {process.env.REACT_APP_TEST_ABC}
      {DateTime.local()
        .setLocale("de")
        .plus({ days: -7 })
        .toRelative({ unit: "minutes" })}
      {user?.picture?.thumbnail ? <Navbar /> : "loading"}
    </div>
  );
}

export default App;
