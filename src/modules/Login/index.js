import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import userAPI from '../../api/user';
import AppContext from '../../common/context';
import AccessError from '../../ui/AccessError';
import './Login.css';

const Login = () => {
	const [state, dispatch] = useContext(AppContext);
	const [user, setUser] = useState(null);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errorMessage, setErrorMessage] = useState('');

	const testConnection = async () => {
		await userAPI.testAPIConnection().then((response) => console.log(response));
	};

	const handleChange = (event) => {
		event.target.name === 'email'
			? setEmail(event.target.value)
			: setPassword(event.target.value);
	};

	const clearInputs = () => {
		setEmail('');
		setPassword('');
	};

	const setUserState = (user) => {
		const action = { type: 'SET_USER', authUser: user };
		dispatch(action);
		setAuthState();
	};

	const setAuthState = () => {
		const action = { type: 'SET_AUTHORIZED', isAuthorized: true };
		dispatch(action);
	};
	const submitCredentials = async (e) => {
		e.preventDefault();

		const credentials = {
			email,
			password,
		};

		await userAPI.loginUser(credentials).then((response) => {
			console.log(response);
			if (response.user) {
				const userToState = response.user;
				const token = response.token;
				const userId = response.user._id;

				localStorage.setItem('token', token);
				localStorage.setItem('userId', userId);

				setErrorMessage('');
				clearInputs();
				return setUserState(userToState);
			} else {
				setErrorMessage(response);
			}
		});
	};
	return (
		<div className='login-section'>
			<div className='form-section'>
				<form className='form'>
					<input
						type='text'
						placeholder='Email'
						name='email'
						value={email}
						onChange={(event) => handleChange(event)}
						required
					/>
					<input
						type='password'
						placeholder='Password'
						name='password'
						value={password}
						onChange={(event) => handleChange(event)}
						required
					/>
					<button
						className='form-btn'
						type='submit'
						onClick={submitCredentials}
					>
						Log In
					</button>
					{errorMessage !== '' && <AccessError message={errorMessage} />}
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
