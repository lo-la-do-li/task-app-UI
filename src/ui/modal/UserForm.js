import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
	title: {
		fontFamily: 'Martel Sans',
		color: '#2b2733',
	},
	text: {
		fontFamily: 'Lato',
	},
}));
export default function UserForm({profile, button, handleClose, open, submitAction, errorMessage}) {
  const classes = useStyles()

  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [password, setPassword] = useState('');
  
  useEffect(() => {
    resetInputs()
  }, [handleClose])
  
  const resetInputs = () => {
    setName(profile.name)
    setEmail(profile.email)
    setPassword('');
  }
  const handleChange = (e) => {
    if (e.target.name === 'name') {
      setName(e.target.value)
    }
    else if (e.target.name === 'email') {
			setEmail(e.target.value);
		}
    else if (e.target.name === 'password') {
			setPassword(e.target.value);
		}
  }

  return (
		<div>
			{button}
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby='form-dialog-title'
			>
				<DialogTitle id='edit-profile-form'>
					<span className={classes.title}>Update User Information</span>
				</DialogTitle>

				<DialogContent className={classes.text}>
					<DialogContentText className={classes.text}>
						Edit any or all values below and select "Update"
					</DialogContentText>

					<TextField
						className={classes.text}
						autoFocus
						margin='dense'
						label='Name'
						type='text'
						name='name'
						value={name}
						onChange={handleChange}
						fullWidth
					/>
					<TextField
						autoFocus
						margin='dense'
						label='Email'
						type='text'
						name='email'
						value={email}
						onChange={handleChange}
						fullWidth
					/>
					<TextField
						className={classes.text}
						autoFocus
						margin='dense'
						label='Password: Leave blank to keep current password'
						type='password'
						name='password'
						value={password}
						onChange={handleChange}
						fullWidth
					/>

					<DialogContentText className={classes.text} style={{ color: 'red' }}>
						{errorMessage}
					</DialogContentText>
				</DialogContent>

				<DialogActions>
					<Button
						className={classes.text}
						onClick={handleClose}
						color='primary'
					>
						Cancel
					</Button>

					<Button
						onClick={(e) => submitAction(e, name, email, password)}
						color='primary'
						className={classes.text}
					>
						Update
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}