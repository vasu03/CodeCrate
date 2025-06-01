// Import Required modules
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Import UI components
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

// Import custom components
import { Separator } from "@/components/Separator";

// Import Icons
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { LoaderIcon, UserCheck } from "lucide-react";

// Import global state reducers from Redux-store
import { signInStart, signInFailure, signInSuccess } from "@/redux/user/userSlice";

// An SignIn page for the App
const SignIn = () => {
    // an instance for dispatching reducers
    const dispatch = useDispatch();
    // get the global user state
    const { loading } = useSelector((state) => state.user);

    // an instance of navigation hook
    const navigate = useNavigate();

    // State to handle the SignIn form data
    const [formData, setFormData] = useState({});

    // function to handle the input changes in form fields
    const handleFormChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
    }

    // function to handle the SignIn form submission
    const handleSignIn = async (e) => {
        e.preventDefault();

        if (!formData.email || !formData.password) {
            toast.error("SignIn failed", {
                description: "All fields are required."
            });
            return dispatch(signInFailure("All fields are required."));
        }

        try {
            dispatch(signInStart());

            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            if (data.success === false) {
                dispatch(signInFailure(data.message));
                toast.error("SignIn failed", {
                    description: data.message
                })
            }

            if (res.ok) {
                dispatch(signInSuccess(data));
                navigate("/")
                toast.success("SignIn successful");
            }

        } catch (err) {
            dispatch(signInFailure(err.message));
            toast.error("SignIn failed", {
                description: "Please try again later",
            });
        }
    };

    // JSX to render the page
    return (
        <Card className={"w-[95%] sm:w-[80%] md:w-[540px] mx-auto shadow-lg p-8 border-0 h-[80%] justify-center"}>
            {/* Header for the SignIn Card */}
            <CardHeader className={"gap-0"}>
                <CardTitle className="text-2xl font-semibold text-center text-gray-700">Sign In</CardTitle>
                <CardDescription className="text-center text-xs sm:text-sm">Sign in to your account to continue</CardDescription>
            </CardHeader>
            <Separator />

            {/* Container having SignIn Form */}
            <CardContent className={"p-0 w-[95%] sm:w-[90%] md:w-[80%] mx-auto"}>
                <form onSubmit={handleSignIn} className="flex flex-col gap-4">
                    <Input
                        type={"email"}
                        id="email"
                        placeholder={"yourmail@mail.com"}
                        onChange={handleFormChange}
                        className={"text-gray-800 placeholder:text-[12px]"}
                        disabled={loading}
                    />
                    <Input
                        type={"password"}
                        id="password"
                        placeholder={"Your password"}
                        onChange={handleFormChange}
                        className={"text-gray-800 placeholder:text-[12px]"}
                        disabled={loading}
                    />
                    <Button variant={"primary"} size={"default"} disabled={loading} >
                        {loading ? (
                            <LoaderIcon className="animate-spin text-muted-foreground" />
                        ) : (
                            <>
                                <UserCheck />
                                Sign In
                            </>
                        )}
                    </Button>
                </form>

                <div className="flex items-center justify-center gap-4 my-6">
                    <Separator />
                    <span className="text-sm text-muted-foreground">or</span>
                    <Separator />
                </div>

                {/* Container to render the Alternate Sign In options button */}
                <CardContent className="flex flex-col gap-4 mx-auto">
                    <Button variant={"secondary"} size={"lg"} className="w-full text-xs xl:text-sm font-normal">
                        <FcGoogle className="sm:!h-6 sm:!w-6" />
                        Sign In with Google
                    </Button>
                    <Button variant={"secondary"} size={"lg"} className="w-full text-xs xl:text-sm font-normal">
                        <FaGithub className="sm:!h-5 sm:!w-5" />
                        Sign In with GitHub
                    </Button>
                </CardContent>

                {/* Container to render the Sign Up link */}
                <CardDescription className="text-center mt-6 text-xs">
                    Don't have an account? <Link to={"/sign-up"} className="text-blue-600 hover:underline">Sign Up</Link>
                </CardDescription>
            </CardContent>
        </Card>
    );
};

// Export the SignIn page
export default SignIn;