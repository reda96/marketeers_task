import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [Token, setToken] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const { email, name, password, password2 } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = async (e) => {
    e.preventDefault();

    if (password === password2) {
      // Headers
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = JSON.stringify({
        username: name,
        password,
        email,
      });
      axios
        .post("/app/auth/register", body, config)
        .then((res) => {
          console.log(res);
          localStorage.setItem("token", res.data.token);
          setToken(res.data.token);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  if (localStorage.getItem("token")) {
    return <Redirect to="/" />;
  }
  return (
    <Fragment>
      <div className="register">
        <h1 className="large text-primary">Sign Up</h1>

        <form className="form" method="post" onSubmit={(e) => onSubmit(e)}>
          {/* {err ? <div className="alert alert-danger">{err}</div> : null} */}
          <div className="Input">
            <input
              className="InputElement"
              type="text"
              placeholder="Name"
              name="name"
              value={name}
              required={true}
              onChange={(e) => onChange(e)}
            />
          </div>

          <div className="Input">
            <input
              className="InputElement"
              type="email"
              placeholder="Email Address"
              name="email"
              value={email}
              required={true}
              onChange={(e) => onChange(e)}
            />
          </div>

          <div className="Input">
            <input
              className="InputElement"
              type="password"
              placeholder="Password"
              name="password"
              minLength="6"
              value={password}
              required={true}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className="Input">
            <input
              className="InputElement"
              type="password"
              placeholder="Confirm Password"
              name="password2"
              minLength="6"
              value={password2}
              required={true}
              onChange={(e) => onChange(e)}
            />
          </div>
          <input type="submit" className="button-reg" value="Register" />
        </form>
        <p className="my-1">
          Already have an account?{" "}
          <Link className="btn" to="/login">
            Sign In
          </Link>
        </p>
      </div>
    </Fragment>
  );
};

export default Register;
