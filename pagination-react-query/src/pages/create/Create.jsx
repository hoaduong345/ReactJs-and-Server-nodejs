import { AddShoes } from "../../services/api";
import {  useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { getCategory } from "../../services/api";
import { useQuery } from "react-query";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "../../utils/rules";
import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const schemaCreate = schema.omit(["confirmpassword", "email", "password", "nameuser"])

export default function Create() {
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaCreate),
  });
  const navigate = useNavigate();
  const [, setName] = useState("");
  const [detail, setDetail] = useState("");
  const [, setPrice] = useState("");
  const [, setCategory] = useState("");
  const [, setSize] = useState("");
  const [, setColor] = useState("");
  const [, setQuantity] = useState("");
  const [image, setImage] = useState(null);

  const { data, isLoading, isError } = useQuery("categories", () =>
    getCategory({})
  );


  const onSubmit = handleSubmit(async (data) => {
    // if (response) setStatus(response.statusText)
    // Create a new FormData object to send the data and image as multipart/form-data
    const formData = new FormData();
    formData.append("file", image);
    formData.append("name", data.name);
    formData.append("detail", data.details);
    formData.append("quantity", data.quantity);
    formData.append("price",data.price);
    formData.append("category", data.category);
    formData.append("size", data.size);
    formData.append("color", data.color);
    console.log('formData',formData.get("file"))
    try {
      // Call the API to add the new shoe
      const response = await AddShoes(formData);
      // Do something with the response if needed (e.g., show a success message)
      console.log(response);
      toast.success(
        "Create new Successfully",
        {
          position: "top-right",
          autoClose: 5000,
          // Custom styles for the toast
          toastStyle: {
            background: "#4CAF50",
            color: "#fff",
            border: "1px solid #4CAF50",
          },
        }
      );
      navigate("/admin")
      // Clear the form fields after successful submission
      setName("");
      setDetail("");
      setPrice("");
      setCategory("");
      setQuantity("");
      setSize("");
      setColor("");
      setImage(null);
    } catch (error) {
      toast.warning(
        "Create Failed",
        {
          position: "top-right",
          autoClose: 5000,
          // Custom styles for the toast
          toastStyle: {
            background: "#4CAF50",
            color: "#fff",
            border: "1px solid #4CAF50",
          },
        }
      );
      // Handle error here (e.g., show an error message)
      console.error("Error adding shoe:", error);
      toast.warn(
        "Create Failed",
        {
          position: "top-right",
          autoClose: 5000,
          // Custom styles for the toast
          toastStyle: {
            background: "#4CAF50",
            color: "#fff",
            border: "1px solid #4CAF50",
          },
        }
      );
    }
  });
  const handleFileSelected = (e) => {
    const files = e.target.files;
    setImage(files[0]);
  };

  const handleColorSelect = (e) => {
    setColor(e.target.value);
  };

  const handleCategorySelect = (e) => {
    setCategory(e.target.value);
  };
  const handleSizeSelect = (e) => {
    // Here, you can handle multiple size selections (checkboxes) and store them as an array if needed.
    // For simplicity, I'll assume you only want to store one selected size as a string.

    // Check if the checkbox is checked
    if (e.target.checked) {
      setSize(e.target.value); // Set the selected size to the state
    } else {
      setSize(""); // If the checkbox is unchecked, clear the size state (assuming one selection only)
    }
  };
  const handleDetailChange = (event, editor) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(editor.getData(), 'text/html');
    const pElements = doc.getElementsByTagName('p');
    if (pElements.length) {
      const value = pElements[0].innerHTML;
      setDetail(value);
      setValue("details", value, {
        shouldValidate: true,
        shouldDirty: true
      })
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error loading data</div>;
  }
  
  return (
    <>
      <form
        onSubmit={onSubmit}
        method="POST"
        encType="multipart/form-data"
      >
        <div className="w-full  mt-4 bg-slate-300">
          <div className="flex flex-col items-center justify-center pt-2">
            <h1 className="title  text-black font-bold text-[30px]">
              CRUD Operation
            </h1>
            <input type="hidden" name="id" />

            <div className="mt-10 w-full max-w-xl">
              {errors.name && (
                <span className="text-red-500 text-xs">
                  {errors.name.message}
                </span>
              )}
              <input
                name="name"
                type="text"
                placeholder="Name"
                className="input input-bordered w-full max-w-xl text-white"
                onChange={(e) => setName(e.target.value)}
                {...register("name")}
              />
            </div>
            <div className="w-full max-w-xl mt-2">
              {errors.quantity && (
                <span className="text-red-500 text-xs">
                  {errors.quantity.message}
                </span>
              )}
              <input
                name="quantity"
                type="number"
                placeholder="Quantity"
                className="input input-bordered w-full max-w-xl text-white"
                onChange={(e) => setQuantity(e.target.value)}
                {...register("quantity")}
              />
            </div>

            <div className="w-full max-w-xl mt-2">
              {errors.price && (
                <span className="text-red-500 text-xs">
                  {errors.price.message}
                </span>
              )}
              <input
                name="price"
                type="number"
                placeholder="Price"
                className="input input-bordered w-full max-w-xl text-white"
                onChange={(e) => setPrice(e.target.value)}
                {...register("price")}
              />
            </div>
            <div className="w-full max-w-xl mt-2">
              {errors.category && (
                <span className="text-red-500 text-xs">
                  {errors.category.message}
                </span>
              )}
              <select
                className="select select-info w-full max-w-xl text-white"
                onChange={handleCategorySelect}
                {...register("category")}
              >
                <option value="" disabled selected>
                  Select categories
                </option>
                {data &&
                  data.data.map((category) => (
                    <option key={category._id} value={category.namecategory} name="category"  >
                      {category.namecategory}
                    </option>
                  ))}
              </select>
            </div>

            <div className="w-full max-w-xl mt-2" name="detail">
              {errors.details && (
                <span className="text-red-500 text-xs mt-2">
                  {errors.details.message}
                </span>
              )}
      
                <CKEditor
                  editor={ClassicEditor}
                  className="h-64 text-black"
                  value={detail}
                  name = 'details'
                  onReady={(editor) => {
                    // You can store the "editor" and use when it is needed.
                    console.log("Editor is ready to use!", editor);
                  }}
                  onChange={handleDetailChange}
                  onBlur={(event, editor) => {
                    console.log("Blur.", editor);
                  }}
                  onFocus={(event, editor) => {
                    console.log("Focus.", editor);
                  }}
                />
            </div>

            <div
              className="form-control w-full max-w-xl mt-2 boder-2"
              name="size"
            >
              {errors.size && (
                <span className="text-red-500 text-xs">
                  {errors.size.message}
                </span>
              )}
              <h1 className="text-black font-bold">Choose size</h1>
              <label className="cursor-pointer label">
                <span className="label-text text-black font-bold">X</span>
                <input
                  type="checkbox"
                  className="checkbox checkbox-success"
                  value="X"
                  onChange={handleSizeSelect}
                  {...register("size")}
                />
              </label>
              <label className="cursor-pointer label">
                <span className="label-text text-black font-bold">M</span>
                <input
                  type="checkbox"
                  className="checkbox checkbox-success"
                  value="M"
                  onChange={handleSizeSelect}
                  {...register("size")}
                />
              </label>
              <label className="cursor-pointer label">
                <span className="label-text text-black font-bold">L</span>
                <input
                  type="checkbox"
                  className="checkbox checkbox-success"
                  value="L"
                  onChange={handleSizeSelect}
                  {...register("size")}
                />
              </label>
              <label className="cursor-pointer label">
                <span className="label-text text-black font-bold">XXL</span>
                <input
                  type="checkbox"
                  className="checkbox  checkbox-success"
                  value="XXL"
                  onChange={handleSizeSelect}
                  {...register("size")}
                />
              </label>
            </div>
            <div className="w-full max-w-xl mt-2">
              {errors.color && (
                <span className="text-red-500 text-xs">
                  {errors.color.message}
                </span>
              )}
              <select
                className="select select-info w-full max-w-xl text-white"
                name="color"
                onChange={handleColorSelect}
                {...register("color")}
              >
                <option disabled selected>
                  Choose your color
                </option>
                <option>RED</option>
                <option>YELLOW</option>
                <option>WHITE</option>
                <option>BLACK</option>
              </select>
            </div>
            <div className="w-full max-w-xl mt-2">
              {errors.image && (
                <span className="text-red-500 text-xs">
                  {errors.image.message} 
                </span>
              )}
              <input
                {...register("image")}
                name="file"
                type="file"
                className=" file-input file-input-bordered file-input-accent w-full max-w-xl"
                onChange={handleFileSelected}
                accept="image/png, image/gif, image/jpeg"
                
              />
            </div>

            <button
              type="submit"
              className="bg-blue-400 rounded-xl w-[39%] h-11 text-lg text-black font-bold mt-4 my-5 hover:cursor-pointer hover:bg-blue-400"
            >
              Add Product
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
