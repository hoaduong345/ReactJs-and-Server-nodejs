// import { useState } from "react";

function SearchBar() {
//   const [input, setInput] = useState("");

//   const handleSearch = (name) => {
//     axios.get('/products/search', { params: { name } })
//       .then((response) => {
//         setProducts(response.data);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };
  
  return (
    <input
      type="text"
      placeholder="Search..."
      className="input input-bordered md:w-auto text-white w-96"
    />
  );
}

export default SearchBar;
