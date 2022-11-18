import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import './Login.scss'



const Login = () => {
	const loginProgress = useSelector((state) => state.auth.loginInProgress);
	const dispatch = useDispatch();
	const [loginData, setLoginData] = useState({
		email: "",
		password: "",
	});

	const Login = () => {
		
	}

	const loginInputHandler = (event) => {
		const { name, value } = event.target;
		setLoginData((prevData) => {
			return { ...prevData, [name]: value };
		});
	}

	return (
		<div className='Login container padding_top_nav'>
			<div className="login_container">
				<h1>Welcome back to Artex</h1>
				<div className="sub_util">
					Don't have an account? <Link to='/signup'><span>Signup</span></Link>
				</div>
				<div className="form_container">
					<div className="input_container">
						<label htmlFor="email">Email</label>
						<input type="text" name='email' value={loginData.email} onChange={loginInputHandler} />
					</div>
					<div className="input_container">
						<label htmlFor="password">Password</label>
						<input type="password" name='password' value={loginData.password} onChange={loginInputHandler} />
					</div>
				</div>

				<div className="login_btn" onClick={Login}>Login</div>
			</div>

			<div className="login_image">
				<img src="/public/assets/images/loginImage.svg" alt="" />
			</div>
		</div>
	)
}

export default Login