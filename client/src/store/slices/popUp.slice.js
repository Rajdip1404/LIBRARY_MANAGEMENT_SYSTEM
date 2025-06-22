import { createSlice } from "@reduxjs/toolkit";
import { updateBook } from "./book.slice";

const popupSlice = createSlice({
    name: "popup",
    initialState: {
        settingPopup: false,
        addBookPopup: false,
        updateBookPopup: false,
        readBookPopup: false,
        recordBookPopup: false,
        returnBookPopup: false,
        addNewAdminPopup: false,
        addNewLibrarianPopup: false
    },
    reducers: {
        toggleSettingPopup: (state) => {
            state.settingPopup = !state.settingPopup;
        },
        toggleAddBookPopup: (state) => {
            state.addBookPopup = !state.addBookPopup;
        },
        toggleUpdateBookPopup: (state) => {
            state.updateBookPopup = !state.updateBookPopup;
        },
        toggleReadBookPopup: (state) => {
            state.readBookPopup = !state.readBookPopup;
        },
        toggleRecordBookPopup: (state) => {
            state.recordBookPopup = !state.recordBookPopup;
        },
        toggleReturnBookPopup: (state) => {
            state.returnBookPopup = !state.returnBookPopup;
        },
        toggleAddNewAdminPopup: (state) => {
            state.addNewAdminPopup = !state.addNewAdminPopup;
        },
        toggleAddNewLibrarianPopup: (state) => {
            state.addNewLibrarianPopup = !state.addNewLibrarianPopup;
        },
        closeAllPopup: (state) => {
            state.settingPopup = false;
            state.addBookPopup = false;
            state.readBookPopup = false;
            state.recordBookPopup = false;
            state.returnBookPopup = false;
            state.addNewAdminPopup = false;
            state.addNewLibrarianPopup = false;
        },
    },
});

export const {
    toggleSettingPopup,
    toggleAddBookPopup,
    toggleUpdateBookPopup,
    toggleReadBookPopup,
    toggleRecordBookPopup,
    toggleReturnBookPopup,
    toggleAddNewAdminPopup,
    toggleAddNewLibrarianPopup,
    closeAllPopup,
} = popupSlice.actions;

export default popupSlice.reducer;