import { useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import "./Login.css";
import "./SignIn.css";

export default function SignIn(props) {
  let { productList } = props;
  let [signInStatus, setSignInStatus] = useState("");
  let [message, setMessage] = useState("");
  let [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  let [confirmPassword, setConfirmPassword] = useState("");
  let [errors, setErrors] = useState({});
  let [touched, setTouched] = useState({});
  let [submitted, setSubmitted] = useState(false);
  let [showPassword, setShowPassword] = useState(false);
  let [showConfirmPassword, setShowConfirmPassword] = useState(false);
  let [successMessage, setSuccessMessage] = useState("");

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function validateSignup(passedUser, passedConfirmPassword) {
    let newErrors = {};
    if (!passedUser.name.trim()) {
      newErrors.name = "Name is required.";
    } else if (passedUser.name.trim().length < 3) {
      newErrors.name = "Name must be at least 3 characters.";
    } else if (!/^[A-Za-z\s]+$/.test(passedUser.name)) {
      newErrors.name = "Name can contain only alphabets and spaces.";
    }

    if (!passedUser.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!isValidEmail(passedUser.email)) {
      newErrors.email = "Please enter a valid email.";
    }

    if (!passedUser.password) {
      newErrors.password = "Password is required.";
    } else if (passedUser.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    } else if (!/[A-Z]/.test(passedUser.password)) {
      newErrors.password = "Password must contain at least one uppercase letter.";
    } else if (!/[a-z]/.test(passedUser.password)) {
      newErrors.password = "Password must contain at least one lowercase letter.";
    } else if (!/[0-9]/.test(passedUser.password)) {
      newErrors.password = "Password must contain at least one number.";
    } else if (!/[^A-Za-z0-9]/.test(passedUser.password)) {
      newErrors.password = "Password must contain at least one special character.";
    }

    if (!passedConfirmPassword) {
      newErrors.confirmPassword = "Confirm password is required.";
    } else if (passedConfirmPassword !== passedUser.password) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    return newErrors;
  }

  function getFieldClass(fieldName) {
    if (!touched[fieldName] && !submitted) {
      return "";
    }
    return errors[fieldName] ? "is-invalid" : "is-valid";
  }

  const isFormValid =
    Object.keys(validateSignup(user, confirmPassword)).length === 0;

  function handleChange(e) {
    const { name, value } = e.target;
    let updatedUser = { ...user, [name]: value };
    setUser(updatedUser);
    setErrors(validateSignup(updatedUser, confirmPassword));
    setTouched({ ...touched, [name]: true });
    setSuccessMessage("");
  }

  function handleConfirmPasswordChange(e) {
    let value = e.target.value;
    setConfirmPassword(value);
    setErrors(validateSignup(user, value));
    setTouched({ ...touched, confirmPassword: true });
    setSuccessMessage("");
  }

  function clearSignup() {
    setUser({
      name: "",
      email: "",
      password: "",
    });
    setConfirmPassword("");
    setErrors({});
    setTouched({});
    setSubmitted(false);
    setSuccessMessage("");
  }

  function handleBlur(fieldName) {
    setTouched({ ...touched, [fieldName]: true });
    setErrors(validateSignup(user, confirmPassword));
  }

  async function handleFormSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
    let formErrors = validateSignup(user, confirmPassword);
    setErrors(formErrors);
    setTouched({
      name: true,
      email: true,
      password: true,
      confirmPassword: true,
    });
    if (Object.keys(formErrors).length > 0) {
      return;
    }

    user.role = "user";
    let accountCreated = await checkUserExist();
    if (accountCreated) {
      setUser({
        name: "",
        email: "",
        password: "",
      });
      setConfirmPassword("");
      setErrors({});
      setTouched({});
      setSubmitted(false);
    }
  }

  async function checkUserExist() {
    let response = await axios("http://localhost:4000/users");
    let userData = await response.data;
    let filteredUserData = userData.filter((e, index) => {
      return e.email == user.email;
    });
    if (filteredUserData.length >= 1) {
      setSignInStatus("Failed");
      alert("Sorry dear, This Email id already Exists.");
      setMessage("Sorry dear, This Email id already Exists.");
      return false;
    } else {
      let resp = await axios.post("http://localhost:4000/users", user);
      setSuccessMessage("Account created successfully!");
      setSignInStatus("success");
      return true;
    }
  }

  return (
    <>
      <Navbar></Navbar>

      <div className="auth-page signup-page vh-100 mx-auto d-flex justify-content-center align-items-start ">
        <div className="auth-card signup-card myborder my-5  ">
          <form className="auth-form" onSubmit={handleFormSubmit}>
            <div className="auth-header">
              <h2>Create an Account</h2>
              <p>Create your Fruitify account to start shopping.</p>
            </div>
            {successMessage && (
              <div className="alert alert-success mb-0" role="alert">
                {successMessage}
              </div>
            )}
            <div className="auth-field my-3">
              Name:
              <input
                type="text"
                name="name"
                className={getFieldClass("name")}
                value={user.name}
                onChange={handleChange}
                onBlur={() => handleBlur("name")}
                required
              ></input>
              {errors.name && (touched.name || submitted) && (
                <div className="invalid-feedback">{errors.name}</div>
              )}
            </div>
            <div className="auth-field my-3">
              Email id:
              <input
                type="email"
                name="email"
                className={getFieldClass("email")}
                value={user.email}
                onChange={handleChange}
                onBlur={() => handleBlur("email")}
                required
              ></input>
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
                  onChange={handleChange}
                  onBlur={() => handleBlur("password")}
                  required
                ></input>
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
            <div className="auth-field my-3">
              Confirm Password:
              <div className="auth-password-control">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  className={getFieldClass("confirmPassword")}
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  onBlur={() => handleBlur("confirmPassword")}
                  required
                ></input>
                <button
                  type="button"
                  className="auth-eye-btn"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  <i
                    className={
                      showConfirmPassword ? "bi bi-eye-slash" : "bi bi-eye"
                    }
                  ></i>
                </button>
              </div>
              {errors.confirmPassword &&
                (touched.confirmPassword || submitted) && (
                  <div className="invalid-feedback">
                    {errors.confirmPassword}
                  </div>
                )}
            </div>
            <div className="auth-actions d-flex justify-content-end gap-2 my-2">
              <button className="btn btn-danger" type="submit" disabled={!isFormValid}>
                Submit
              </button>
              <button className="btn btn-danger" type="reset" onClick={clearSignup}>
                Clear
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
