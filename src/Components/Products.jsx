import { useState } from "react";
import "./Products.css";

export default function Products(props) {
  let { product_list } = props;
  const ratings = {
    "11": 4.6,
    "12": 4.4,
    "13": 4.7,
    "14": 4.8,
    "15": 4.5,
    "16": 4.6,
    "17": 4.3,
    "18": 4.2,
    "19": 4.7,
    "6923": 4.1,
    "19e3": 4.8,
    ba9b: 4.6,
    "39e8": 4.2,
    b0f4: 4.0,
  };
  const rating = ratings[product_list.id] || 4.4;
  const stockLabel =
    product_list.instock === false
      ? "Currently Unavailable"
      : Number(product_list.discount) >= 20
      ? "Limited Stock"
      : Number(product_list.discount) > 0
      ? "Available Today"
      : "Farm Fresh";
  const stockClass =
    product_list.instock === false
      ? "product-card__stock--muted"
      : Number(product_list.discount) >= 20
      ? "product-card__stock--limited"
      : "product-card__stock--fresh";
  function discount(list) {
    let dis = (list.mrp * list.discount) / 100;
    let result = list.mrp - dis;
    return result;
  }

  function addToCart(id) {
    props.onAddToCart(id);
  }
  function Quantity(quantityId, op) {
    props.onQuant(quantityId, op);
  }

  return (
    <>
    {console.log("inStock type:", typeof product_list.instock, product_list.instock)
}
      <div key={product_list.id} className="product_card col-12 col-sm-6 col-lg-4 col-xl-3 my-2 d-flex">
        <div className="product-card myborder rounded-4">
          {product_list.discount > 0 ? (
            <h3 className="product-card__badge bg-success">Discount:{product_list.discount}%</h3>
          ) : (
            <h3 className="product-card__badge bg-danger">Discount:0%</h3>
          )}
          <img className="product-card__image" src={`/Images/${product_list.image}`}></img>
          <div className="product-card__meta">
            <span className={`product-card__stock ${stockClass}`}>
              {stockLabel}
            </span>
            <span className="product-card__rating">
              ★★★★☆ <strong>{rating}</strong>
            </span>
          </div>
          {product_list.discount > 0 ? (
            <div className="product-card__price-row d-flex myborder my-2 bg-warning ">
              <h3 className="product-card__old-price text-decoration-line-through">
                Rs.{product_list.mrp}
              </h3>
              <h3 className="product-card__price">Rs.{discount(product_list)}</h3>
            </div>
          ) : (
            <div className="product-card__price-row my-2 myborder bg-warning">
              <h3 className="product-card__price">Rs.{product_list.mrp} </h3>
            </div>
          )}
          <h3 className="product-card__title">{product_list.name}</h3>
          {product_list.instock===true && product_list.qty == 0 && (
            <button
              onClick={() => {
                addToCart(product_list.id);
              }}
              className="product-card__button btn btn-primary myborder"
            >
              Add to Card
            </button>
          )}
          {product_list.instock === false && (
            <button onClick={()=>{alert("Product is out of stock.")}} className="product-card__button btn btn-secondary myborder">
              Out Of Stock
            </button>
          )}

          {product_list.instock && product_list.qty != 0 && (
            <div className="product-card__quantity d-flex  justify-content-around">
              <button
                onClick={() => {
                  Quantity(product_list.id, "-");
                }}
                className="btn btn-primary"
              >
                -
              </button>

              <h4>Quantity:{product_list.qty}</h4>

              <button
                onClick={() => {
                  Quantity(product_list.id, "+");
                }}
                className="btn btn-primary"
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
