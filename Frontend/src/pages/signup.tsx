import { useRef, useState, useEffect } from "react";
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
    const [fieldErrors, setFieldErrors] = useState<{username?: string, password?: string}>({});

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/dashboard', { replace: true });
        }
    }, [navigate]);

    function validateForm() {
        const username = usernameRef.current?.value || "";
        const password = passwordRef.current?.value || "";
        const errors: {username?: string, password?: string} = {};

        if (!username) {
            errors.username = "Username is required";
        } else if (username.length < 3) {
            errors.username = "Username must be at least 3 characters long";
        } else if (!/^[a-zA-Z0-9_]+$/.test(username)) {
            errors.username = "Username can only contain letters, numbers, and underscores";
        }

        if (!password) {
            errors.password = "Password is required";
        } else if (password.length < 6) {
            errors.password = "Password must be at least 6 characters long";
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
            errors.password = "Password must contain at least one uppercase letter, one lowercase letter, and one number";
        }

        setFieldErrors(errors);
        return Object.keys(errors).length === 0;
    }

    async function signup(){
        const username = usernameRef.current?.value?.trim();
        const password = passwordRef.current?.value?.trim();

        console.log('Signup attempt:', { username, password: password ? '***' : 'empty' });

        setErrorMessage("");
        setFieldErrors({});

        if (!validateForm()) {
            return;
        }

        if (!username || !password) {
            setErrorMessage("Please fill in all fields");
            return;
        }

        setIsLoading(true);

        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
                username: username,
                password: password
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log('Signup successful:', response.data);
            navigate("/signin");
        } catch (error) {
            console.error('Signup error:', error);
            if (axios.isAxiosError(error) && error.response) {
                if (error.response.status === 400 && error.response.data?.errors) {
                    const backendErrors: {username?: string, password?: string} = {};
                    error.response.data.errors.forEach((err: {field: string, message: string}) => {
                        if (err.field === 'username') {
                            backendErrors.username = err.message;
                        } else if (err.field === 'password') {
                            backendErrors.password = err.message;
                        }
                    });
                    setFieldErrors(backendErrors);
                } else if (error.response.status === 409) {
                    setErrorMessage("This username already exists. Please sign in or choose a different username.");
                } else if (error.response.status === 411) {
                    setErrorMessage("Request error. Please try again.");
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
        <div className="min-h-screen w-full gradient-bg flex justify-center items-center p-4">
            <div className="glass-effect rounded-3xl p-6 md:p-8 lg:p-10 w-full max-w-md animate-fade-in card-hover">
                <div className="text-center mb-8">
                    <div className="w-20 h-20 bg-gradient-to-br from-[#3B9797] to-[#16476A] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-3" style={{color: '#132440'}}>Create Account</h2>
                    <p className="text-lg" style={{color: '#16476A'}}>Join us and start organizing your thoughts</p>
                </div>

                {errorMessage && (
                    <div className="mb-6 p-4 rounded-xl border-l-4 animate-shake" 
                         style={{
                           backgroundColor: 'rgba(191, 9, 47, 0.1)',
                           borderColor: '#BF092F',
                           color: '#BF092F'
                         }}>
                        <div className="flex items-center">
                            <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            <span className="text-sm font-medium">{errorMessage}</span>
                        </div>
                    </div>
                )}

                <div className="space-y-6">
                    <Input 
                        reference={usernameRef} 
                        placeholder="Enter your username"
                        label="Username"
                        helperText="3+ characters, letters, numbers, and underscores only"
                        error={fieldErrors.username}
                        icon={
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        }
                    />
                    <Input 
                        reference={passwordRef} 
                        placeholder="Create a strong password"
                        label="Password"
                        helperText="6+ characters with uppercase, lowercase, and numbers"
                        error={fieldErrors.password}
                        showPasswordToggle={true}
                        icon={
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        }
                    />
                </div>

                <div className="mt-8">
                    <Button
                        onClick={signup}
                        fullWidth={true}
                        loading={isLoading}
                        size={"md"}
                        variant={"primary"}
                        text={isLoading ? "Creating Account..." : "Create Account"}
                    />
                </div>

                <div className="mt-8 text-center">
                    <p className="text-base" style={{color: '#16476A'}}>
                        Already have an account?{" "}
                        <Link 
                            to="/signin" 
                            className="font-semibold transition-colors duration-200 hover:underline"
                            style={{color: '#3B9797'}}
                            onMouseEnter={(e) => e.currentTarget.style.color = '#2A7A7A'}
                            onMouseLeave={(e) => e.currentTarget.style.color = '#3B9797'}
                        >
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}