import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "./OrderSuccess.css";

export default function OrderSuccess(props) {
  let { cartItems, setCartItems, setView, onResetProducts } = props;
  const navigate = useNavigate();
  const orderId = useMemo(() => {
    return `FTY-${Date.now().toString().slice(-6)}`;
  }, []);
  const orderDate = new Date().toLocaleDateString();
  let orderTotal = 0;
  for (let item of cartItems) {
    orderTotal += item.qty * item.finalPrice;
  }

  function handleContinueShopping() {
    setCartItems([]);
    if (onResetProducts) {
      onResetProducts();
    }
    setView("products");
    navigate("/shop");
  }

  return (
    <main className="order-success-page">
      <section className="order-success-card">
        <div className="order-success-icon">
          <i className="bi bi-check2-circle"></i>
        </div>
        <span className="order-success-eyebrow">Fruitify order confirmed</span>
        <h1>Order Placed Successfully!</h1>
        <p>
          Thank you for shopping with Fruitify. Your fresh fruits will be packed
          carefully and prepared for delivery.
        </p>

        <div className="order-success-meta">
          <div>
            <span>Order ID</span>
            <strong>{orderId}</strong>
          </div>
          <div>
            <span>Date</span>
            <strong>{orderDate}</strong>
          </div>
          <div>
            <span>Total</span>
            <strong>Rs.{orderTotal}</strong>
          </div>
        </div>

        <div className="order-summary">
          <h2>Order Summary</h2>
          {cartItems.map((item) => (
            <div className="order-summary-row" key={item.id}>
              <span>{item.name}</span>
              <span>Qty {item.qty}</span>
              <strong>Rs.{item.qty * item.finalPrice}</strong>
            </div>
          ))}
        </div>

        <button className="btn btn-primary" onClick={handleContinueShopping}>
          Continue Shopping
        </button>
      </section>
    </main>
  );
}
