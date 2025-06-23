import { createSlice } from "@reduxjs/toolkit";
import { updateBook } from "./book.slice";

const popupSlice = createSlice({
    name: "popup",
    initialState: {
        settingPopup: false,
        addBookPopup: false,
        borrowBookPopup: false,
        updateBookPopup: false,
        readBookPopup: false,
        deleteBookPopup: false,
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
        toggleBorrowBookPopup: (state) => {
            state.borrowBookPopup = !state.borrowBookPopup;
        },
        toggleUpdateBookPopup: (state) => {
            state.updateBookPopup = !state.updateBookPopup;
        },
        toggleReadBookPopup: (state) => {
            state.readBookPopup = !state.readBookPopup;
        },
        toggleDeleteBookPopup: (state) => {
            state.deleteBookPopup = !state.deleteBookPopup;
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
            state.borrowBookPopup = false;
            state.updateBookPopup = false;
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
    toggleBorrowBookPopup,
    toggleUpdateBookPopup,
    toggleReadBookPopup,
    toggleDeleteBookPopup,
    toggleRecordBookPopup,
    toggleReturnBookPopup,
    toggleAddNewAdminPopup,
    toggleAddNewLibrarianPopup,
    closeAllPopup,
} = popupSlice.actions;

export default popupSlice.reducer;