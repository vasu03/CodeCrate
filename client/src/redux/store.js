// Import required modules
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

// Import Reducers from custom slices
import userReducer from "./user/userSlice";

// Define a root reducer by combining all reducers
const rootReducer = combineReducers({
    user: userReducer,
});

// Define a Persiting reducer storage
const persistConfig = {
    key: "root",
    storage,
    version: 1
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Export Redux-Store
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

// Export persisted store
export const persistor = persistStore(store);

