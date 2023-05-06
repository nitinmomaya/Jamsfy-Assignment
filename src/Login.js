import GoogleButton from "./compoenent/GoogleButton";
import authchanged from "./utils/authchanged";

const Login = () => {
  authchanged();
  return (
    <>
      <div className="w-full h-screen flex justify-center items-center flex-col gap-8">
        <div className="flex w-fit px-20 py-10 border-solid border-[1px] border-slate-100 rounded-md flex-col font-display items-center gap-4">
          <h1 className="text-slate-700 font-semibold text-2xl">
            Welcome to Jamsfy Assignment
          </h1>
          <p className="text-slate-500 text-lg  ">Please login to proceed</p>
          <GoogleButton />
        </div>
      </div>
    </>
  );
};

export default Login;
