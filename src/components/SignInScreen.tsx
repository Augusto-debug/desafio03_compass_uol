import { useNavigate } from "react-router-dom";
import AuthButton from "./AuthButton";

const SignScreen = () => {
  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate("/signup");
  };

  return (
    <div className="w-full h-screen flex flex-col justify-between relative">
      <img
        src="/backgroundImageLoginScreen.svg"
        alt="background image"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute top-28 w-full flex flex-col items-center text-center">
        <p className="text-5xl sm:text-6xl md:text-7xl font-bold text-white">
          Audio
        </p>
        <p className="text-xl sm:text-2xl md:text-3xl text-white mt-5">
          It's modular and designed to last
        </p>
      </div>

      <div className="absolute bottom-0 w-full flex flex-col items-center px-5">
        <AuthButton mode="login" />
        <p className="mt-5 text-white text-sm sm:text-base">
          Don't have an account?{" "}
          <span
            onClick={handleSignUp}
            className="text-green-500 font-semibold cursor-pointer hover:underline"
          >
            Sign Up Here
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignScreen;
