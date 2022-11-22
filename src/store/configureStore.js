import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/auth";
import popupReducer from "./reducers/popup";

export const store = configureStore({
	reducer: {
		auth: authReducer,
		popup: popupReducer,
	},
});