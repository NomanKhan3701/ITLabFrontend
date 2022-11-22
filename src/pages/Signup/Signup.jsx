import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Signup.scss'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { toast } from 'react-toastify'
import * as actions from '../../store/actions/index';

const SERVER_URL = import.meta.env.VITE_API_URL;

const Signup = () => {
	const dispatch = useDispatch();
	const [signupData, setSignupData] = useState({
		email: "",
		userName: "",
		password: "",
	});

	const Signup = async () => {
		dispatch(actions.signup({
			email: signupData.email,
			password: signupData.password,
			userName: signupData.userName,
		}));
	}

	const signupInputHandler = (event) => {
		const { name, value } = event.target;
		setSignupData((prevData) => {
			return { ...prevData, [name]: value };
		});
	}

	return (
		<div className='Signup container padding_top_nav'>
			{/* 
			<div className="signup_image">
				<img src="/public/assets/images/signup.svg" alt="" />
			</div> */}
			<div className="signup_container">
				{/* <div className="stamp"></div> */}
				<h1>Welcome back to Artex</h1>
				<div className="sub_util">
					Already have an account? <Link to='/login'><span>Login</span></Link>
				</div>
				<div className="form_container">
					<div className="input_container">
						<label htmlFor="email">Email</label>
						<input type="text" name='email' onChange={signupInputHandler} value={signupData.email} />
					</div>
					<div className="input_container">
						<label htmlFor="email">Username</label>
						<input type="text" name='userName' onChange={signupInputHandler} value={signupData.username} />
					</div>
					<div className="input_container">
						<label htmlFor="password">Password</label>
						<input type="password" name='password' onChange={signupInputHandler} value={signupData.password} />
					</div>
					<div className="subscribe">
						<input type="checkbox" name="subscribe" id="subscribe" />
						<label htmlFor="subscribe">I want to receive emails about the product, featue updates, events, and marketing promotions</label>
					</div>
				</div>

				<div className="signup_btn" onClick={Signup}>Create Account</div>
			</div>
		</div>
	)
}

export default Signup