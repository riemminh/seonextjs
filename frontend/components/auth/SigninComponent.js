import { useState, useEffect } from "react";
import Router from "next/router";
import { signin, authenticate, isAuth } from "../actions/auth";

const SigninComponent = () => {
  const [values, setValues] = useState({
    email: "riem@test.com",
    password: "123123",
    loading: false,
    error: ""
  });
  useEffect(() => {
    if (isAuth()) {
      Router.push("/");
    }
  }, []);
  const { email, password, error } = values;

  const handleChange = e => {
    setValues({ ...values, [e.target.name]: e.target.value, error: "" });
  };
  const handleSubmit = e => {
    e.preventDefault();

    const user = { email, password };
    signin(user)
      .then(res => {
        authenticate(res.data, () => {
          if (isAuth()) {
            if (isAuth().role === 1) {
              return Router.push("/admin");
            } else {
              return Router.push("/user");
            }
          }
        });
      })
      .catch(err => setValues({ ...values, error: err.response.data.error }));
  };

  const ErrorCpn = () => (
    <div className="alert alert-danger" role="alert">
      {error}
    </div>
  );
  return (
    <React.Fragment>
      {error && <ErrorCpn />}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            value={email}
            onChange={handleChange}
            name="email"
            type="email"
            className="form-control"
            placeholder="Type your email"
          />
        </div>

        <div className="form-group">
          <input
            value={password}
            onChange={handleChange}
            name="password"
            type="password"
            className="form-control"
            placeholder="Type your password"
          />
        </div>

        <div>
          <button className="btn btn-primary">Signup</button>
        </div>
      </form>
    </React.Fragment>
  );
};

export default SigninComponent;
