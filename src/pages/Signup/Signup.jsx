import React from 'react'
import { Link } from 'react-router-dom'
import './Signup.scss'

const Signup = () => {
	return (
		<div className='Signup container padding_top_nav'>

			<div className="signup_image">
				<img src="/public/assets/images/signup.svg" alt="" />
			</div>
			<div className="signup_container">
				<h1>Welcome back to Artex</h1>
				<div className="sub_util">
					Already have an account? <Link to='/login'><span>Login</span></Link>
				</div>
				<div className="form_container">
					<div className="input_container">
						<label htmlFor="email">Email</label>
						<input type="text" name='email' />
					</div>
					<div className="input_container">
						<label htmlFor="email">Username</label>
						<input type="text" name='email' />
					</div>
					<div className="input_container">
						<label htmlFor="password">Password</label>
						<input type="password" name='password' />
					</div>
					<div className="subscribe">
						<input type="checkbox" name="subscribe" id="subscribe" />
						<label htmlFor="subscribe">I want to receive emails about the product, featue updates, events, and marketing promotions</label>
					</div>
				</div>

				<div className="signup_btn">Create Account</div>
			</div>
		</div>
	)
}

export default Signup