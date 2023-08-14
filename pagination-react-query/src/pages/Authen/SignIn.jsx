import { CreateUser } from "../../services/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { schema } from "../../utils/rules";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const SignInSchema = schema.omit([
  "category",
  "color",
  "name",
  "details",
  "image",
  "price",
  "size",
  "quantity",
]);

function SignIn() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SignInSchema),
  });
  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await CreateUser(data);

      // Handle the response based on the server's reply.
      if (response.status === 200) {
        console.log("Sign-in successfully");
        toast.success(
          "Sign-in successfully-check your email to verify account",
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
      } else {
        console.log("Sign-in Failed!");
        toast.warning(
          "Sign-in failed",
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
    } catch (error) {
      console.error("Error occurred while signing in:", error);
      toast.warning(
        "Error networking",error,
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

  return (
    <form onSubmit={onSubmit}>
      <div className="w-full mt-4 bg-slate-300">
        <div className="flex flex-col items-center justify-center pt-2">
          <h1 className="title  text-black font-bold text-[30px]">SIGN IN</h1>
          <input type="hidden" name="id" />
          <div className="w-full max-w-xl mt-10">
            {errors.email && (
              <span className="text-red-500 text-xs">
                {errors.email.message}
              </span>
            )}
            <input
              name="email"
              type="text"
              placeholder="Your Email"
              className="input input-bordered w-full text-white"
              {...register("email")}
            />
          </div>

          <div className="w-full max-w-xl mt-2">
            {errors.nameuser && (
              <span className="text-red-500 text-xs ">
                {errors.nameuser.message}
              </span>
            )}
            <input
              name="nameuser"
              type="text"
              placeholder="Your Name"
              className="input input-bordered w-full text-white"
              {...register("nameuser")}
            />
          </div>

          <div className="w-full max-w-xl mt-2">
            {errors.password && (
              <span className="text-red-500 text-xs">
                {errors.password.message}
              </span>
            )}
            <input
              name="password"
              type="password"
              placeholder="Password"
              className="input input-bordered w-full text-white"
              {...register("password")}
            />
          </div>
          <div className="w-full max-w-xl mt-2">
            {errors.confirmpassword && (
              <span className="text-red-500 text-xs">
                {errors.confirmpassword.message}
              </span>
            )}
            <input
              name="confirmpassword"
              type="password"
              placeholder="Confirm your Password"
              className="input input-bordered w-full text-white "
              {...register("confirmpassword")}
            />
          </div>
          <div className="bg-blue-400 rounded-xl w-[39%] h-11 text-lg text-black font-bold mt-4 my-5 text-center hover:bg-blue-600 cursor-pointer">
            <button type="submit">
              <h1 className="mt-2 ">Sign In</h1>
            </button>
            <ToastContainer
              position="top-right"
              // Custom theme for the toast container
              theme="dark"
            />
          </div>
          <Link to={`/login`} className="text-black font-semibold items-start">
            Back to login{" "}
          </Link>
        </div>
      </div>
    </form>
  );
}

export default SignIn;
