import { Link, useNavigate } from "react-router-dom";
import AdminProducts from "./AdminProducts";
import Navbar from "./Navbar";
import { useState } from "react";
import AddProducts from "./AddProducts";

export default function AdminPage(props) {
  let { list, setList, user, setUser,refreshList } = props;
  let [view, setView] = useState("adminproducts");
  let [productToBeEdited, setProductToBeEdited] = useState({});
  // let navigate = useNavigate();
  function handleListClick() {
    setView("adminproducts");
  }
  function handleEditBtnClick(singleProduct) {
    setProductToBeEdited(singleProduct);
    setView("addproducts");

    console.log(singleProduct);
  }

  function handleAddProductClick() {
    setProductToBeEdited(null); // reset to add mode
    setView("addproducts");
  }

  return (
    <>
      <Navbar user={user} setUser={setUser} />
      {/* <Link className="fs-4" to="/AddProducts">Add Product</Link> */}
      {view == "addproducts" && (
        <AddProducts
          onListClick={handleListClick}
          productToBeEdited={productToBeEdited}
          refreshList={refreshList} // ✅ pass this down
          setView={setView}
        ></AddProducts>
      )}
      {view == "adminproducts" && (
        <>
          <button
            className="btn btn-primary my-3"
            onClick={handleAddProductClick} // ✅ FIXED
          >
            Add Product
          </button>

          <div className="row p-4">
            {view == "adminproducts" &&
              list.map((e, index) => (
                <AdminProducts
                  key={e.id}
                  product_list={e}
                  list={list}
                  setList={setList}
                  onEditBtnClick={handleEditBtnClick}
                />
              ))}
          </div>
        </>
      )}
    </>
  );
}
