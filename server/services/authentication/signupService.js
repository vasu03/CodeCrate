// Importing the required modules
import bcrypt from "bcryptjs";

// Importing data models
import User from "../../models/userModel.js";

// Importing custom middlewares
import { errorHandler } from "../../middlewares/errorHandler.js";


// Creating and exporting the service for handling Signup feature
export const signupService = async (fullName, email, password, cnfmPassword) => {
	// Check whether all fields are populated or not
	if (!fullName || !email || !password || !cnfmPassword) {
		throw errorHandler(
			400,
			"All inputs are required",
			"Provide all values before submitting"
		);
	}

    // Check whether the full name provided is valid or not
    const fullNameRegex = /^[a-zA-Z]+( [a-zA-Z]+)*$/;
	if (!fullNameRegex.test(fullName)) {
		throw errorHandler(
			400,
			"Invalid full name",
			"Only alphabets are allowed."
		);
	}

    // Check whether the valid email is provided or not
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)){
        throw errorHandler(
            400,
            "Invalid Email",
            "Enter a valid email address"
        );
    }

    // Check if the user already exists or not
    const userExists = await User.findOne({ email });
    if (userExists){
        throw errorHandler(
            302,
            "User already exists",
            "Try again with different email"
        );
    }

    // Check if the passwords provided are as per the requirements
    if (password.length < 8){
        throw errorHandler(
            400,
            "Weak password",
            "It must be longer than 8 characters"
        );
    }

    if (password !== cnfmPassword){
        throw errorHandler(
            400,
            "Passwords mismatch",
            "Both passwords must be same."
        );
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/;
    if (!passwordRegex.test(password)){
        throw errorHandler(
			400,
			"Weak password",
			"Include an uppercase, lowercase, special & alphanumeric characters."
		);
    }

    // Hash the password before storing
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user with obtained paramters
    const newUser = new User({
        fullName,
        email,
        password: hashedPassword 
    });

    // Store the created user to DB collection
    await newUser.save();

    // send the response message of success
    return { message: "User signup successful !" };
};