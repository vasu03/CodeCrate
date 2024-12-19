// Importing the required modules
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Importing data models
import User from "../../models/userModel.js";

// Importing custom middlewares
import { errorHandler } from "../../middlewares/errorHandler.js";

// Creating and exporting the service for handling Login feature
export const loginService = async (email, password) => {
	// Check whether all fields are populated or not
	if (!email || !password) {
		throw errorHandler(
			400,
			"All inputs are required",
			"Provide all values before submitting"
		);
	}

	// Check whether the valid email is provided or not
	const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
	if (!emailRegex.test(email)) {
		throw errorHandler(
            400, 
            "Invalid Email", 
            "Enter a valid email address"
        );
	}

    // Search & check if provided user is valid or not
    const validUser = await User.findOne({ email });
    if (!validUser){
        throw errorHandler(
            400,
            "Invalid Email or Password",
            "Please provide correct credentials"
        );
    }

    // If the user is valid then match the provided password with original one
    const validPassword = bcrypt.compareSync(password, validUser.password);
    if(!validPassword){
        throw errorHandler(
			400,
			"Invalid Email or Password",
			"Please provide correct credentials"
		);
    }

    // Generate and sign a token for the valid user authentication
    const token = jwt.sign(
        { userId: validUser._id },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    );

    // Set the cookie parameters
    const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        signed: true,
        sameSite: "Strict",
        expires: new Date(Date.now() + 60 * 60 * 1000)
    };

    // Extract the sensitive informations from repsonse
    const { password: passwd, ...rest } = validUser._doc;
    
    // Send the response containing user and token data
    return { token, cookieOptions, user: rest }; 
};
