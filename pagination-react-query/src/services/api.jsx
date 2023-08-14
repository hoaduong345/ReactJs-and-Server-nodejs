import {
  BASE_URL,
  GET_DETAILS,
  CREATE_URL,
  LOGIN_USER,
  CREATE_USER,
  CATEGORY,
  GET_ALL,
  DELETE,
  UPDATE
} from "../utils/constants";
import axios from "axios";


// PRODUCT
export const getProductList = async (param) => {
  return axios.get(`${BASE_URL}?_page=${param}&_perPage=6`);
};

export const getDetails = async (id) => {
  const details = await axios.get(`${GET_DETAILS}${id}`);

  return details.data;
};
// GET_ALL
export const adminAction = async(formData) =>{
  return axios.get(`${GET_ALL}`,formData)
}
// DELETE
export const deleteProduct = async(id) =>{
  try {
    const response = await axios.delete(`${DELETE}${id}`)
    return response.data;
  } catch (error) {
    throw new Error('Error deleting product: ' + error.message);
  }
}
// UPDATE PRODUCT
export const updateProduct = async(productId, formData) =>{
  
  return axios.put(`${UPDATE}${productId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data", // Set the correct Content-Type header for the form data
    },
  })
}
// ADD PRODUCT
export const AddShoes = async (formData) => {
  return axios.post(`${CREATE_URL}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data", // Set the correct Content-Type header for the form data
    },
  });
};

// USER
export const CreateUser = async(body) =>{
  return axios.post(`${CREATE_USER}`,body)
}

export const LoginUser = async(body) =>{
  return axios.post(`${LOGIN_USER}`,body)
}

// CATEGORIES
export const getCategory = async (data) => {
  return axios.get(CATEGORY, {
    params: data, // Pass the data as query parameters
  });
};