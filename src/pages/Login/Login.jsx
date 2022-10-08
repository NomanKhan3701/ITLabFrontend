import React from 'react'
import { Link } from 'react-router-dom'
import './Login.scss'

const Login = () => {
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
						<input type="text" name='email' />
					</div>
					<div className="input_container">
						<label htmlFor="password">Password</label>
						<input type="password" name='password' />
					</div>
				</div>

				<div className="login_btn">Login</div>
			</div>

			<div className="login_image">
				<img src="/public/assets/images/loginImage.svg" alt="" />
			</div>
		</div>
	)
}

export default Login