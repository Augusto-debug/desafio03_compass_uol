import { useNavigate } from "react-router-dom";
import AuthButton from "./AuthButton";

const SignScreen = () => {
  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate("/signup");
  };

  return (
    <div className="w-full h-screen flex items-center justify-center flex-col relative">
      <img
        src="/backgroundImageLoginScreen.svg"
        alt="background image"
        className="w-full h-full object-cover absolute"
      />
      <div className="flex justify-between items-center p-5 absolute top-0 w-full">
        <p className="text-3xl text-white">9:41</p>
        <img
          className="h-6 filter brightness-0 invert"
          src="headerContainer.png"
          alt=""
        />
      </div>
      <div className="absolute top-28 w-full flex items-center justify-center flex-col">
        <p className="text-7xl text-white font-bold">Audio</p>
        <p className="text-3xl text-white py-10">
          It's modular and designed to last
        </p>
      </div>
      <div className="absolute w-full flex flex-col items-center bottom-0">
        <AuthButton mode="login" />
        <p className="my-5 text-white">
          Don't have an account?{" "}
          <span
            onClick={handleSignUp}
            className="text-green-600 cursor-pointer"
          >
            Sign Up Here
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignScreen;
