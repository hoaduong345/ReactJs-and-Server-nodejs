
const ForgotPassword = () => {

  return (
    <form >
      <div className="w-full  mt-4 bg-slate-300">
        <div className="flex flex-col items-center justify-center pt-2">
          <h1 className="title  text-black font-bold text-[30px]">
            Forgot Password
          </h1>
          <input type="hidden" name="id" />
          <input
            name="Email"
            type="text"
            placeholder="Enter Your Email"
            className="input input-bordered w-full max-w-xl mt-10"
          />
          <button
            type="submit"
            className="bg-blue-400 rounded-xl w-[39%] h-11 text-lg text-black font-bold mt-4 my-5"
          >
            Confirm
          </button>
        </div>
      </div>
    </form>
  );
};

export default ForgotPassword;
