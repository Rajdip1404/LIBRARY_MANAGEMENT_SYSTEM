import React, {useState} from 'react'
import { Link, Navigate } from 'react-router-dom';
import logo from "../assets/black-logo.png";
import logo_with_title from "../assets/logo-with-title.png";
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { login } from '../store/slices/auth.slice';
import { toast } from 'react-toastify';

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const {loading, error, message, user, isAuthenticated} = useSelector((state) => state.auth);

  const handleLogin = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("email", email);
    data.append("password", password);
    dispatch(login(data));
  }

  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch(resetAuthSlice());
    }
    if (error) {
      toast.error(error);
      dispatch(resetAuthSlice());
    }
  }, [dispatch, message, error, loading, isAuthenticated]);

  if (isAuthenticated) return <Navigate to={"/"} />;

  return (
    <div>Login</div>
  )
}

export default Login