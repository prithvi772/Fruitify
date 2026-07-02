import Navbar from "./Navbar";
import Footer from "./Footer";
import "./About.css";

export default function About(props) {
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

      <main className="about-page">
        <section className="about-hero">
          <div>
            <span className="about-eyebrow">About Fruitify</span>
            <h1>A simple fresh fruit delivery experience built for clarity.</h1>
            <p>
              Fruitify presents a local fresh fruit service as a modern React
              e-commerce website with shopping, cart, billing and admin product
              management.
            </p>
          </div>
          <img src="/Images/pineapple.jpg" alt="Fresh pineapple" />
        </section>

        <section className="about-grid">
          <article>
            <h2>Our Story</h2>
            <p>
              The idea behind Fruitify is straightforward: make everyday fruit shopping feel
              clean, organized and easy to understand. The website keeps the
              charm of a local fresh fruit store while improving presentation and usability.
            </p>
          </article>
          <article>
            <h2>Mission</h2>
            <p>
              To help customers browse fresh fruits, understand prices and
              complete a cart-to-bill flow without unnecessary complexity.
            </p>
          </article>
          <article>
            <h2>Vision</h2>
            <p>
              To grow this project into a practical, portfolio-ready grocery
              experience that shows both frontend polish and working CRUD flows.
            </p>
          </article>
        </section>

        <section className="about-quality">
          <div>
            <span className="about-eyebrow">Quality focus</span>
            <h2>Fresh visuals, clear information and dependable interaction.</h2>
            <p>
              The product cards, cart, bill and admin screens are designed to
              keep details visible, actions obvious and the overall experience
              responsive across devices.
            </p>
          </div>
          <div className="about-quality__stats">
            <span>Fresh stock</span>
            <span>Simple billing</span>
            <span>Admin control</span>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
