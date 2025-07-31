import { useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login(props) {
  let {setAdminUser}=props;
  const navigate = useNavigate();
  let [user, setUser] = useState({
    email: "",
    password: "",
  });
  function clear() {
    setUser({
      email: "",
      password: "",
    });
  }
  function handleLogin(e) {
    let { name, value } = e.target;
    setUser({ ...user, [name]: value });
  }
  function handleSubmit(e) {
    e.preventDefault();
    // alert("Login succesfull");
    checkUserExist(user);
    // console.log("Login submitted:", user);
  }
  async function checkUserExist(user) {
    // event.preventDefault();
    let response = await axios("http://localhost:4000/users");
    let userdata = await response.data;
    let filteredLoginList = userdata.filter((e, index) => {
      return e.email == user.email && e.password == user.password;
    });
    if (filteredLoginList.length == 1) {
      // console.log(filteredLoginList);
      const loggedInUser = filteredLoginList[0];
      alert("Login successfull");
      localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
      setAdminUser(loggedInUser);
      navigate("/");
    } else {
      alert("Wrong Username or password.");
    }
  }
  return (
    <>
      <Navbar />
      <div className="vh-100 w-75 mx-auto d-flex justify-content-center align-items-start">
        <div className="myborder w-50 my-5">
          <form onSubmit={handleSubmit}>
            <div className="my-3">
              Email id:
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleLogin}
                required
              />
            </div>
            <div className="my-3">
              Password:
              <input
                type="password"
                name="password"
                value={user.password}
                onChange={handleLogin}
                required
              />
            </div>
            <div className="w-75 d-flex justify-content-end gap-2 my-2">
              <button type="submit" className="btn btn-danger">
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
