import React, { useState, useContext } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import userAPI from '../../api/user';
import AppContext from '../../common/context';
import AccessError from '../../ui/AccessError';
import './Login.css';
import User from '../../utils/userClass';

const Login = ({ setToken }) => {
	const [state, dispatch] = useContext(AppContext);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errorMessage, setErrorMessage] = useState('');
	const history = useHistory();

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

	const submitCredentials = async (e) => {
		e.preventDefault();

		let credentials = {
			email,
			password,
		};

		await userAPI.loginUser(credentials).then((response) => {
			if (response.user) {
				let userToState = new User(response.user);
				let token = response.token;
				let userId = response.user._id;
				console.log(userToState);
				// localStorage.setItem('token', token);
				localStorage.setItem('userId', userId);
				localStorage.setItem('user', JSON.stringify(userToState));
				setToken(token);
				setErrorMessage('');
				clearInputs();
				history.push('/');
			} else {
				return setErrorMessage(response);
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
