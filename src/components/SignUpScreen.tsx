import { useNavigate } from "react-router-dom";
import AuthButton from "./AuthButton";
const SignUpScreen = () => {
  const navigate = useNavigate();

  const handleBackToLoginPage = () => {
    navigate("/");
  };
    return (
        <div className="w-full h-screen flex items-center justify-center flex-col">
          <img
            src="/backgroundImageLoginScreen.svg"
            alt="background image"
            className="w-full h-full object-cover"
          />
          <div className="absolute top-28 w-full flex items-center justify-center flex-col">
            <p className="text-9xl">Audio 2 </p>
            <p className="text-3xl py-10">It's modular and designed to last</p>
            <AuthButton mode="signup" />
            <p className="mt-5">
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
}

export default SignUpScreen