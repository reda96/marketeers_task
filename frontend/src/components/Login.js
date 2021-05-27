import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({
    name: "",
    password: "",
  });
  const [Token, setToken] = useState("");
  const { name, password } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    {
      // Headers
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = JSON.stringify({
        username: name,
        password,
      });
      axios
        .post("/app/auth/login", body, config)
        .then((res) => {
          console.log(res);
          localStorage.setItem("token", res.data.token);
          setToken(localStorage.token);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  if (localStorage.token) {
    console.log(localStorage.token);
    return <Redirect to="/" />;
  }

  return (
    <div>
      <div className="register">
        <h1 className="large text-primary">Sign In</h1>

        <form className="form" onSubmit={(e) => onSubmit(e)}>
          {/* {err ? <div className="alert alert-danger">{err}</div> : null} */}
          <div className="Input">
            <input
              className="InputElement"
              placeholder="User Name"
              name="name"
              onChange={(e) => onChange(e)}
              value={name}
              required
            />
          </div>
          <div className="Input">
            <input
              type="password"
              className="InputElement"
              placeholder="Password"
              name="password"
              value={password}
              onChange={(e) => onChange(e)}
              required
              autoComplete="off"
            />
          </div>
          <input type="submit" className="button-reg" value="Login" />
        </form>
        <p className="my-1">
          Don't have an account?{" "}
          <Link className="btn" to="/register">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

// Redirect if logged in
// if (isAuthenticated) {
//   if (location.state) {
//     return (
//       <Redirect
//         to={{
//           pathname: location.state.prevpath,
//           state: { m: location.state.m },
//         }}
//       />
//     );
//   } else {
//     return <Redirect to="/" />;
//   }
// }

export default Login;
