import React from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import userAPI from '../../api/user';
import { getAccessToken } from '../../utils';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
	},
}));

export default function Nav({ token }) {
	const classes = useStyles();
	const history = useHistory();
	const logout = async () => {
		// const token = getAccessToken();
		// const token = localStorage.getItem('token');
		console.log('token in logout/nav:', token);
		await userAPI.logoutSession(token).then((response) => {
			if (response) {
				console.log(response);
				localStorage.removeItem('user');
				localStorage.removeItem('token');
				localStorage.removeItem('userId');
				// setToken();
				return history.push('/');
			}
			// window.alert('You have successfully logged out');
		});
	};
	return (
		<div className={classes.root}>
			<AppBar position='static'>
				<Toolbar>
					<IconButton
						edge='start'
						className={classes.menuButton}
						color='inherit'
						aria-label='menu'
					>
						<MenuIcon />
					</IconButton>
					<Typography variant='h6' className={classes.title}>
						Task App
					</Typography>
					<Button onClick={logout} color='inherit'>
						Logout
					</Button>
				</Toolbar>
			</AppBar>
		</div>
	);
}
