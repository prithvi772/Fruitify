import "./Bill.css";

export default function Bill(props) {
  let { view, setView, cartItems } = props;
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  const customerName = loggedInUser?.name || "Customer";

  let grantTotal = 0;
  for (let item of cartItems) {
    grantTotal += item.qty * item.finalPrice;
  }

  return (
    <>
      <div className="bill-page">
      <h2 className="bill-title my-1 text-center">🛒 Your Bill</h2>

      <div className="bill-actions">
      <button
        className="btn btn-primary m-2"
        onClick={() => {
          setView("order-success");
        }}
      >
        Order Now
      </button>
      </div>

      {/* 🔽 Bill Display */}
      <div className="bill-receipt-wrap">
        <div className="bill-receipt myborder mx-auto  my-3 ">
          <h4>|| Shree ||</h4>
          <h4 className="text-end">Date:{new Date().toLocaleDateString()}</h4>
          <h2>Fruitify</h2>
          <h2>220,Market Yard,Pune-411009</h2>
          <div className="bill-customer-line">
            Customer: <strong>{customerName}</strong>
          </div>
          <hr className=" border-2 border-black" />

          <div className="bill-row bill-row--head d-flex justify-content-around">
            <h5>Product Name</h5>
            <h5>Final Price</h5>
            <h5>Quantity</h5>
            <h5>Total</h5>
          </div>
          <hr />

          {cartItems.map((current, index) => (
            <div key={index}>
              <div className="bill-row d-flex justify-content-around">
                <h5>{current.name}</h5>
                <h5>{current.finalPrice}</h5>
                <h5>{current.qty}</h5>
                <h5>{current.qty * current.finalPrice}</h5>
              </div>
              <hr />
            </div>
          ))}

          <div className="bill-total d-flex gap-3 justify-content-end">
            <h5>Grant Total:</h5>
            <h5>Rs: {grantTotal}</h5>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}
