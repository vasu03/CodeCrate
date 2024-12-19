// Importing required modules
import jwt from "jsonwebtoken";

// Importing custom middlewares
import { errorHandler } from "./errorHandler.js";

export const verifyUser = async (req, res, next) => {
	// Grab the token from signed cookies
	const token = req.signedCookies.token;

	if (!token) {
		return next(errorHandler(401, "Unauthorized."));
	}

	// Verifying the token
	jwt.verify(token, process.env.JWT_SECRET, (err, userData) => {
		if (err) {
			return next(errorHandler(401, "Unauthorized."));
		}

		// Set the verified data as request parameters
		req.user = userData;
		next();
	});
};
