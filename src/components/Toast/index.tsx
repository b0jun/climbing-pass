'use client';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Toast = () => {
	return <ToastContainer hideProgressBar autoClose={1500} draggable={false} closeOnClick />;
};

export default Toast;
