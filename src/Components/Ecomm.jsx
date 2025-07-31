import { useEffect, useState } from "react";
import Products_Page from "./Products_Page";
import Navbar from "./Navbar";
import axios from "axios";
import SignIn from "./SignIn";
import AdminPage from "./AdminPage";
import Cart from "./Cart";
import Login from "./Login";
import Bill from "./Bill";
export default function Ecomm(props) {
  let {
    list,
    setList,
    user,
    setUser,
    refresh,
    cartItems,
    setCartItems,
    view,
    setView,
  } = props;

  // let [list, setList] = useState([]);

  let [filteredProductList, setFilteredProductList] = useState([]);
  useEffect(() => {
    getData();
  }, [refresh]);

  async function getData() {
    let response = await axios("http://localhost:4000/fruits");
    let fruitList = response.data;
    fruitList = fruitList.map((element, index) => {
      element.qty = 0;
      let dis = (element.mrp * element.discount) / 100;
      element.finalPrice = element.mrp - dis;
      // element.instock === "true";
      return element;
    });
    setFilteredProductList(fruitList);
    setList(fruitList); //✅ updates App.jsx state
    console.log("Filtered list:" + filteredProductList);
  }

  function updateCartItems(passedList) {
    let p1List = [...passedList];
    let c = p1List.filter((e, index) => e.qty != 0);
    setCartItems(c);
    console.log("Cart Items:", cartItems);
  }

  function handleAddToCart(product_id) {
    let user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!user || !user.name) {
      let modal = new bootstrap.Modal(document.getElementById("loginModal"));
      modal.show();
      return;
    }

    let list1 = list.map((current, index) => {
      if (current.id == product_id) {
        current.qty = current.qty + 1;
      }
      return current;
    });
    setList(list1);
    updateCartItems(list1);
  }
  function handleQuantity(quantityId, op) {
    let updatedQuantityList = list.map((present, index) => {
      if (present.id == quantityId && op == "+") {
        present.qty = present.qty + 1;
      } else if (present.id == quantityId && op == "-") {
        present.qty = present.qty - 1;
      }
      return present;
    });
    setList(updatedQuantityList);
    updateCartItems(updatedQuantityList);
  }
  function handleCartClick() {
    props.onCartClick();
  }
  return (
    <>
      <div className="">
        <Navbar
          list={list}
          setList={setList}
          cartItems={cartItems}
          setCartItems={setCartItems}
          user={user}
          setUser={setUser}
          view={view}
          setView={setView}
          onCartClick={handleCartClick}
        ></Navbar>
        {view === "cart" ? (
          <Cart
            cartItems={cartItems}
            setCartItems={setCartItems}
            view={view}
            setView={setView}
            onQuant={handleQuantity}
          />
        ) : view === "bill" ? (
          <Bill view={view} setView={setView} cartItems={cartItems} />
        ) : (
          <Products_Page
            list={list}
            onAddCart={handleAddToCart}
            onQuant={handleQuantity}
          />
        )}

        {/* {view === "login" ? (
          <Login setUser={setUser} setView={setView} />
        ) : view === "cart" ? (
          <Cart
            cartItems={cartItems}
            setCartItems={setCartItems}
            view={view}
            setView={setView}
          />
        ) : (
          <Products_Page
            list={list}
            onAddCart={handleAddToCart}
            onQuant={handleQuantity}
          ></Products_Page>
        )} */}

        {/* <AdminPage></AdminPage> */}
      </div>
      {/* Bootstrap Modal for login warning */}
      <div
        className="modal fade"
        id="loginModal"
        tabIndex="-1"
        aria-labelledby="loginModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="loginModalLabel">
                Login Required
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              Please login first to add items to cart.
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              {/* <button
          type="button"
          className="btn btn-primary"
          onClick={() => setView("login")}
          data-bs-dismiss="modal"
        >
          Login
        </button> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
