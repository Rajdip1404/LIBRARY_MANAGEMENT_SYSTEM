import React, { useState } from "react";
import logo from "../assets/black-logo.png";
import logo_with_title from "../assets/logo-with-title.png";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { emailVerfication } from "../store/slices/auth.slice";

const EmailVerification = () => {
  const { email } = useParams();
  const [otp, setOtp] = useState();
  const dispatch = useDispatch();

  const { loading, error, message, user, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const handleOtpVerification = (e) => {
    e.preventDefault();
    dispatch(emailVerfication({ email, otp }));
  };


  useEffect(() => {
    if (message) navigateTo(`/verify-email/${email}`);
    if (error) {
      toast.error(error);
      dispatch(resetAuthSlice());
    }
  }, [dispatch, isAuthenticated, error, loading]);

  if (isAuthenticated) return <Navigate to={"/"} />;

  return <div>EmailVerification</div>;
};

export default EmailVerification;
