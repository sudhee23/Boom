import { useState } from "react";
import { SignupForm } from "../forms/SignupForm";
import { LoginForm } from "../forms/LoginForm";

const LoginSignupPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-semibold text-blue-900 mb-6 text-center">
          {isLogin ? "Log In to Boom" : "Sign Up for Boom"}
        </h2>

        {isLogin ? <LoginForm /> : <SignupForm />}

        <p className="mt-4 text-center text-gray-600">
          {isLogin ? "New to Boom?" : "Already have an account?"}{" "}
          <span
            className="text-white-900 font-semibold cursor-pointer hover:underline"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Register" : "Log In"}
          </span>
        </p>

      </div>
    </div>
  );
};

export default LoginSignupPage;
