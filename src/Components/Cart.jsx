import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import SingleCartItem from "./SingleCartItem";
import Bill from "./Bill";
import "./Cart.css";

export default function Cart(props) {
  let { cartItems, setCartItems, view, setView } = props;

  let navigate = useNavigate();
  function displayCart() {
    navigate("/cart");
  }
  function handleQuantity(QuantId, op) {
    props.onQuant(QuantId, op);
  }

  return (
    <>
      {cartItems.length >= 1 && (
        <div className="cart-header">
          <h2 className="cart-title my-1 text-center">🛒 Your Cart</h2>
          <div className="cart-actions">
          <button
            className="btn btn-primary m-2"
            onClick={() => {
              setView("homepage");
            }}
          >
            Wanna Shop more?
          </button>
          <button
            className="btn btn-primary m-2"
            onClick={() => {
              setView("bill");
            }}
          >
            proceed to bill
          </button>
          </div>
        </div>
      )}

      {/* <Navbar></Navbar> */}
      {/* <button className="btn btn-primary my-2" onClick={()=>{
        setView("products");
      }}>Products</button> */}
      {cartItems.length == 0 && (
        <div className="cart-empty container my-5">
          <h2>🛒 Your Cart</h2>
          <h4>Cart is empty </h4>
          <button
            className="btn btn-primary"
            onClick={() => {
              // alert("hello")
              // displayCart();
              // navigate("/");
              setView("homepage");
            }}
          >
            Keep Shopping
          </button>
        </div>
      )}

      <div className="cart-grid row g-4 px-0 px-md-2 py-4 justify-content-center">
        {cartItems.map((e, index) => {
          return (
            <SingleCartItem
              key={e.id}
              product_list={e}
              // onAddToCart={handleAddToCart}
              onQuant={handleQuantity}
            ></SingleCartItem>
          );
        })}
      </div>
    </>
  );
}
