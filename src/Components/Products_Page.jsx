import Products from "./Products";
export default function Products_Page(props) {
  let { list } = props;
  function handleAddToCart(product_id) {
    props.onAddCart(product_id);
  }
  function handleQuantity(QuantId, op) {
    props.onQuant(QuantId, op);
  }

  return (
    <>
      <div className=" row  p-4">
        {list.map((e, index) => {
          return (
            <Products
            key={e.id}
              product_list={e}
              onAddToCart={handleAddToCart}
              onQuant={handleQuantity}
            ></Products>
          );
        })}
      </div>
    </>
  );
}
