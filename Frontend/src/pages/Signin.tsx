import { useRef, useState } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate, Link } from "react-router-dom";

export function SignIn() {

  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();


  const [errorMsg, setErrorMsg] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function signIn() {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;

    setErrorMsg("");

    if (!username || !password) {
      setErrorMsg("Please enter both username and password");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
        username,
        password,
      });

      const jwt = response.data.token;
      localStorage.setItem("token", jwt);

      navigate("/dashboard");
    } catch (error: any) {

      if (error.response) {
        if (error.response.status === 403) {
          setErrorMsg("Invalid username or password");
        } else if (error.response.data && error.response.data.message) {
          setErrorMsg(error.response.data.message);
        } else {
          setErrorMsg("Failed to sign in. Please try again.");
        }
      } else if (error.request) {
        setErrorMsg("No response from server. Please check your connection.");
      } else {
        setErrorMsg("An error occurred. Please try again.");
      }
      console.error("Sign in error:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 to-gray-100 flex justify-center items-center p-4">
      <div className="bg-white border border-gray-200 shadow-lg rounded-xl p-4 md:p-6 lg:p-8 w-full max-w-xs md:max-w-md transition-all duration-300 hover:shadow-xl">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4 md:mb-6 text-center">
          Sign In to Your Account
        </h2>

        <div className="space-y-3 md:space-y-4">
          <Input reference={usernameRef} placeholder={"Username"} />
          <Input reference={passwordRef} placeholder={"Password"} />
        </div>

        {errorMsg && (
          <div className="mt-3 md:mt-4 p-2 md:p-3 bg-red-50 border border-red-200 text-red-600 rounded-md text-xs md:text-sm">
            {errorMsg}
          </div>
        )}

        <div className="mt-4 md:mt-6">
          <Button
            onClick={signIn}
            fullWidth={true}
            loading={isLoading}
            size={"sm"}
            variant={"primary"}
            text={isLoading ? "Signing In..." : "Sign In"}
          />
        </div>

        <div className="mt-3 md:mt-4 text-center">
          <p className="text-sm md:text-base text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}