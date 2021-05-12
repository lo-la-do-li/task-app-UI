import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import userAPI from '../../api/user';
import './Login.css';

const Login = () => {
	const [user, setUser] = useState(null);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	useEffect(() => {
		// login();
	}, []);

	const handleChange = (event) => {
		event.target.name === 'email'
			? setEmail(event.target.value)
			: setPassword(event.target.value);
	};

	const submitCredentials = (e) => {
		e.preventDefault();
		const credentials = {
			email,
			password,
		};
		console.log('credentials:', credentials);
		return userAPI.loginUser(credentials).then((response) => {
			console.log(response);
			if (response.user) {
				const user = response.user;
				const token = response.token;
				const userId = response.user._id;

				localStorage.setItem('token', token);
				// localStorage.setItem('userInfo', JSON.stringify(user));
				localStorage.setItem('userId', userId);

				return setUser(user);
			} else {
				document.querySelector('.error-message').style.display = 'flex';
				document.querySelector('.error-message').innerHTML = `${response}`;
			}
		});
	};
	return (
		<div className='login-section'>
			<div className='form-section'>
				<form className='form'>
					<input
						className='add-email'
						type='text'
						name='email'
						placeholder='Email'
						onChange={(event) => handleChange(event)}
						required
					></input>
					<input
						className='add-password'
						type='password'
						name='password'
						placeholder='Password'
						onChange={(event) => handleChange(event)}
						required
					></input>
					<button
						className='form-btn'
						type='submit'
						onClick={submitCredentials}
					>
						Log In
					</button>
					<p className='error-message'></p>
				</form>
				<div className='signup'>
					<p className='helper-text'>New to Task App?</p>
					<button className='signup-btn'>
						<Link to='/register'>Sign Up</Link>
					</button>
				</div>
			</div>
		</div>
	);
};

export default Login;
