import AuthButton from "../components/AuthButton";
const SignUpScreen = () => {
    return (
        <div className="w-full h-screen flex items-center justify-center flex-col">
          <img
            src="/backgroundImageLoginScreen.svg"
            alt="background image"
            className="w-full h-full object-cover"
          />
          <div className="absolute top-28 w-full flex items-center justify-center flex-col">
            <p className="text-9xl">Audio</p>
            <p className="text-3xl py-10">It's modular and designed to last</p>
            <AuthButton />
          </div>
          
         
        </div>
      );
}

export default SignUpScreen