// Import required modules
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

// Import main Application file
import App from "./App.jsx";

// Import custom CSS file
import "./index.css";

// Import custom Context Provider modules
import { store, persistor } from "@/redux/store.js";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<PersistGate persistor={persistor}>
			<Provider store={store}>
				<App />
			</Provider>
		</PersistGate>
	</StrictMode>
);
