import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    watchlist: "",
  });

  const [success, setSuccess] = useState(true);
  const [errorType, setErrorType] = useState("");
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(process.env.REACT_APP_SIGNUP);
      const res = await axios.post(process.env.REACT_APP_SIGNUP, data);

      if (res.data.error === false) {
        setSuccess(true);
        setErrorType("");
        setData({
          username: "",
          email: "",
          password: "",
        });
        navigate("/login");
      } else {
        setSuccess(false);
        setErrorType(res.data.message);
        setData({
          username: "",
          email: "",
          password: "",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container my-5">
      <h3 className="d-flex align-items-center justify-content-center mt-5">
        Welcome to Stock App
      </h3>
      <h5 className="d-flex align-items-center justify-content-center">
        Let's create your account.
      </h5>
      <form onSubmit={handleSubmit}>
        <div className="d-grid gap-2 col-6 mx-auto">
          <input
            name="username"
            type="text"
            placeholder="Username"
            onChange={handleChange}
            value={data.username}
            required
            className="form-control mt-3"
          />
        </div>
        <div className="d-grid gap-2 col-6 mx-auto">
          <input
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            value={data.email}
            required
            className="form-control mt-3"
          />
        </div>
        <div className="d-grid gap-2 col-6 mx-auto">
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            value={data.password}
            required
            className="form-control mt-3"
          />
        </div>
        {success ? null : (
          <div className="d-flex align-items-center justify-content-center text-danger mt-3">
            <div>{errorType}</div>
          </div>
        )}
        <div className="d-grid gap-2 col-6 mx-auto">
          <button
            type="submit"
            className="btn btn-primary btn-sm btn-block fw-bold fs-5 mt-3"
          >
            Sign Up
          </button>
        </div>
      </form>
      <div className="d-flex align-items-center justify-content-center mt-2">
        <div className="m-2">Already have an account?</div>
        <Link to="/login">
          <span className="fw-bold text-success">Sign In</span>
        </Link>
      </div>
    </div>
  );
}
