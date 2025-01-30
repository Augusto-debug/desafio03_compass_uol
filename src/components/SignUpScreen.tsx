import { useNavigate } from "react-router-dom";
import AuthButton from "./AuthButton";

const SignUpScreen = () => {
  const navigate = useNavigate();

  const handleBackToLoginPage = () => {
    navigate("/");
  };

  return (
    <div className="w-full h-screen flex items-center justify-center flex-col relative">
      <img
        src="/backgroundImageLoginScreen.svg"
        alt="background image"
        className="w-full h-full object-cover absolute"
      />
      <div className="absolute top-28 w-full flex items-center justify-center flex-col">
        <p className="text-7xl text-white font-bold">Audio</p>
        <p className="text-3xl text-white py-10">
          It's modular and designed to last
        </p>
      </div>
      <div className="absolute w-full flex flex-col items-center bottom-0">
        <AuthButton mode="signup" />
        <p className="my-5 text-white">
          Already have an account?{" "}
          <span
            onClick={handleBackToLoginPage}
            className="text-green-600 cursor-pointer"
          >
            Sign In Here
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignUpScreen;
