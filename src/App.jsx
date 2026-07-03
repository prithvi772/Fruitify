import { useState, useEffect } from "react";
import "./App.css";
import Ecomm from "./Components/Ecomm";
import "bootstrap-icons/font/bootstrap-icons.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./Components/SignIn";
import Login from "./Components/Login";
import AdminPage from "./Components/AdminPage";
import AddProducts from "./Components/AddProducts"; // adjust path if needed
import Home from "./Components/Home";
import About from "./Components/About";
import Contact from "./Components/Contact";
import axios from "axios";

function App() {
  // const [user, setUser] = useState(() => {
  //   const saved = localStorage.getItem("loggedInUser");
  //   return saved ? JSON.parse(saved) : null;
  // });

  const [list, setList] = useState([]);
  let [cartItems, setCartItems] = useState([]);
  let [view, setView] = useState("");

  const [refreshProducts, setRefreshProducts] = useState(false);

  async function fetchProductList() {
    const res = await axios.get("https://fruitify-api.onrender.com/fruits");
    console.log("Fetched Products:", res.data); // ✅ add this
    setList(res.data);
  }

  const [user, setUser] = useState(null);
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);
  function handleCartClick() {
    setView("cart");
  }

  return (
    <div className="app-shell container-fluid">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              user?.role === "admin" ? (
                <AdminPage
                  list={list}
                  setList={setList}
                  user={user}
                  setUser={setUser}
                  refreshList={fetchProductList}
                />
              ) : (
                <Home
                  list={list}
                  setList={setList}
                  user={user}
                  setUser={setUser}
                  cartItems={cartItems}
                  setCartItems={setCartItems}
                  setView={setView}
                  onCartClick={handleCartClick}
                />
              )
            }
          />
          <Route
            path="/shop"
            element={
              <Ecomm
                list={list}
                setList={setList}
                user={user}
                setUser={setUser}
                refresh={refreshProducts}
                cartItems={cartItems}
                setCartItems={setCartItems}
                view={view}
                setView={setView}
                onCartClick={handleCartClick}
              />
            }
          />
          <Route
            path="/cart"
            element={
              <Ecomm
                list={list}
                setList={setList}
                user={user}
                setUser={setUser}
                refresh={refreshProducts}
                cartItems={cartItems}
                setCartItems={setCartItems}
                view={view}
                setView={setView}
                onCartClick={handleCartClick}
              />
            }
          />
          <Route
            path="/about"
            element={
              <About
                list={list}
                setList={setList}
                user={user}
                setUser={setUser}
                cartItems={cartItems}
                setCartItems={setCartItems}
                setView={setView}
                onCartClick={handleCartClick}
              />
            }
          />
          <Route
            path="/contact"
            element={
              <Contact
                list={list}
                setList={setList}
                user={user}
                setUser={setUser}
                cartItems={cartItems}
                setCartItems={setCartItems}
                setView={setView}
                onCartClick={handleCartClick}
              />
            }
          />
          <Route
            path="/admin"
            element={
              user?.role === "admin" ? (
                <AdminPage
                  list={list}
                  setList={setList}
                  user={user}
                  setUser={setUser}
                  refreshList={fetchProductList}
                />
              ) : (
                <Home
                  list={list}
                  setList={setList}
                  user={user}
                  setUser={setUser}
                  cartItems={cartItems}
                  setCartItems={setCartItems}
                  setView={setView}
                  onCartClick={handleCartClick}
                />
              )
            }
          />
          <Route path="/login" element={<Login setAdminUser={setUser} />} />
          <Route path="/signup" element={<SignIn productList={list} />} />
          <Route path="/signin" element={<SignIn productList={list} />} />
          {/* <Route path="/cart" element={<Cart />} /> */}

          
          
          <Route path="/AddProducts" element={<AddProducts />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
