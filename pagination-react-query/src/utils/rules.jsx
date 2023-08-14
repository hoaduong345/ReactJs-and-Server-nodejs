import * as yup from "yup";

export const schema = yup.object({
  email: yup
    .string()
    .required("Please enter your Email")
    .email("The email address is invalid."),
  password: yup
    .string()
    .required("Please enter your password.")
    .min(6, "Please enter 6 to 20 characters.")
    .max(20, "Please enter within 20 characters."),
  confirmpassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Required"),
  nameuser: yup.string().required("Please enter your Name"),
  name: yup.string().min(6, "Please enter 6 to 20 characters."),
  quantity: yup.number("Quantity is number type").min(1,"Quantity at least equal 1").required("Please enter the quantity of product"),
  price: yup.number("Price is number type").min(1,"Price at least equal 1").required("please enter the price of product"),
  
  category: yup.string().required("Please choose categories for product"),

  details: yup.string().required("Please enter details of product"),
  size: yup.array().min(1, "Please choose at least one size").required("Please choose size(s) of the product"),
  color: yup.string().required("Please choose color of products"),
  image: yup.mixed().required("Please choose an image for the product"),
});