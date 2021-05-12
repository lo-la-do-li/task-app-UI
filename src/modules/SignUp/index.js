import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import userAPI from '../../api/user';

const SignUp = () => {
	const [user, setUser] = useState(null);
	const [name, setName] = useState('');
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
		const userDetails = {
			name,
			email,
			password,
		};
		console.log('userDetails:', userDetails);
		return userAPI.createNewUser(userDetails).then((response) => {
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
						Sign Up
					</button>
					<p className='error-message'></p>
				</form>
				<div className='signup'>
					{/* <form> */}
					<p className='helper-text'>Already have an account?</p>
					<Link to='/' className='signup-btn'>
						Login
					</Link>
					{/* </form> */}
				</div>
			</div>
		</div>
	);
};

export default SignUp;
