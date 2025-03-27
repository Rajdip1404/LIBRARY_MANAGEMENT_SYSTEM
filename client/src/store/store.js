import {configureStore} from "@reduxjs/toolkit";

import authReducer from "./slices/auth.slice.js";
import popupReducer from "./slices/popUp.slice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        popup: popupReducer
    }
});