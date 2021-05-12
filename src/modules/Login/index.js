import React, { useState, useEffect } from 'react';
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
			if (typeof response === 'object') {
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
					></input>
					<input
						className='add-password'
						type='password'
						name='password'
						placeholder='Password'
						onChange={(event) => handleChange(event)}
					></input>
					<button
						className='form-btn'
						type='submit'
						onClick={submitCredentials}
					>
						Login
					</button>
					<p className='error-message'></p>
				</form>
			</div>
		</div>
	);
};

export default Login;
