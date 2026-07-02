import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__main">
        <div>
          <img className="site-footer__logo" src="/Images/shop_logo.jpg" alt="Fruitify logo" />
          <p>
            Fruitify brings fresh fruits, simple shopping and dependable service
            for everyday healthy choices.
          </p>
        </div>

        <div>
          <h5>Explore</h5>
          <Link to="/">Home</Link>
          <Link to="/shop">Shop</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <div>
          <h5>Contact</h5>
          <span>220, Market Yard, Pune - 411009</span>
          <span>+91 98765 43210</span>
          <span>hello@fruitify.com</span>
        </div>

        <div>
          <h5>Follow</h5>
          <div className="site-footer__social">
            <i className="bi bi-instagram"></i>
            <i className="bi bi-facebook"></i>
            <i className="bi bi-whatsapp"></i>
          </div>
        </div>
      </div>
      <div className="site-footer__bottom">
        <span>© 2026 Fruitify. Built with React and Bootstrap.</span>
      </div>
    </footer>
  );
}
