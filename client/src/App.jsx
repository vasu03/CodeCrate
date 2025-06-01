// Import required modules
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import custom Layouts
import AppLayout from "@/layouts/AppLayout";
import AuthLayout from "@/layouts/AuthLayout";

// Importing UI components
import { Toaster } from "@/components/ui/sonner";

// Import custom components
import { ProtectedRoute } from "@/components/ProtectedRoute";

// Import custom pages
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Snippets from "./pages/Snippets";
import Favourites from "./pages/Favourites";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

// Create a React app
const App = () => {
	return (
		<BrowserRouter>
			<Toaster richColors position="top-right" />
			<Routes>
				{/* Public App routes */}
				<Route element={<AppLayout />}>
					<Route path="/" element={<Home />} />
				</Route>

				{/* Authentication Routes */}
				<Route element={<AuthLayout />}>
					<Route path="/sign-in" element={<SignIn />} />
					<Route path="/sign-up" element={<SignUp />} />
				</Route>

				{/* Protected App Routes */}
				<Route element={<ProtectedRoute />}>
					<Route element={<AppLayout />}>
						<Route element={<Dashboard />} path="/dashboard" />
						<Route element={<Snippets />} path="/snippets" />
						<Route element={<Favourites />} path="/favourites" />
					</Route>
				</Route>

				<Route path="*" element={<div className="h-screen w-full flex items-center justify-center text-2xl font-semibold text-neutral-700">Page Not Found</div>} />
			</Routes>
		</BrowserRouter>
	);
};

// Export the React App
export default App;