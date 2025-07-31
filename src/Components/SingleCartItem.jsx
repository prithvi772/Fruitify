import { useState } from "react";

export default function SingleCartItem(props) {
  let { product_list } = props;
  function discount(list) {
    let dis = (list.mrp * list.discount) / 100;
    let result = list.mrp - dis;
    return result;
  }

//   function addToCart(id) {
//     props.onAddToCart(id);
//   }
  function Quantity(quantityId, op) {
    props.onQuant(quantityId, op);
  }

  return (
    <>
      {/* {console.log(
        "inStock type:",
        typeof product_list.instock,
        product_list.instock
      )} */}
      <div key={product_list.id} className="product_card  col-3 my-2">
        <div className="myborder border-danger rounded-4 p-4 my-3">
          {product_list.discount > 0 ? (
            <h3 className="bg-success">Discount:{product_list.discount}%</h3>
          ) : (
            <h3 className="bg-danger">Discount:0%</h3>
          )}
          <img className="" src={`/Images/${product_list.image}`}></img>
          {product_list.discount > 0 ? (
            <div className="d-flex myborder my-2 bg-warning ">
              <h3 className="text-decoration-line-through mx-5 ">
                Rs.{product_list.mrp}
              </h3>
              <h3 className="">Rs.{discount(product_list)}</h3>
            </div>
          ) : (
            <div className="my-2 myborder bg-warning">
              <h3 className="">Rs.{product_list.mrp} </h3>
            </div>
          )}
          <h3>{product_list.name}</h3>
          {product_list.instock === true && product_list.qty == 0 && (
            <button
              onClick={() => {
                addToCart(product_list.id);
              }}
              className="btn btn-primary col-8 myborder"
            >
              Add to Card
            </button>
          )}
          {product_list.instock === false && (
            <button
              onClick={() => {
                alert("Product is out of stock.");
              }}
              className="btn btn-secondary col-8 myborder"
            >
              Out Of Stock
            </button>
          )}

          {product_list.instock && product_list.qty != 0 && (
            <div className="d-flex  justify-content-around">
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
