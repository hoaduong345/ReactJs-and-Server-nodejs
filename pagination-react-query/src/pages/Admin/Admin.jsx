import { CgFileDocument } from "react-icons/cg";
import { AiOutlineDelete } from "react-icons/ai";
import { adminAction, deleteProduct, updateProduct } from "../../services/api";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { useState } from "react";
import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { QueryClient } from "@tanstack/react-query";
// import { Router } from "express";
const Admin = () => {
  const [setSelectedProductData] = useState(null);
  const { data: formData } = useQuery(
    {
      queryKey: ["getall"],
      queryFn: () => adminAction(formData),
      keepPreviousData: true,
    },
    []
  );

  const handleDelete = async (productId, productName) => {
    try {
      const confirmed = window.confirm(`Are you sure to delete ${productName}?`);
      
      if (confirmed) {
        await deleteProduct(productId);
        toast.success(`${productName} has been deleted successfully!`, {
          position: "top-right",
          autoClose: 3000,
        });
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (productId) => {
    try {
      // Fetch the selected product data by ID
      const { data } = await updateProduct(productId);

      // Set the selected product data to the state variable
      setSelectedProductData(data);
    } catch (error) {
      console.log("Error fetching product data:", error);
    }
  };
  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra">
        {/* head */}
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Details</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Category</th>
            <th>Image</th>
            <th>Size</th>
            <th>Color</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {formData != undefined
            ? formData.data.data.map((e, i) => {
                return (
                  <tr key={i} className="text-base text-white">
                    {/* row 1 */}
                    <th>{e._id}</th>
                    <th>{e.name}</th>
                    <th>{e.detail}</th>
                    <th>{e.quantity}</th>
                    <th>{e.price}</th>
                    <th>{e.category}</th>
                    <th>
                      <img
                        className="w-[100px]"
                        src={`http://localhost:8000/${e.image[0]}`}
                        alt=""
                      />
                    </th>
                    <th>{e.size}</th>
                    <th>{e.color}</th>
                    <th className="flex items-center justify-center">
                      <button
                        className="mx-1 text-2xl"
                        onClick={() => handleDelete(e._id, e.name)}
                      >
                        <AiOutlineDelete />
                      </button>
                      <Link
                        to={`/update/${e._id}`} // Navigate to the update form page with the product ID as a URL parameter
                      >
                        <button
                          className="mx-1 mt-1 text-2xl"
                          onClick={() => handleUpdate(e._id)}
                        >
                          <CgFileDocument />
                        </button>
                      </Link>
                    </th>
                    {/* row 6 */}
                  </tr>
                );
              })
            : null}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;
