import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL;
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    error: null,
    loading: false,
    message: null,
    isAuthenticated: false,
  },
  reducers: {
    registerRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    registerSuccess: (state, action) => {
      console.log("Register Success Payload:", action.payload); // Check API response
      state.loading = false;
      state.error = null;
      state.message = action.payload?.message || "Registration successful"; // Ensure message exists
    },
    registerFailure: (state, action) => {
      state.loading = false;
      state.user = null;
      state.error = action.payload;
      state.message = null;
    },

    emailVerificationRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    emailVerificationSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
      state.message = action.payload.message || "Account verified successfully";
    },
    emailVerificationFailure: (state, action) => {
      state.loading = false;
      state.user = null;
      state.error = action.payload;
      state.message = null;
    },

    loginRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
      state.message = action.payload.message;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.user = null;
      state.error = action.payload;
      state.message = null;
    },
    logoutRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    logoutSuccess: (state) => {
      state.loading = false;
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      state.message = action.payload;
    },
    logoutFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    getUserRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    getUserSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.error = null;
      state.message = action.payload.message;
    },
    getUserFailure: (state, action) => {
      state.loading = false;
      state.user = null;
      state.error = action.payload;
      state.isAuthenticated = false;
      state.message = null;
    },
    forgotPasswordRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    forgotPasswordSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.message = action.payload;
    },
    forgotPasswordFailure: (state, action) => {
      state.loading = false;
      state.user = null;
      state.error = action.payload;
      state.isAuthenticated = false;
      state.message = null;
    },
    resetPasswordRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    resetPasswordSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.message = action.payload;
    },
    resetPasswordFailure: (state, action) => {
      state.loading = false;
      state.user = null;
      state.error = action.payload;
      state.isAuthenticated = false;
      state.message = null;
    },
    updatePasswordRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    updatePasswordSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.message = action.payload;
    },
    updatePasswordFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    resetAuthSlice(state) {
      state.user = state.user;
      state.error = null;
      state.loading = false;
      state.message = null;
      state.isAuthenticated = state.isAuthenticated || false;
    },
  },
});

export const resetAuthSlice = () => async (dispatch) => {
  dispatch(authSlice.actions.resetAuthSlice());
};

export const register = (data) => async (dispatch) => {
  dispatch(authSlice.actions.registerRequest());
  try {
    const response = await axios.post(`${API_URL}/api/auth/register`, data, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    dispatch(authSlice.actions.registerSuccess(response.data));
  } catch (error) {
    dispatch(authSlice.actions.registerFailure(error.response.data.message));
  }
};

export const emailVerification =
  (email, verificationCode) => async (dispatch) => {
    dispatch(authSlice.actions.emailVerificationRequest());
    try {
      const response = await axios.post(
        `${API_URL}/api/auth/verify-email`,
        { email, verificationCode },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Email Verification Success:", response.data); // Debugging log
      dispatch(authSlice.actions.emailVerificationSuccess(response.data));
    } catch (error) {
      console.error("Email Verification Error:", error); // Debugging log
      dispatch(
        authSlice.actions.emailVerificationFailure(
          error.response?.data?.message || "An error occurred"
        )
      );
    }
  };

export const login = (data) => async (dispatch) => {
  dispatch(authSlice.actions.loginRequest());
  try {
    const response = await axios.post(`${API_URL}/api/auth/login`, data, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    dispatch(authSlice.actions.loginSuccess(response.data));
  } catch (error) {
    dispatch(authSlice.actions.loginFailure(error.response.data.message));
  }
};

export const logout = () => async (dispatch) => {
  dispatch(authSlice.actions.logoutRequest());
  try {
    const response = await axios.get(`${API_URL}/api/auth/logout`, {
      withCredentials: true,
    });
    dispatch(authSlice.actions.logoutSuccess(response.data.message));
    dispatch(authSlice.actions.resetAuthSlice());
  } catch (error) {
    dispatch(authSlice.actions.logoutFailure(error.response.data.message));
  }
};

export const getUser = () => async (dispatch) => {
  dispatch(authSlice.actions.getUserRequest());
  try {
    const response = await axios.get(`${API_URL}/api/auth/get-user`, {
      withCredentials: true,
    });
    dispatch(authSlice.actions.getUserSuccess(response.data));
  } catch (error) {
    dispatch(authSlice.actions.getUserFailure(error.response.data.message));
  }
};

export const forgotPassword = (email) => async (dispatch) => {
  dispatch(authSlice.actions.forgotPasswordRequest());
  try {
    const response = await axios.post(
      `${API_URL}/api/auth/forgot-password`,
      { email },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch(authSlice.actions.forgotPasswordSuccess(response.data));
  } catch (error) {
    dispatch(
      authSlice.actions.forgotPasswordFailure(error.response.data.message)
    );
  }
};

export const resetPassword = (data, token) => async (dispatch) => {
  dispatch(authSlice.actions.resetPasswordRequest());
  try {
    const response = await axios.put(
      `${API_URL}/api/auth/reset-password/${token}`,
      data,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch(authSlice.actions.resetPasswordSuccess(response.data.message));
  } catch (error) {
    dispatch(
      authSlice.actions.resetPasswordFailure(error.response.data.message)
    );
  }
};

export const updatePassword = (data) => async (dispatch) => {
  dispatch(authSlice.actions.updatePasswordRequest());
  try {
    const response = await axios.put(
      `${API_URL}/api/auth/update-password`,
      data,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch(authSlice.actions.updatePasswordSuccess(response.data.message));
  } catch (error) {
    dispatch(
      authSlice.actions.updatePasswordFailure(error.response.data.message)
    );
  }
};

export default authSlice.reducer;