import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import { ClassRounded } from '@material-ui/icons';

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction='up' ref={ref} {...props} />;
});

const useStyles = makeStyles(() => ({
	root: {
		display: 'flex',
		flexDirection: 'column',
		backgroundColor: '#232323',
		padding: '.3em 0',
		color: 'white',
		minWidth: '100%',
		maxWidth: '1000px',
		width: 'inherit',
		minHeight: 'inherit',
		maxHeight: 'inherit',
		height: 'inherit',
		fontFamily: 'Lato',
	},
	content: {
		padding: '1em',
		fontSize: 16,
	},
	button: {
		outline: 'none',
		color: '#fff',
		border: 'none',
		background: 'transparent',
		// marginTop: '10px',
		cursor: 'pointer',
	},
	text: {
		fontFamily: 'Lato',
		color: '#232323',
	},
	actionButton: {
		fontFamily: 'Martel Sans',
	},
}));

export default function Confirm({ buttonOpen, confirmMessage, confirmAction }) {

	const classes = useStyles();
	const [open, setOpen] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div>
			<span
				className={classes.button}
				// style={{ border: 'none', background: 'transparent' }}
				onClick={handleClickOpen}
			>
				{buttonOpen}
			</span>
			<Dialog
				open={open}
				TransitionComponent={Transition}
				keepMounted
				// className={classes.root} ** This will display only the modal
				onClose={handleClose}
				aria-label='modal-wrapper'
			>
				<DialogContent>
					<DialogContentText className={classes.text}>
						{confirmMessage}
					</DialogContentText>

					<DialogActions>
						<Button
							className={classes.actionButton}
							onClick={handleClose}
							color='primary'
						>
							Cancel
						</Button>

						<Button
							onClick={(e) => confirmAction()}
							color='primary'
							className={classes.actionButton}
						>
							Confirm
						</Button>
					</DialogActions>
				</DialogContent>
			</Dialog>
		</div>
	);
}
