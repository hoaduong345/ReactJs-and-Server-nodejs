/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { updateProduct, getDetails,getCategory } from "../../services/api";
import { useQuery } from "react-query";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "../../utils/rules";
import { useParams } from "react-router-dom";


const schemaCreate = schema.omit(["confirmpassword", "email", "password", "nameuser"])
export default function Update() {
  const { id } = useParams();
  const { data: dataUpdate, isFetching: isFetchingUpdate } = useQuery("update", () => getDetails(id));
  const { data: dataCateGory, isLoading, isError } = useQuery("categories", () => getCategory({}));

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaCreate),
  });

  const [image, setImage] = useState(null);

  useEffect(() => {
    if (!isFetchingUpdate) {
      setValue("name", dataUpdate.name);
      setValue("quantity", dataUpdate.quantity);
      setValue("price", dataUpdate.price);
   
      setValue("size", dataUpdate.size);
      setValue("color", dataUpdate.color);
      setValue("image",dataUpdate.image)
      


    }
  }, [isFetchingUpdate]);

  const onSubmit = handleSubmit(async (data) => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("name", data.name);
    formData.append("detail", data.details);
    formData.append("quantity", data.quantity);
    formData.append("price", data.price);
    formData.append("category", data.category);
    formData.append("size", data.size);
    formData.append("color", data.color);

    try {
      const response = await updateProduct(id, formData);
      console.log(response);

      setValue("name", "");
      setValue("quantity", "");
      setValue("price", "");
      setValue("details", "");
      setImage(null);
    } catch (error) {
      console.error("Error adding product:", error);
    }
  });

  const handleDetailChange = (event, editor) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(editor.getData(), "text/html");
    const pElements = doc.getElementsByTagName("p");
    if (pElements.length) {
      const value = pElements[0].innerHTML;
      setValue("details", value, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  };

  const handleFileSelected = (e) => {
    const files = e.target.files;
    setImage(files[0]);
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
                {...register("category")}
              >
                <option value="" disabled selected>
                  Select categories
                </option>
                {dataCateGory &&
                  dataCateGory.data.map((category) => (
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
                  id="details"
                  editor={ClassicEditor}
                  className="h-64 text-black"
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
                  {...register("size")}
                />
              </label>
              <label className="cursor-pointer label">
                <span className="label-text text-black font-bold">M</span>
                <input
                  type="checkbox"
                  className="checkbox checkbox-success"
                  value="M"
                  {...register("size")}
                />
              </label>
              <label className="cursor-pointer label">
                <span className="label-text text-black font-bold">L</span>
                <input
                  type="checkbox"
                  className="checkbox checkbox-success"
                  value="L"
                  {...register("size")}
                />
              </label>
              <label className="cursor-pointer label">
                <span className="label-text text-black font-bold">XXL</span>
                <input
                  type="checkbox"
                  className="checkbox  checkbox-success"
                  value="XXL"
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
                onChange={handleFileSelected}
                name="file"
                type="file"
                className=" file-input file-input-bordered file-input-accent w-full max-w-xl"
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
