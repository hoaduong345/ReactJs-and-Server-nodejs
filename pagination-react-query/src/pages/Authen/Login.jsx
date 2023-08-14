import { LoginSocialFacebook } from "reactjs-social-login";
import { FacebookLoginButton } from "react-social-login-buttons";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { Link, useNavigate } from "react-router-dom";
import { LoginUser } from "../../services/api";
// import { useState } from "react";
import "./Auth.css";
import { schema } from "../../utils/rules";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const LoginSchema = schema.omit([
  "category",
  "color",
  "name",
  "details",
  "image",
  "price",
  "size",
  "quantity",
  "confirmpassword",
  "nameuser",
]);

const Login = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(LoginSchema),
  });
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (data) => {
    console.log("data", data);
    try {
      const response = await LoginUser(data);
      if (response.status === 200) {
        console.log("Login Successful!");
        localStorage.setItem("username", data.email);
        toast.success("Login successfull", {
          position: "top-right",
          autoClose: 5000,
          // Custom styles for the toast
          toastStyle: {
            background: "#4CAF50",
            color: "#fff",
            border: "1px solid #4CAF50",
          },
        });
        navigate("/");
      } else {
        // Login failed, do something (e.g., show an error message).
        console.log("Login Failed!");
        toast.warning("Login Failed", {
          position: "top-right",
          autoClose: 5000,
          // Custom styles for the toast
          toastStyle: {
            background: "#4CAF50",
            color: "#fff",
            border: "1px solid #4CAF50",
          },
        });
        // Your code to handle failed login here, like displaying an error message.
      }
    } catch (error) {
      console.error("Error occurred while logging in:", error);
      toast.warning("Network Error",error , {
        position: "top-right",
        autoClose: 5000,
        // Custom styles for the toast
        toastStyle: {
          background: "#4CAF50",
          color: "#fff",
          border: "1px solid #4CAF50",
        },
      });
    }
  });

  return (
    <>
      <form onSubmit={onSubmit}>
        <div className="w-full  mt-4 bg-slate-300">
          <div className="flex flex-col items-center justify-center pt-2">
            <h1 className="title  text-black font-bold text-[30px]">LOGIN</h1>
            <input type="hidden" name="id" />

            <div className=" w-full max-w-xl  mt-10">
              {errors.email && (
                <span className="text-red-500 text-xs">
                  {errors.email.message}
                </span>
              )}
              <input
                name="email"
                type="text"
                placeholder="Your Email"
                className="input input-bordered w-full max-w-xl text-white"
                {...register("email")}
              />
            </div>
            <div className=" w-full max-w-xl  mt-2">
              {errors.password && (
                <span className="text-red-500 text-xs">
                  {errors.password.message}
                </span>
              )}
              <input
                name="password"
                type="password"
                placeholder="Password"
                className="input input-bordered w-full max-w-xl  text-white"
                {...register("password")}
              />
            </div>

            <Link to={`/signin`} className="items-start font-bold text-black">
              You dont have account?{" "}
            </Link>
            <Link
              to={`/forgotpassword`}
              className="items-start font-bold text-black"
            >
              Forgot password?{" "}
            </Link>

            <button
              type="submit"
              className="bg-blue-400 rounded-xl w-[30%] h-11 text-lg text-black font-bold mt-4 my-5 hover:bg-blue-300"
            >
              Login
            </button>

            <div>
              <LoginSocialFacebook
                appId="614329347201746"
                onResolve={(response) => {
                  console.log(response);
                  // setProfile(response.data);
                }}
                onReject={(error) => {
                  console.log(error);
                }}
              >
                <FacebookLoginButton />
              </LoginSocialFacebook>
              <GoogleOAuthProvider clientId="467323562419-o3gqe4b5c6msqn324otha4sl4d9lk6g6.apps.googleusercontent.com">
                <GoogleLogin
                  onSuccess={(credentialResponse) => {
                    console.log(credentialResponse);
                  }}
                  onError={() => {
                    console.log("Login Failed");
                  }}
                />
                ;
              </GoogleOAuthProvider>
              ;
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default Login;
