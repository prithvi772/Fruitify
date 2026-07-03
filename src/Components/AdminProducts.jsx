import axios from "axios";
import "./Products.css";
import "./AdminProducts.css";
export default function Products(props) {
  let { product_list, setList, list } = props;
  function discount(list) {
    let dis = (list.mrp * list.discount) / 100;
    let result = list.mrp - dis;
    return result;
  }
  function handleEditBtnClick(singleProduct) {
    props.onEditBtnClick(singleProduct);
  }
  async function handleDeleteBtn(passedList) {
    const confirmDelete = window.confirm("Do you really want to delete?");
    if (!confirmDelete) return; // 🛑 Stop if user clicks Cancel
    let updatedDeletedList = list.filter((current, index) => {
      return current.id != passedList.id;
    });
    console.log("List after deleted item:", product_list);
    await axios.delete(`https://fruitify-api.onrender.com/fruits/${passedList.id}`);
    setList(updatedDeletedList);
  }
  let storedUser = JSON.parse(localStorage.getItem("loggedInUser"));
  return (
    <>
      <div key={product_list.id} className="product_card admin-product-card col-12 col-sm-6 col-lg-4 col-xl-3 my-2 d-flex">
        <div className="product-card myborder rounded-4">
          {product_list.discount > 0 ? (
            <h3 className="product-card__badge bg-success">Discount:{product_list.discount}%</h3>
          ) : (
            <h3 className="product-card__badge bg-danger">Discount:0%</h3>
          )}
          <img className="product-card__image" src={`/Images/${product_list.image}`}></img>
          {product_list.discount > 0 ? (
            <div className="product-card__price-row d-flex myborder my-2 bg-warning ">
              <h3 className="product-card__old-price text-decoration-line-through">
                Rs.{product_list.mrp}
              </h3>
              <h3 className="product-card__price">Rs.{discount(product_list)}</h3>
            </div>
          ) : (
            <div className="product-card__price-row my-2 myborder bg-warning">
              <h3 className="product-card__price">Rs.{product_list.mrp}</h3>
            </div>
          )}
          <h3 className="product-card__title">{product_list.name}</h3>
          {storedUser.role == "admin" && (
            <div className="admin-product-actions d-flex justify-content-around ">
              <button
                onClick={() => {
                  handleEditBtnClick(product_list);
                  // alert("Edit button");
                }}
                className="btn btn-primary myborder"
              >
                Edit
              </button>
              <button
                onClick={() => {
                  // alert("delete button");
                  handleDeleteBtn(product_list);
                }}
                className="btn btn-danger myborder"
              >
                delete
              </button>
            </div>
          )}
          {storedUser.role == "user" && (
            <button
              onClick={() => {}}
              className="btn btn-primary myborder"
            >
              Add to cart
            </button>
          )}

          {product_list.inStock == false && (
            <button className="btn btn-secondary myborder">
              Out Of Stock
            </button>
          )}
        </div>
      </div>
    </>
  );
}
