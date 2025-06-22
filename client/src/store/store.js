import {configureStore} from "@reduxjs/toolkit";

import authReducer from "./slices/auth.slice.js";
import popupReducer from "./slices/popUp.slice.js";
import userReducer from "./slices/user.slice.js";
import bookReducer from "./slices/book.slice.js";
import borrowReducer from "./slices/borrow.slice.js";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        popup: popupReducer,
        user: userReducer,
        book: bookReducer,
        borrow: borrowReducer
    }
});