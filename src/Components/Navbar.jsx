import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
export default function Navbar(props) {
  let { cartItems, list, setList, setCartItems, user, setUser,view,setView } = props;
  let [welcomeUser, setWelcomeUser] = useState("");
  

  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      setWelcomeUser(user.name);
    }
  }, [user]);


  function handleCartClick() {
    if (props.onCartClick) {
      props.onCartClick();
    }
    
  }
  function handleLogout() {
    localStorage.removeItem("loggedInUser"); //optional
    if (setUser) {
      setUser(null); // ✅ this is the important fix
    }
    if (list && setList) {
      let resetList = list.map((current, index) => {
        return { ...current, qty: 0 };
      });
      setList(resetList); // ✅ reset product list in parent (App or Ecomm)
    }
    if (setCartItems) {
      setCartItems([]); // ✅ clear cart
    }
    navigate("/");
  }

  function showPrice(cartItems) {
    let result = 0;
    cartItems.forEach((current, index) => {
      result += current.finalPrice * current.qty;
    });
    return result;
    console.log(result);
  }

  // useEffect(() => {
  //   const storedName = JSON.parse(localStorage.getItem("loggedInUser"));
  //   if(storedName){
  //     setWelcomeUser(storedName.name);
  //   }
  // }, []);

  return (
    <>
      <div className="fruit-navbar d-flex justify-content-between bg-white myborder rounded-3">
        <Link className="fruit-navbar__brand text-start" to={"/"}>
          <img onClick={()=>{
            if (setView) {
              setView("products");
            }
          }} className="fruit-navbar__logo myborder" src={"/Images/Fruitify.jpg"}></img>
          <span className="fruit-navbar__brand-copy">
            <strong>Fruitify</strong>
            <small>Fresh Fruits Delivered Daily.</small>
          </span>
        </Link>
        <div className="fruit-navbar__links">
          <Link to={"/"}>Home</Link>
          <Link
            to={"/shop"}
            onClick={() => {
              if (setView) {
                setView("products");
              }
            }}
          >
            Shop
          </Link>
          <Link to={"/about"}>About</Link>
          <Link to={"/contact"}>Contact</Link>
          {user?.role === "admin" && <Link to={"/admin"}>Admin</Link>}
        </div>
        <div className="fruit-navbar__auth align-content-center">
          {!welcomeUser && (
            <>
              <Link onClick={()=>{
                if (setView) {
                  setView("login");
                }
              }} className="btn btn-primary mx-2 shadow " to={"/login"}>
                Login
              </Link>
              <Link className="btn btn-primary mx-2 shadow" to={"/signup"}>
                Signup
              </Link>
              {/* import {Link} from "react-router-dom"; */}

              {/* <Link className="btn btn-primary mx-2 shadow" to={"/adminpage"}>
                Admin Panel
              </Link> */}
            </>
          )}
        </div>

        {welcomeUser && (
          <div className="fruit-navbar__user align-content-center">
            <span className="fruit-navbar__welcome text-white fw-bold me-3">
              <span className="fruit-navbar__welcome-greeting">👋 Welcome,</span>
              <strong className="fruit-navbar__welcome-name">{welcomeUser}</strong>
            </span>
            <button
              className="btn btn-secondary myborder  "
              onClick={() => {
                // localStorage.removeItem("loggedInUser");
                setWelcomeUser("");
                handleLogout();
              }}
            >
              Logout
            </button>
          </div>
        )}
        {}

        <div>

          
            <div className="fruit-navbar__cart h-100 d-flex align-items-center text-black ">
              <button
                className="fruit-navbar__cart-button fs-6 myborder"
                onClick={() => {
                  if (setView) {
                    setView("cart");
                  }
                  handleCartClick();
                  navigate("/cart");

                }}
              >
                <i className="bi bi-cart-check fs-1 "></i>
                {cartItems && cartItems.length > 0 && (
                  <span className="fruit-navbar__cart-badge">
                    {cartItems.length}
                  </span>
                )}
              </button>

              {cartItems && cartItems.length > 0 && (
                <span className="fruit-navbar__cart-meta ms-1 fs-4 fw-bold text-white">
                  Rs.{showPrice(cartItems)}
                </span>
              )}
            </div>
          
        </div>
      </div>
    </>
  );
}
