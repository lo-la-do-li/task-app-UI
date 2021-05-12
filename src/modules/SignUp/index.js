import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import userAPI from '../../api/user';
import '../Login/Login.css';

const SignUp = () => {
	const [user, setUser] = useState(null);
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errorMessage, setErrorMessage] = useState('');

	// useEffect(() => {
	// 	// login();
	// }, []);

	const AccessError = ({ message }) => {
		return <p className='error-message'>{message}</p>;
	};

	const handleInput = (e) => {
		if (e.target.name === 'name') {
			setName(e.target.value);
		}
		if (e.target.name === 'email') {
			setEmail(e.target.value);
		}
		if (e.target.name === 'password') {
			setPassword(e.target.value);
		}
	};

	const clearInputs = () => {
		setName('');
		setEmail('');
		setPassword('');
	};
	const registerNewUser = async (e) => {
		e.preventDefault();
		const userDetails = {
			name,
			email,
			password,
		};
		console.log('userDetails:', userDetails);
		await userAPI.createNewUser(userDetails).then((response) => {
			console.log('API response', response);
			let message;
			// Account for user input errors
			if (response.errors) {
				if (response.errors.password) {
					message = response.errors.password.message;
				} else if (response.errors.email) {
					message = response.errors.email.message;
				}
				return setErrorMessage(message);
				// If no errors, then create new user
			} else if (response.code === 11000) {
				console.log(response);
				message = `There is already a user registered under ${email}`;
				return setErrorMessage(message);
			} else {
				const newUser = response.user;
				const token = response.token;
				const userId = response.user._id;
				localStorage.setItem('token', token);
				localStorage.setItem('userId', userId);
				// document.cookie = `auth_token=${response.token}`;
				return setUser(newUser);
			}
		});
	};
	return (
		<div className='login-section'>
			<div className='form-section'>
				<form className='form'>
					<input
						className='signup-name'
						type='text'
						name='name'
						placeholder='Username'
						onChange={(event) => handleInput(event)}
						required
					/>
					<input
						className='add-email'
						type='text'
						name='email'
						placeholder='Email'
						onChange={(event) => handleInput(event)}
						required
					/>
					<input
						className='add-password'
						type='password'
						name='password'
						placeholder='Password'
						onChange={(event) => handleInput(event)}
						required
					/>
					<button className='form-btn' type='submit' onClick={registerNewUser}>
						Sign Up
					</button>
					{errorMessage !== '' && <AccessError message={errorMessage} />}
					<AccessError />
					{/* <p className='error-message'>{message}</p> */}
				</form>
				<div className='login'>
					<p className='helper-text'>Already have an account?</p>
					<button className='login-btn'>
						<Link to='/'>Login</Link>
					</button>
				</div>
			</div>
		</div>
	);
};

export default SignUp;
