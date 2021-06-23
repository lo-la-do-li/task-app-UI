import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import AppContext from '../../common/context';
import userAPI from '../../api/user';
import AccessError from '../../ui/AccessError';
import User from '../../utils/userClass';
import '../Login/Login.css';
import logo from '../../ui/images/checkbox.png';

const SignUp = ({ setToken }) => {
	const [state, dispatch] = useContext(AppContext);
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errorMessage, setErrorMessage] = useState('');
	const history = useHistory();

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
				let userToState = new User(response.user);
				let token = response.token;
				let userId = response.user._id;

				localStorage.setItem('userId', userId);
				localStorage.setItem('user', JSON.stringify(userToState));

				setToken(token);
				// document.cookie = `auth_token=${response.token}`;
				setErrorMessage('');
				clearInputs();
        setUserState(userToState)
				return history.push('/');
			}
		});
	};
	return (
		<div className='login-section'>
			<div className='form-section'>
				<div className='title'>
					<span>Lola's Task App</span>
					<img src={logo} alt='Task-App-logo' />
				</div>
          <p className='subtitle'>Create a New Account</p>
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
						<Link to='/login'>Login</Link>
					</button>
				</div>
			</div>
		</div>
	);
};

export default SignUp;
