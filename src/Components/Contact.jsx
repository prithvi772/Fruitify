import Navbar from "./Navbar";
import Footer from "./Footer";
import "./Contact.css";

export default function Contact(props) {
  let { user, setUser, cartItems, setCartItems, list, setList, setView, onCartClick } = props;

  return (
    <>
      <Navbar
        user={user}
        setUser={setUser}
        cartItems={cartItems}
        setCartItems={setCartItems}
        list={list}
        setList={setList}
        setView={setView}
        onCartClick={onCartClick}
      />

      <main className="contact-page">
        <section className="contact-hero">
          <span className="contact-eyebrow">Contact us</span>
          <h1>Need help with fruits, orders or product availability?</h1>
          <p>Send a message or use the business details below to reach the store.</p>
        </section>

        <section className="contact-layout">
          <form className="contact-form">
            <div>
              <label>Name</label>
              <input type="text" placeholder="Enter your name" />
            </div>
            <div>
              <label>Email</label>
              <input type="email" placeholder="Enter your email" />
            </div>
            <div>
              <label>Message</label>
              <textarea rows="5" placeholder="How can we help?"></textarea>
            </div>
            <button type="button" className="btn btn-primary">
              Send Message
            </button>
          </form>

          <div className="contact-info">
            <article>
              <i className="bi bi-telephone"></i>
              <div>
                <h3>Phone</h3>
                <p>+91 98765 43210</p>
              </div>
            </article>
            <article>
              <i className="bi bi-envelope"></i>
              <div>
                <h3>Email</h3>
                <p>hello@fruitify.com</p>
              </div>
            </article>
            <article>
              <i className="bi bi-geo-alt"></i>
              <div>
                <h3>Address</h3>
                <p>220, Market Yard, Pune - 411009</p>
              </div>
            </article>
            <article>
              <i className="bi bi-clock"></i>
              <div>
                <h3>Business Hours</h3>
                <p>Mon - Sun, 8:00 AM - 9:00 PM</p>
              </div>
            </article>

            <div className="contact-social">
              <i className="bi bi-instagram"></i>
              <i className="bi bi-facebook"></i>
              <i className="bi bi-whatsapp"></i>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
