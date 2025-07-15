import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL;

const bookSlice = createSlice({
  name: "book",
  initialState: {
    loading: false,
    error: null,
    message: null,
    books: [],
  },
  reducers: {
    fetchBooksRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    fetchBooksSuccess: (state, action) => {
      state.loading = false;
      state.books = action.payload;
      state.error = null;
      state.message = null;
    },
    fetchBooksFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.message = "Failed to fetch books";
    },
    addBookRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    addBookSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.message = action.payload || "Book added successfully";
    },
    addBookFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteBookRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    deleteBookSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.message = action.payload || "Book deleted successfully";
    },
    deleteBookFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    updateBookRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    updateBookSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.message = action.payload || "Book updated successfully";
    },
    updateBookFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    resetBookSlice: (state) => {
      state.loading = false;
      state.error = null;
      state.message = null;
      //   state.books = [];
    },
  },
});

export const fetchAllBooks = () => async (dispatch) => {
  dispatch(bookSlice.actions.fetchBooksRequest());
  try {
    const response = await axios.get(`${API_URL}/api/book/get-all-books`, {
      withCredentials: true,
    });
    dispatch(bookSlice.actions.fetchBooksSuccess(response.data.books));
  } catch (error) {
    console.log(error);
    dispatch(
      bookSlice.actions.fetchBooksFailure(
        error.response ? error.response.data.message : "Network Error"
      )
    );
  }
};

export const addBook = (bookData) => async (dispatch) => {
  dispatch(bookSlice.actions.addBookRequest());
  try {
    const response = await axios.post(
      `${API_URL}/api/book/admin/add-book`,
      bookData,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    dispatch(bookSlice.actions.addBookSuccess(response.data.message));
  } catch (error) {
    dispatch(
      bookSlice.actions.addBookFailure(
        error.response ? error.response.data.message : "Network Error"
      )
    );
  }
};

export const deleteBook = (bookId) => async (dispatch) => {
  dispatch(bookSlice.actions.deleteBookRequest());
  try {
    const response = await axios.delete(
      `${API_URL}/api/book/admin/delete-book/${bookId}`,
      {
        withCredentials: true,
      }
    );
    dispatch(bookSlice.actions.deleteBookSuccess(response.data.message));
  } catch (error) {
    dispatch(
      bookSlice.actions.deleteBookFailure(
        error.response ? error.response.data.message : "Network Error"
      )
    );
  }
};

export const updateBook = (bookId, bookData) => async (dispatch) => {
  dispatch(bookSlice.actions.updateBookRequest());
  try {
    const response = await axios.put(
      `${API_URL}/api/book/admin/update-book/${bookId}`,
      bookData,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    dispatch(bookSlice.actions.updateBookSuccess(response.data.message));
  } catch (error) {
    dispatch(
      bookSlice.actions.updateBookFailure(
        error.response ? error.response.data.message : "Network Error"
      )
    );
  }
};

export const resetBookSlice = () => (dispatch) => {
  dispatch(bookSlice.actions.resetBookSlice());
};

export default bookSlice.reducer;
