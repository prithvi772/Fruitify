import { useState } from "react";

export default function Bill(props) {
  let { view, setView, cartItems } = props;

  // States for customer name and mobile
  const [customerName, setCustomerName] = useState("");
  const [mobile, setMobile] = useState("");

  let grantTotal = 0;
  for (let item of cartItems) {
    grantTotal += item.qty * item.finalPrice;
  }

  return (
    <>
      <h2 className="my-1 text-center">🛒 Your Bill</h2>

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
          setView("cart");
        }}
      >
        Back to cart
      </button>
       <button
        className="btn btn-primary m-2"
        onClick={() => {
        //   setView("cart");
        alert("ordered Successfully.");
        }}
      >
        order
      </button>

      {/* 🧾 Customer Details Input */}
      <div className="text-center my-3">
        <input
          type="text"
          className="form-control w-50 mx-auto my-2"
          placeholder="Enter Customer Name"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
        />
        <input
          type="tel"
          className="form-control w-50 mx-auto my-2"
          placeholder="Enter Mobile Number"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        />
      </div>

      {/* ✅ Share Button */}
      <button
        className="btn btn-success m-2"
        onClick={() => {
          const date = "31/07/2025";

          let billText = `🧾 *Prithvi's Fruit Stall Bill*\n\n`;
          billText += `👤 *Customer:* ${customerName || "N/A"}\n📞 *Mobile:* ${mobile || "N/A"}\n📅 *Date:* ${date}\n`;
          billText += `📍 *Location:* 220, Market Yard, Pune - 411009\n\n`;

          billText += `🛒 *Items Purchased:*\n`;
          billText += `Product | Price | Qty | Total\n`;
          billText += `--------------------------------\n`;

          cartItems.forEach(item => {
            let total = item.qty * item.finalPrice;
            billText += `${item.name} | ₹${item.finalPrice} | ${item.qty} | ₹${total}\n`;
          });

          billText += `\n💰 *Grand Total:* ₹${grantTotal}\n\n`;
          billText += `🙏 Thank you for shopping with us!`;

          const encodedText = encodeURIComponent(billText);
          window.open(`https://wa.me/?text=${encodedText}`, "_blank");
        }}
      >
        📤 Share Bill on WhatsApp
      </button>
     

      {/* 🔽 Bill Display */}
      <div className="">
        <div className="myborder w-50 mx-auto  my-3 ">
          <h4>|| Shree ||</h4>
          <h4 className="text-end">Date:{new Date().toLocaleDateString()}</h4>
          <h2>Prithvi's Fruit Stall</h2>
          <h2>220,Market Yard,Pune-411009</h2>
          <hr className=" border-2 border-black" />

          <div className="d-flex justify-content-around">
            <h5>Product Name</h5>
            <h5>Final Price</h5>
            <h5>Quantity</h5>
            <h5>Total</h5>
          </div>
          <hr />

          {cartItems.map((current, index) => (
            <div key={index}>
              <div className="d-flex justify-content-around">
                <h5>{current.name}</h5>
                <h5>{current.finalPrice}</h5>
                <h5>{current.qty}</h5>
                <h5>{current.qty * current.finalPrice}</h5>
              </div>
              <hr />
            </div>
          ))}

          <div className="d-flex gap-3 justify-content-end">
            <h5>Grant Total:</h5>
            <h5>Rs: {grantTotal}</h5>
          </div>
        </div>
      </div>
    </>
  );
}
