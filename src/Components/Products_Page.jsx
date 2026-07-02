import Products from "./Products";
export default function Products_Page(props) {
  let {
    list,
    searchText,
    setSearchText,
    sortBy,
    setSortBy,
  } = props;
  function handleAddToCart(product_id) {
    props.onAddCart(product_id);
  }
  function handleQuantity(QuantId, op) {
    props.onQuant(QuantId, op);
  }

  return (
    <>
      <div className="shop-toolbar">
        <div className="shop-toolbar__search">
          <label>Search</label>
          <input
            type="search"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search fresh fruits..."
          />
        </div>

        <div className="shop-toolbar__control">
          <label>Sort</label>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="">Recommended</option>
            <option value="price-low-high">Price: Low to High</option>
            <option value="price-high-low">Price: High to Low</option>
            <option value="name-a-z">Name: A-Z</option>
          </select>
        </div>

      </div>

      {list.length === 0 && (
        <div className="shop-empty-state">
          <i className="bi bi-search"></i>
          <h3>No fruits found</h3>
          <p>Try a different search term or choose another fruit category.</p>
        </div>
      )}

      <div className="product-grid row g-4 px-0 px-md-2 py-4 justify-content-center">
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
