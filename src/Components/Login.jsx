import { useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login(props) {
  let {setAdminUser}=props;
  const navigate = useNavigate();
  let [user, setUser] = useState({
    email: "",
    password: "",
  });
  let [errors, setErrors] = useState({});
  let [touched, setTouched] = useState({});
  let [showPassword, setShowPassword] = useState(false);
  let [successMessage, setSuccessMessage] = useState("");
  let [submitted, setSubmitted] = useState(false);

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function validateLogin(passedUser) {
    let newErrors = {};
    if (!passedUser.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!isValidEmail(passedUser.email)) {
      newErrors.email = "Please enter a valid email.";
    }

    if (!passedUser.password) {
      newErrors.password = "Password is required.";
    } else if (passedUser.password.length < 4) {
      newErrors.password = "Password must be at least 4 characters.";
    }

    return newErrors;
  }

  function getFieldClass(fieldName) {
    if (!touched[fieldName] && !submitted) {
      return "";
    }
    return errors[fieldName] ? "is-invalid" : "is-valid";
  }

  const isFormValid = Object.keys(validateLogin(user)).length === 0;

  function clear() {
    setUser({
      email: "",
      password: "",
    });
    setErrors({});
    setTouched({});
    setSubmitted(false);
    setSuccessMessage("");
  }
  function handleLogin(e) {
    let { name, value } = e.target;
    let updatedUser = { ...user, [name]: value };
    setUser(updatedUser);
    setErrors(validateLogin(updatedUser));
    setTouched({ ...touched, [name]: true });
    setSuccessMessage("");
  }
  function handleBlur(fieldName) {
    setTouched({ ...touched, [fieldName]: true });
    setErrors(validateLogin(user));
  }
  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
    let formErrors = validateLogin(user);
    setErrors(formErrors);
    setTouched({ email: true, password: true });
    if (Object.keys(formErrors).length > 0) {
      return;
    }
    // alert("Login succesfull");
    checkUserExist(user);
    // console.log("Login submitted:", user);
  }
  async function checkUserExist(user) {
    // event.preventDefault();
    let response = await axios("https://fruitify-api.onrender.com/users");
    let userdata = await response.data;
    let filteredLoginList = userdata.filter((e, index) => {
      return e.email == user.email && e.password == user.password;
    });
    if (filteredLoginList.length == 1) {
      // console.log(filteredLoginList);
      const loggedInUser = filteredLoginList[0];
      localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
      setAdminUser(loggedInUser);
      setSuccessMessage(`Welcome back, ${loggedInUser.name}!`);
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } else {
      alert("Wrong Username or password.");
    }
  }
  return (
    <>
      <Navbar />
      <div className="auth-page vh-100 mx-auto d-flex justify-content-center align-items-start">
        <div className="auth-card myborder my-5">
          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="auth-header">
              <h2>Login</h2>
              <p>Sign in to your Fruitify account.</p>
            </div>
            {successMessage && (
              <div className="alert alert-success mb-0" role="alert">
                {successMessage}
              </div>
            )}
            <div className="auth-field my-3">
              Email id:
              <input
                type="email"
                name="email"
                className={getFieldClass("email")}
                value={user.email}
                onChange={handleLogin}
                onBlur={() => handleBlur("email")}
                required
              />
              {errors.email && (touched.email || submitted) && (
                <div className="invalid-feedback">{errors.email}</div>
              )}
            </div>
            <div className="auth-field my-3">
              Password:
              <div className="auth-password-control">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className={getFieldClass("password")}
                  value={user.password}
                  onChange={handleLogin}
                  onBlur={() => handleBlur("password")}
                  required
                />
                <button
                  type="button"
                  className="auth-eye-btn"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <i className={showPassword ? "bi bi-eye-slash" : "bi bi-eye"}></i>
                </button>
              </div>
              {errors.password && (touched.password || submitted) && (
                <div className="invalid-feedback">{errors.password}</div>
              )}
            </div>
            <div className="auth-actions d-flex justify-content-end gap-2 my-2">
              <button type="submit" className="btn btn-danger" disabled={!isFormValid}>
                Ok
              </button>
              <button onClick={clear} type="reset" className="btn btn-danger">
                Clear
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
