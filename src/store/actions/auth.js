import * as actions from '../constants/actionTypes';
import axios from 'axios';
import { toast } from 'react-toastify';
// import jwt from 'jsonwebtoken';
// import cookieCutter from 'cookie-cutter';

const SERVER_URL = import.meta.env.VITE_API_URL;

export const authStart = () => {
	return {
		type: actionTypes.AUTH_START,
	};
};

export const authSuccess = (token, user) => {
	return {
		type: actionTypes.AUTH_SUCCESS,
		token: token,
		user: user,
	};
};

export const logout = () => {
	localStorage.removeItem("token");
	localStorage.removeItem("expiresIn");
	localStorage.removeItem("user");

	return {
		type: actionTypes.AUTH_LOGOUT,
	};
};

export const authFail = (error, message) => {
	return {
		type: actionTypes.AUTH_FAIL,
		error: error,
		message: message,
	};
};

export const login = (email, password) => {
	return (dispatch) => {
		dispatch(authStart());
		try {
			axios.post(`${SERVER_URL}/user/login`, {
				email: email,
				password: password,
			}).then((res) => {
				console.log(res);
				if (res.status === 200) {
					const token = res.data.token;
					// const decoded = jwt.decode(token);
					// const user = {
					// 	id: decoded.id,
					// 	email: decoded.email,
					// 	username: decoded.username,
					// };
					const user = res.data.user;
					// const expiresIn = new Date(decoded.exp * 1000);
					localStorage.setItem("token", token);
					// localStorage.setItem("expiresIn", expiresIn);
					localStorage.setItem("user", JSON.stringify(user));
					dispatch(authSuccess(token, user));
				}
			}).catch((err) => {
				toast.error('Login failed');
				console.log(err);
			});
		} catch (err) {
			console.log(err);
		}
	};
};

export const signup = ({ email, password, username }) => {
	return (dispatch) => {
		dispatch(authStart());
		try {
			axios.post(`${SERVER_URL}/user/signup`, {
				email: email,
				password: password,
				username: username,
			}).then((res) => {
				console.log(res);
				if (res.status === 200) {
					const token = res.data.token;
					// const decoded = jwt.decode(token);
					// const user = {
					// 	id: decoded.id,
					// 	email: decoded.email,
					// 	username: decoded.username,
					// };
					const user = res.data.user;
					// const expiresIn = new Date(decoded.exp * 1000);
					localStorage.setItem("token", token);
					// localStorage.setItem("expiresIn", expiresIn);
					localStorage.setItem("user", JSON.stringify(user));
					dispatch(authSuccess(token, user));
				}
			}).catch((err) => {
				toast.error('Signup failed');
				console.log(err);
			});
		} catch (err) {
			console.log(err);
		}
	};
};

export const authCheckState = () => {
	return (dispatch) => {
		const token = localStorage.getItem("token");
		// const expiresIn = localStorage.getItem("expiresIn");

		// if (new Date().getTime() > +expiresIn) {
		// 	dispatch(logout(token));
		// } else {
		const user = JSON.parse(localStorage.getItem("user"));
		if (user) {
			dispatch(authSuccess(token, user));
		}
		// }
	};
};