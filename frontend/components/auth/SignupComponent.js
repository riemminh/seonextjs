import { useState, useEffect } from "react";
import Router from "next/router";
import { signup, isAuth } from "../actions/auth";

const SignupComponent = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    loading: false,
    message: "",
    showForm: true,
    error: ""
  });

  useEffect(() => {
    if (isAuth()) {
      Router.push("/");
    }
  }, []);

  const { name, email, password, error, message, showForm } = values;

  const handleChange = e => {
    setValues({ ...values, [e.target.name]: e.target.value, error: "" });
  };
  const handleSubmit = e => {
    e.preventDefault();

    const user = { name, email, password };

    signup(user)
      .then(res => {
        setValues({ ...values, showForm: false, message: res.data.message });
      })
      .catch(err => {
        if (err && err.response) {
          setValues({ ...values, error: err.response.data.error });
        }
      });
  };
  const MessageCpn = () => (
    <div className="alert alert-success" role="alert">
      {message}
    </div>
  );
  const ErrorCpn = () => (
    <div className="alert alert-danger" role="alert">
      {error}
    </div>
  );
  return (
    <React.Fragment>
      {error && <ErrorCpn />}
      {message && <MessageCpn />}
      {showForm && (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              value={name}
              onChange={handleChange}
              name="name"
              type="text"
              className="form-control"
              placeholder="Type your name"
            />
          </div>

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
      )}
    </React.Fragment>
  );
};

export default SignupComponent;
