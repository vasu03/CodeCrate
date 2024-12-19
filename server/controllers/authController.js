// Importing the required custom authentication services
import { signupService } from "../services/authentication/signupService.js";
import { loginService } from "../services/authentication/loginService.js";
import { logoutService } from "../services/authentication/logoutService.js";

// Controller function to handle the Signup user functionality
export const singupUser = async (req, res, next) => {
	try {
		// Destructuring the incoming data from client body
		const { fullName, email, password, cnfmPassword } = req.body;
		
		// Get the response from the Signup service
		const serviceResponse = await signupService(fullName, email, password, cnfmPassword);
		
		// Send the success response
		res.status(201).json(serviceResponse);
	} catch (error) {
		next(error);
	}
};


// Controller function to handle the Login user functionality
export const loginUser = async (req, res, next) => {
	try {
		// Destructuring the incoming data from client body
		const { email, password } = req.body;

		// Get the response from the Login service
		const serviceResponse = await loginService(email, password);

		// Send the success response and set cookies
		res.status(200).cookie(
			"token", 
			serviceResponse.token, 
			serviceResponse.cookieOptions
		).json(serviceResponse.user);
	} catch (error) {
		next(error);
	}
};

// Creating a logout user Controller Function
export const logoutUser = async (req, res, next) => {
	try {
		await logoutService();
		res.clearCookie("token").status(200).json({"message": "Logout successful."});
	} catch (error) {
		next(error);
	}
};