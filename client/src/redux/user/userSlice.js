// Import required modules
import { createSlice } from "@reduxjs/toolkit";

// A initial state for user slice
const initialState = {
    user: null,
    error: null,
    loading: false
};

// A User slice to create a User global state
const userSlice = createSlice({
    name: "user",
    initialState,
    // logic of our user slice
    reducers: {
        // Start of sign-in process
        signInStart: (state) => {
            state.loading = true;
            state.error = null;
        },

        // Success in sign-in
        signInSuccess: (state, action) => {
            state.user = action.payload;
            state.loading = false;
            state.error = null;
        },

        // failure in sign-in
        signInFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        // Start of log-out process
        logoutStart: (state) => {
            state.loading = true;
            state.error = null;
        },

        // Success in log-out
        logoutSuccess: (state) => {
            state.user = null;
            state.loading = false;
            state.error = null;
        },

        // failure in log-out
        logoutFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    }
});

// Export the reducers
export const {
    signInStart,
    signInSuccess,
    signInFailure,
    logoutStart,
    logoutSuccess,
    logoutFailure
} = userSlice.actions;

export default userSlice.reducer;