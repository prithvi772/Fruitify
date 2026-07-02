import { Link, useNavigate } from "react-router-dom";
import AdminProducts from "./AdminProducts";
import Navbar from "./Navbar";
import { useState } from "react";
import AddProducts from "./AddProducts";
import "./AdminPage.css";

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
          <div className="admin-page">
          <div className="admin-toolbar">
          <button
            className="btn btn-primary my-3"
            onClick={handleAddProductClick} // ✅ FIXED
          >
            Add Product
          </button>
          </div>

          <div className="admin-grid row g-4 px-0 px-md-2 py-4 justify-content-center">
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
          </div>
        </>
      )}
    </>
  );
}
