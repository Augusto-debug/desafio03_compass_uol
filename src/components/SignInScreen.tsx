import AuthButton from "./AuthButton";
import { useNavigate } from "react-router-dom";

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
      <div className="absolute top-28 w-full flex items-center justify-center flex-col">
        <p className="text-9xl">Audio</p>
        <p className="text-3xl py-10">It's modular and designed to last</p>
      </div>
      <div className="absolute top-1/2 w-full flex flex-col items-center">
        <AuthButton />
        <p className="mt-5">
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
