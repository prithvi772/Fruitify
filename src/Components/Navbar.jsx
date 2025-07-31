import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
    props.onCartClick();
    
  }
  function handleLogout() {
    localStorage.removeItem("loggedInUser"); //optional
    setUser(null); // ✅ this is the important fix
    let resetList = list.map((current, index) => {
      return { ...current, qty: 0 };
    });
    setList(resetList); // ✅ reset product list in parent (App or Ecomm)
    setCartItems([]); // ✅ clear cart
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
      <div className=" d-flex justify-content-around bg-danger myborder rounded-3">
        <Link className="text-start" to={"/"}>
          <img onClick={()=>{
            setView("products");
          }} className="w-50 myborder" src={"/Images/shop_logo.jpg"}></img>
        </Link>
        <div className="align-content-center">
          {!welcomeUser && (
            <>
              <Link onClick={()=>{
                setView("login");
              }} className="btn btn-primary mx-2 shadow " to={"/login"}>
                Login
              </Link>
              <Link className="btn btn-primary mx-2 shadow" to={"/signin"}>
                Sign Up
              </Link>
              {/* import {Link} from "react-router-dom"; */}

              {/* <Link className="btn btn-primary mx-2 shadow" to={"/adminpage"}>
                Admin Panel
              </Link> */}
            </>
          )}
        </div>

        {welcomeUser && (
          <div className="align-content-center">
            <span className="text-white fw-bold me-3">
              Welcome, {welcomeUser}
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

          
            <div className=" h-100 d-flex align-items-center text-black ">
              <button
                className=" fs-6 myborder"
                onClick={() => {
                  setView("cart");
                  handleCartClick();

                }}
              >
                <i className="bi bi-cart-check fs-1 "></i>
              </button>

              {cartItems && cartItems.length > 0 && (
                <span className="ms-1 fs-4 fw-bold text-white mx-2">
                  Cart Items:{cartItems.length}
                </span>
              )}
              {cartItems && cartItems.length > 0 && (
                <span className="ms-1 fs-4 fw-bold text-white">
                  Rs.{showPrice(cartItems)}
                </span>
              )}
            </div>
          
        </div>
      </div>
    </>
  );
}
