/* eslint-disable react/prop-types */

// import Shoes from "../asset/shoes.jpg";
import { Link } from "react-router-dom";
const ProductList = ({ products }) => {
  console.log("productlist", products);
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {products.map((product, i) => (
        <div
          key={i}
          className="card w-full shadow-xl bg-primary-content text-black "
        >
          <Link to={`/details/${product._id}`}>
            <div>
              <img
                src={`http://localhost:8000/${product.image[0]}`}
                alt="Shoes"
                className="rounded-md h-72 w-72"
              />
            </div>

            <div className="card-body h-52">
              {/* <p>#post{product._id}</p> */}
              <h2 className="card-title">
                {product.name.length > 12
                  ? product.name.slice(0, product.name.lastIndexOf(" ", 12)) +
                    "..."
                  : product.name}
                <div className="badge badge-secondary">NEW</div>
              </h2>
              {/* <p>{product.body}</p> */}
              <p>Price:{product.price}$</p>
              <div className="card-actions justify-center mt-3">
                <div className="badge badge-outline w-36 bg-slate-600 font-bold text-white h-9">
                  Add to Cart
                </div>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
