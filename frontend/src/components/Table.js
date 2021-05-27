import React, { useState, useEffect } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

const Table = () => {
  const [Token, setToken] = useState("");
  useEffect(async () => {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
      const data = await axios.get("/app/getNumber");
      console.log(data);
      setDbNum(data.data.number);
    }
  }, []);

  const [InputNumber, setInputNumber] = useState(0);
  const [DbNum, setDbNum] = useState(0);
  const [Percentage, setPercentage] = useState(0);

  const logout = async () => {
    // Headers
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    // If token, add to headers config
    if (localStorage.getItem("token")) {
      config.headers["Authorization"] = `Token ${localStorage.getItem(
        "token"
      )}`;
    }
    axios
      .post("/app/auth/logout/", null, config)
      .then((res) => {
        localStorage.removeItem("token");
        setToken("");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const onChange = (e) => {
    setInputNumber(e.target.value);
    setPercentage(DbNum && e.target.value ? e.target.value / DbNum : 0);
  };
  if (!localStorage.getItem("token")) {
    return <Redirect to="/login" />;
  }
  return (
    <div style={{ display: "block", justifyContent: "center" }}>
      <button
        type="submit"
        style={{ marginLeft: "45%", marginTop: "10px" }}
        className="button-reg"
        onClick={() => logout()}
      >
        Logout{" "}
      </button>
      <table>
        <tbody>
          <tr>
            <th>Input Number</th>
            <th>Database Number</th>
            <th>Percentage</th>
          </tr>

          <tr>
            <td>
              <input
                type="text"
                className="InputElement"
                placeholder="Enter Number"
                name="email"
                onChange={(e) => onChange(e)}
                required
              />
            </td>
            <td>{DbNum}</td>
            <td>{Percentage}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Table;
