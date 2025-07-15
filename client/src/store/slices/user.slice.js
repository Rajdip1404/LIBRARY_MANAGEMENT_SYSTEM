import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const API_URL = import.meta.env.VITE_API_BASE_URL;
const userSlice = createSlice({
    name: "user",
    initialState: {
        users: [],
        admins: [],
        librarians: [],
        loading: false,
    },
    reducers: {
        fetchAllUsersRequest: (state) => {
            state.loading = true;
        },
        fetchAllUsersSuccess: (state, action) => {
            state.loading = false;
            state.users = action.payload;
        },
        fetchAllUsersFailure: (state, action) => {
            state.loading = false;
            toast.error(action.payload);
        },
        fetchAllAdminsRequest: (state) => {
            state.loading = true;
        },
        fetchAllAdminsSuccess: (state, action) => {
            state.loading = false;
            state.admins = action.payload;
        },
        fetchAllAdminsFailure: (state, action) => {
            state.loading = false;
            toast.error(action.payload);
        },
        fetchAllLibrariansRequest: (state) => {
            state.loading = true;
        },
        fetchAllLibrariansSuccess: (state, action) => {
            state.loading = false;
            state.librarians = action.payload;
        },
        fetchAllLibrariansFailure: (state, action) => {
            state.loading = false;
            toast.error(action.payload);
        },
        addNewAdminRequest: (state) => {
            state.loading = true;
        },
        addNewAdminSuccess: (state) => {
            state.loading = false;
        },
        addNewAdminFailure: (state) => {
            state.loading = false;
        },
        addNewLibrarianRequest: (state) => {
            state.loading = true;
        },
        addNewLibrarianSuccess: (state) => {
            state.loading = false;
        },
        addNewLibrarianFailure: (state) => {
            state.loading = false;
        },
    }
});

export const fetchAllUsers = () => async (dispatch) => {
    dispatch(userSlice.actions.fetchAllUsersRequest());
    try {
        const response = await axios.get(`${API_URL}/api/user/get-all-users`, {
          withCredentials: true,
        });
        dispatch(userSlice.actions.fetchAllUsersSuccess(response.data.users));
    } catch (error) {
        dispatch(userSlice.actions.fetchAllUsersFailure(error.response.data.message));
    }
};

export const fetchAllAdmins = () => async (dispatch) => {
    dispatch(userSlice.actions.fetchAllAdminsRequest());
    try {
        const response = await axios.get(`${API_URL}/api/user/get-all-admins`, {
          withCredentials: true,
        });
        dispatch(userSlice.actions.fetchAllAdminsSuccess(response.data.admins));
    } catch (error) {
        dispatch(userSlice.actions.fetchAllAdminsFailure(error.response.data.message));
    }
};

export const fetchAllLibrarians = () => async (dispatch) => {
    dispatch(userSlice.actions.fetchAllLibrariansRequest());
    try {
        const response = await axios.get(`${API_URL}/api/user/get-all-librarians`, {
          withCredentials: true,
        });
        dispatch(userSlice.actions.fetchAllLibrariansSuccess(response.data.librarians));
    } catch (error) {
        dispatch(userSlice.actions.fetchAllLibrariansFailure(error.response.data.message));
    }
};

export const addNewAdmin = (adminData) => async (dispatch) => {
    dispatch(userSlice.actions.addNewAdminRequest());
    try {
        const response = await axios.post(
          `${API_URL}/api/user/register-new-admin`,
          adminData, {
            withCredentials: true,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        dispatch(userSlice.actions.addNewAdminSuccess());
        toast.success(response.data.message);
    } catch (error) {
        dispatch(userSlice.actions.addNewAdminFailure());
        toast.error(error.response.data.message);
    }
}

export const addNewLibrarian = (librarianData) => async (dispatch) => {
    dispatch(userSlice.actions.addNewLibrarianRequest());
    try {
        const response = await axios.post(
          `${API_URL}/api/user/register-new-librarian`,
          librarianData, {
            withCredentials: true,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        dispatch(userSlice.actions.addNewLibrarianSuccess());
        toast.success(response.data.message);
    } catch (error) {
        dispatch(userSlice.actions.addNewLibrarianFailure());
        toast.error(error.response.data.message);
    }
}

export default userSlice.reducer;
