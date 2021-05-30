import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import userAPI from '../../api/user';
import AppContext from '../../common/context';
import AccessError from '../../ui/AccessError';
import './Login.css';
import User from '../../utils/userClass';
import logo from '../../ui/images/icons-512.png'

const Login = ({ setToken }) => {
	const [state, dispatch] = useContext(AppContext);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errorMessage, setErrorMessage] = useState('');
	const history = useHistory();

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
  };

	const submitCredentials = async (e) => {
		e.preventDefault();

		let credentials = {
			email,
			password,
		};

		await userAPI.loginUser(credentials).then((response) => {
      console.log(response)
			if (response.user) {
				let userToState = new User(response.user);
				let token = response.token;
				let userId = response.user._id;
				
				localStorage.setItem('userId', userId);
				localStorage.setItem('user', JSON.stringify(userToState));
				setToken(token);
				setErrorMessage('');
				clearInputs();
        setUserState(userToState)
				return history.push('/');
			} else {
				return setErrorMessage(response);
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
						LOG IN
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
