import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Login() {
  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const [success, setSuccess] = useState(true);
  const [errorType, setErrorType] = useState("");

  // const handleChange = ({ currentTarget: input }) => {
  //   setData({ ...data, [input.name]: input.value });
  // };
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(process.env.REACT_APP_LOGIN, data);

      if (res.data.error === false) {
        localStorage.setItem("@stockAppUser", JSON.stringify(res.data));
        if (res.data.watchlist !== "") {
          localStorage.setItem("@watchListStorage", res.data.watchlist);
        } else {
        }

        // window.location.reload();
        // window.location.assign("/");
        // window.location.replace("/");
        window.location = "/";
      } else {
        setSuccess(false);
        setErrorType(res.data.message);
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
        Login to your account.
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
          <div
            className="d-flex align-items-center justify-content-center"
            style={{ color: "red" }}
          >
            <div>{errorType}</div>
          </div>
        )}

        <div className="d-grid gap-2 col-6 mx-auto">
          <button
            type="submit"
            className="btn btn-primary btn-sm btn-block fw-bold fs-5 mt-3"
          >
            Login
          </button>
        </div>
      </form>
      <div className="d-flex align-items-center justify-content-center mt-2">
        <div className="m-2">Don't have an account?</div>
        <Link to="/signup">
          <span className="fw-bold text-success">Sign Up</span>
        </Link>
      </div>
    </div>
  );
}
