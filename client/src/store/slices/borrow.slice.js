import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toggleRecordBookPopup } from "./popUp.slice";

const API_URL = import.meta.env.VITE_API_BASE_URL;

const borrowSlice = createSlice({
  name: "borrow",
  initialState: {
    loading: false,
    error: null,
    message: null,
    userBorrowedBooks: [],
    allBorrowedBooks: [],
  },
  reducers: {
    fetchUserBorrowedBooksRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    fetchUserBorrowedBooksSuccess: (state, action) => {
      state.loading = false;
      state.userBorrowedBooks = action.payload;
      state.error = null;
    },
    fetchUserBorrowedBooksFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    recordBookRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    recordBookSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.message = action.payload;
    },
    recordBookFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchAllBorrowedBooksRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    fetchAllBorrowedBooksSuccess: (state, action) => {
      state.loading = false;
      state.allBorrowedBooks = action.payload;
      state.error = null;
      state.message = null;
    },
    fetchAllBorrowedBooksFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    returnBorrowedBookRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    returnBorrowedBookSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.message = action.payload;
    },
    returnBorrowedBookFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    resetBorrowSlice: (state) => {
      state.loading = false;
      state.error = null;
      state.message = null;
    //   state.userBorrowedBooks = [];
    //   state.allBorrowedBooks = [];
    },
  },
});

export const fetchUserBorrowedBooks = () => async (dispatch) => {
  dispatch(borrowSlice.actions.fetchUserBorrowedBooksRequest());
  try {
    const response = await axios.get(
      `${API_URL}/api/borrow/my-borrowed-books`,
      {
        withCredentials: true,
      }
    );
    dispatch(
      borrowSlice.actions.fetchUserBorrowedBooksSuccess(
        response.data.borrowedBooks
      )
    );
    console.log(response);
  } catch (error) {
    dispatch(borrowSlice.actions.fetchUserBorrowedBooksFailure(error.response.data.message));
  }
};

export const fetchAllBorrowedBooks = () => async (dispatch) => {
  dispatch(borrowSlice.actions.fetchAllBorrowedBooksRequest());
  try {
    const response = await axios.get(
      `${API_URL}/api/borrow/borrowed-books-by-users`,
      {
        withCredentials: true,
      }
    );
    dispatch(
      borrowSlice.actions.fetchAllBorrowedBooksSuccess(
        response.data.borrowedBooks
      )
    );
  } catch (error) {
    dispatch(borrowSlice.actions.fetchAllBorrowedBooksFailure(error.response.data.message));
  }
};

export const recordBorrowedBooks = (bookId, email) => async (dispatch) => {  
  dispatch(borrowSlice.actions.recordBookRequest());
  try {
    const response = await axios.post(
      `${API_URL}/api/borrow/record-borrowed-books/${bookId}`,
      { email },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch(borrowSlice.actions.recordBookSuccess(response.data.message));
  } catch (error) {
    dispatch(borrowSlice.actions.recordBookFailure(error.response.data.message));
  }
};

export const returnBorrowedBook = (email, bookId) => async (dispatch) => {
  dispatch(borrowSlice.actions.returnBorrowedBookRequest());
  try {
    const response = await axios.put(
      `${API_URL}/api/borrow/return-borrowed-books/${bookId}`,
      { email },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch(borrowSlice.actions.returnBorrowedBookSuccess(response.data.message));
    console.log(response);
    dispatch(toggleRecordBookPopup());
    dispatch(fetchUserBorrowedBooks());
  } catch (error) {
    console.log(error);
    dispatch(borrowSlice.actions.returnBorrowedBookFailure(error.response.data.message));
  }
};

export const resetBorrowSlice = () => (dispatch) => {
  dispatch(borrowSlice.actions.resetBorrowSlice());
};

export default borrowSlice.reducer;

