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
	actionButton: {
		fontFamily: 'Martel Sans',
	},
}));

export default function TaskForm({task, button, handleClose, open, create, submitAction}) {
  const classes = useStyles()

  const [newDescription, setNewDescription] = useState('');
  

  useEffect(() => {
    if (task) {
    return setNewDescription(task.description)
    } else {
    return resetInputs();
    }
  }, [task, open])

	const resetInputs = () => {
			setNewDescription('');
		};

  const handleChange = (e) => {
    setNewDescription(e.target.value)
  }

  return (
		<div>
			{button}
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby='form-dialog-title'
			>
				{!create ? (
					<DialogTitle id='edit-task-form'>
						<span className={classes.title}>Edit Task</span>
					</DialogTitle>
				) : (
					<DialogTitle id='edit-task-form' className={classes.title}>
						<span className={classes.title}>Add Task</span>
					</DialogTitle>
				)}
				<DialogContent>
					{!create ? (
						<DialogContentText className={classes.text}>
							Update your description for this task below
						</DialogContentText>
					) : (
						<DialogContentText className={classes.text}>
							Provide a description for your new task
						</DialogContentText>
					)}
					<TextField
						InputProps={{
							classes: {
								input: classes.text,
							},
						}}
						autoFocus
						margin='dense'
						label='Description'
						type='text'
						value={newDescription}
						onChange={handleChange}
						fullWidth
					/>
				</DialogContent>
				<DialogActions>
					<Button
						className={classes.actionButton}
						onClick={handleClose}
						color='primary'
					>
						Cancel
					</Button>
					{!create ? (
						<Button
							className={classes.actionButton}
							onClick={(e) => submitAction(e, newDescription, task._id)}
							color='primary'
						>
							Update
						</Button>
					) : (
						<Button
							className={classes.actionButton}
							onClick={(e) => submitAction(e, newDescription)}
							color='primary'
						>
							Create
						</Button>
					)}
				</DialogActions>
			</Dialog>
		</div>
	);
}