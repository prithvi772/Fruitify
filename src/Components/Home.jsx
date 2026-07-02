import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "./Home.css";

export default function Home(props) {
  let { user, setUser, cartItems, setCartItems, list, setList, setView, onCartClick } = props;

  const featuredProducts = [
    { name: "Mango", image: "mango.jpg", price: 184, tag: "Seasonal pick" },
    { name: "Watermelon", image: "watermelon.jpg", price: 40, tag: "Family favorite" },
    { name: "Pomegranate", image: "pomegranete.jpg", price: 190, tag: "Fresh stock" },
    { name: "Grapes", image: "grapes.jpg", price: 240, tag: "Best seller" },
  ];

  const categories = [
    { title: "Daily Fruits", image: "banana.jpg" },
    { title: "Premium Picks", image: "dragon.jpg" },
    { title: "Juicy Favorites", image: "orange.jpg" },
    { title: "Healthy Bowls", image: "apple.jpg" },
  ];

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

      <main className="home-page">
        <section className="home-hero">
          <div className="home-hero__content">
            {/* <span className="home-eyebrow"></span> */}
            <h1>Fresh Fruits. Better Choices. Every Day.</h1>
            <p>
              Discover handpicked fresh fruits at affordable prices. Browse seasonal varieties, compare prices, and enjoy a simple shopping experience.
            </p>
            <div className="home-hero__actions">
              <Link className="btn btn-primary" to="/shop">
                Shop Now
              </Link>
              <Link className="btn btn-outline-primary" to="/about">
                Know More
              </Link>
            </div>
          </div>
          <div className="home-hero__media">
            <img src="/Images/avocados.jpg" alt="Fresh fruits display" />
          </div>
        </section>

        <section className="home-section">
          <div className="home-section__heading">
            <span className="home-eyebrow">Why choose us</span>
            <h2>Simple grocery shopping, made reliable.</h2>
          </div>
          <div className="home-benefits">
            <article>
              <i className="bi bi-basket2"></i>
              <h3>Fresh Selection</h3>
              <p>Fruit options are presented clearly with prices, discounts and stock state.</p>
            </article>
            <article>
              <i className="bi bi-cart-check"></i>
              <h3>Easy Cart</h3>
              <p>Add, update quantities and move to billing without a confusing flow.</p>
            </article>
            <article>
              <i className="bi bi-shield-check"></i>
              <h3>Admin Ready</h3>
              <p>Product management remains available for admin users in the same project.</p>
            </article>
          </div>
        </section>

        <section className="home-section">
          <div className="home-section__heading">
            <span className="home-eyebrow">Categories</span>
            <h2>Shop by fruit mood.</h2>
          </div>
          <div className="home-categories">
            {categories.map((category) => (
              <Link to="/shop" key={category.title} className="home-category">
                <img src={`/Images/${category.image}`} alt={category.title} />
                <span>{category.title}</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="home-section">
          <div className="home-section__heading">
            <span className="home-eyebrow">Featured products</span>
            <h2>Popular picks this week.</h2>
          </div>
          <div className="home-featured">
            {featuredProducts.map((product) => (
              <article className="home-featured-card" key={product.name}>
                <img src={`/Images/${product.image}`} alt={product.name} />
                <span>{product.tag}</span>
                <h3>{product.name}</h3>
                <p>From Rs.{product.price}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="home-newsletter">
          <div>
            <span className="home-eyebrow">Stay updated</span>
            <h2>Get fruit offers and seasonal updates.</h2>
            <p>No noisy marketing, just a clean newsletter-style CTA for the portfolio site.</p>
          </div>
          <div className="home-newsletter__form">
            <input type="email" placeholder="Enter your email" />
            <button className="btn btn-primary">Subscribe</button>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
