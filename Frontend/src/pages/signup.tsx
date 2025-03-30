import { useRef, useState } from "react";
import { Button } from "../components/Button"
import { Input } from "../components/Input"
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate, Link } from "react-router-dom";

export function Signup(){

    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    const [errorMessage, setErrorMessage] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    async function signup(){
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;

        setErrorMessage("");

        if (!username || !password) {
            setErrorMessage("Username and password are required");
            return;
        }

        setIsLoading(true);

        try {
            await axios.post(`${BACKEND_URL}/api/v1/signup`, {
                username,
                password
            });

            navigate("/signin");
        } catch (error) {

            if (axios.isAxiosError(error) && error.response) {

                if (error.response.status === 409) {
                    setErrorMessage("This username already exists. Please sign in or choose a different username.");
                } else if (error.response.data?.message) {
                    setErrorMessage(error.response.data.message);
                } else {
                    setErrorMessage("An error occurred during signup. Please try again.");
                }
            } else {
                setErrorMessage("Network error. Please check your connection and try again.");
            }
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 to-gray-100 flex justify-center items-center p-4">
            <div className="bg-white border border-gray-200 shadow-lg rounded-xl p-6 md:p-8 w-full max-w-md transition-all duration-300 hover:shadow-xl">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Create Account</h2>

                {errorMessage && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                        {errorMessage}
                    </div>
                )}

                <div className="space-y-4">
                    <Input reference={usernameRef} placeholder={"Username"} />
                    <Input reference={passwordRef} placeholder={"Password"} />
                </div>

                <div className="mt-6">
                    <Button
                        onClick={signup}
                        fullWidth={true}
                        loading={isLoading}
                        size={"sm"}
                        variant={"primary"}
                        text={"Signup"}
                    />
                </div>

                <div className="mt-4 text-center">
                    <p className="text-gray-600">
                        Already have an account?{" "}
                        <Link to="/signin" className="text-blue-600 hover:text-blue-800 font-medium">
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}