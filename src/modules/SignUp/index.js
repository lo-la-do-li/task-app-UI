import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../../common/context';
import userAPI from '../../api/user';
import AccessError from '../../ui/AccessError';
import '../Login/Login.css';

const SignUp = () => {
	const [state, dispatch] = useContext(AppContext);
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errorMessage, setErrorMessage] = useState('');

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

	const setUserState = (user) => {
		console.log('called');
		const action = { type: 'SET_USER', authUser: user };
		dispatch(action);
	};

	const registerNewUser = async (e) => {
		e.preventDefault();

		const userDetails = {
			name,
			email,
			password,
		};

		await userAPI.createNewUser(userDetails).then((response) => {
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
				message = `There is already a user registered under ${email}`;
				return setErrorMessage(message);
			} else {
				const newUser = response.user;
				const token = response.token;
				const userId = response.user._id;
				localStorage.setItem('token', token);
				localStorage.setItem('userId', userId);
				// document.cookie = `auth_token=${response.token}`;
				setErrorMessage('');
				clearInputs();
				return setUserState(newUser);
			}
		});
	};
	return (
		<div className='login-section'>
			<div className='form-section'>
				<form className='form'>
					<input
						type='text'
						placeholder='Username'
						name='name'
						value={name}
						onChange={(event) => handleInput(event)}
						required
					/>
					<input
						type='text'
						placeholder='Email'
						name='email'
						value={email}
						onChange={(event) => handleInput(event)}
						required
					/>
					<input
						type='password'
						placeholder='Password'
						name='password'
						value={password}
						onChange={(event) => handleInput(event)}
						required
					/>
					<button className='form-btn' type='submit' onClick={registerNewUser}>
						Sign Up
					</button>
					{errorMessage !== '' && <AccessError message={errorMessage} />}
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
