import { useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";

export default function SignIn(props) {
  let { productList } = props;
  let [signInStatus, setSignInStatus] = useState("");
  let [message, setMessage] = useState("");
  let [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  function handleChange(e) {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  }

  async function handleFormSubmit(event) {
    event.preventDefault();

    user.role = "user";
    await checkUserExist();
    setUser({
      name: "",
      email: "",
      password: "",
    });
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
    } else {
      let resp = await axios.post("http://localhost:4000/users", user);
      alert("Signed up Successfully You may login now.");
      setSignInStatus("success");
    }
  }

  return (
    <>
      <Navbar></Navbar>

      <div className="  vh-100   w-75 mx-auto d-flex justify-content-center align-items-start ">
        <div className="  myborder w-50 my-5  ">
          <form onSubmit={handleFormSubmit}>
            <div className="my-3">
              Name:
              <input
                type="text"
                name="name"
                value={user.name}
                onChange={handleChange}
                required
              ></input>
            </div>
            <div className="my-3">
              Email id:
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                required
              ></input>
            </div>
            <div className="my-3">
              Password:
              <input
                type="password"
                name="password"
                value={user.password}
                onChange={handleChange}
                required
              ></input>
            </div>
            <div className="  w-75 d-flex justify-content-end gap-2 my-2">
              <button className="btn btn-danger" type="submit">
                Submit
              </button>
              <button className="btn btn-danger" type="reset">
                Clear
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
