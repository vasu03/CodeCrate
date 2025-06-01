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
import { LoaderIcon, UserPlus } from "lucide-react";

// Import global state reducers from Redux-store
import { signInStart, signInFailure, signInSuccess } from "@/redux/user/userSlice";

// An SignUp page for the App
const SignUp = () => {
    // an instance for dispatching reducers
    const dispatch = useDispatch();
    // get the global user state
    const { loading } = useSelector((state) => state.user);

    // an instance of navigation hook
    const navigate = useNavigate();

    // State to handle the SignUp form data
    const [formData, setFormData] = useState({});

    // function to handle the input changes in form fields
    const handleFormChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
    }

    // function to handle the SignUp form submission
    const handleSignUp = async (e) => {
        e.preventDefault();

        if (!formData.fullName || !formData.email || !formData.password || !formData.cnfmPassword) {
            toast.error("SignUp failed", {
                description: "All fields are required."
            });
            return dispatch(signInFailure("All fields are required."));
        }
        if (formData.password !== formData.cnfmPassword) {
            toast.error("SignUp failed", {
                description: "Both passwords must be same"
            });
            return dispatch(signInFailure("Both passwords must be same"));
        }

        try {
            dispatch(signInStart());

            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            if (data.success === false) {
                dispatch(signInFailure(data.message));
                toast.error("SignUp failed", {
                    description: data.message
                })
            }

            if (res.ok) {
                dispatch(signInSuccess(data));
                navigate("/sign-in")
                toast.success("SignUp successful");
            }

        } catch (err) {
            dispatch(signInFailure(err.message));
            toast.error("SignUp failed", {
                description: "Please try again later",
            });
        }
    };

    // JSX to render the page
    return (
        <Card className={"w-[95%] sm:w-[80%] md:w-[540px] mx-auto shadow-lg p-8 border-0 h-[85%] justify-center"}>
            {/* Header for the SignUp Card */}
            <CardHeader className={"gap-0"}>
                <CardTitle className="text-2xl font-semibold text-center text-gray-700">SignUp</CardTitle>
                <CardDescription className="text-center text-xs sm:text-sm">Start here by creating a new account</CardDescription>
            </CardHeader>
            <Separator />

            {/* Container having SignUp Form */}
            <CardContent className={"p-0 w-[95%] sm:w-[90%] md:w-[80%] mx-auto"}>
                <form onSubmit={handleSignUp} className="flex flex-col gap-4">
                    <Input
                        type={"text"}
                        id="fullName"
                        placeholder={"Your Name"}
                        onChange={handleFormChange}
                        className={"text-gray-800 placeholder:text-[12px]"}
                        disabled={loading}
                    />
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
                    <Input
                        type={"password"}
                        id="cnfmPassword"
                        placeholder={"Confirm Your password"}
                        onChange={handleFormChange}
                        className={"text-gray-800 placeholder:text-[12px]"}
                        disabled={loading}
                    />
                    <Button variant={"primary"} size={"default"} disabled={loading} >
                        {loading ? (
                            <LoaderIcon className="animate-spin text-muted-foreground" />
                        ) : (
                            <>
                                <UserPlus />
                                SignUp
                            </>
                        )}
                    </Button>
                </form>

                <div className="flex items-center justify-center gap-4 my-6">
                    <Separator />
                    <span className="text-sm text-muted-foreground">or</span>
                    <Separator />
                </div>

                {/* Container to render the Alternate SignUp options button */}
                <CardContent className="flex flex-col gap-4 mx-auto">
                    <Button variant={"secondary"} size={"lg"} className="w-full text-xs xl:text-sm font-normal">
                        <FcGoogle className="sm:!h-6 sm:!w-6" />
                        Continue with Google
                    </Button>
                    <Button variant={"secondary"} size={"lg"} className="w-full text-xs xl:text-sm font-normal">
                        <FaGithub className="sm:!h-5 sm:!w-5" />
                        Continue with GitHub
                    </Button>
                </CardContent>

                {/* Container to render the Sign In link */}
                <CardDescription className="text-center mt-6 text-xs">
                    Already have an account? <Link to={"/sign-in"} className="text-blue-600 hover:underline" >Sign In</Link>
                </CardDescription>

                {/* Container to render the Privacy Policy and Terms of Service links */}
                <CardDescription className="text-center mt-1 text-[10px]">
                    By Signing up, you agree to our&nbsp;
                    <Link href="/#" className="text-blue-600 hover:underline">Privacy Policy</Link>
                    &nbsp;and&nbsp;
                    <Link href="/#" className="text-blue-600 hover:underline">Terms of Service</Link>
                </CardDescription>
            </CardContent>
        </Card>
    );
};

// Export the SignUp page
export default SignUp;