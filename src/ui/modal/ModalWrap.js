import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import { makeStyles } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';

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
		color: '#2b2733',
		border: 'none',
		background: '#fff',
		willChange: 'transform',
		marginTop: '10px',
		cursor: 'pointer',
		transition:
			'transform ease .3s, border ease 2s, background ease .3s, color ease .3s',
		'&:hover': {
			transform: 'translateY(-5%)',
			color: '#fff',
			background: 'linear-gradient(to bottom right, #4d4ae8, #8375d3)',
		},
	},
}));


export default function ModalWrap(props) {
	const { buttonOpen, children } =
		props;
	const classes = useStyles(props);
  const [open, setOpen] = useState(false)
  
  const handleClickOpen = () => {
			setOpen(true);
		};

	const handleClose = () => {
			setOpen(false);
		};

  const childrenWithProps = React.cloneElement(children, {handleClose: () => handleClose()})
	return (
		<div>
			<Fab
				className={classes.button}
				// style={{ border: 'none', background: 'rgb(244 237 253)' }}
				onClick={handleClickOpen}
			>
				{buttonOpen}
			</Fab>
			<Dialog
				open={open}
				TransitionComponent={Transition}
				keepMounted
				// className={classes.root} ** This will display only the modal
				onClose={handleClose}
				aria-label='modal-wrapper'
			>
				<section>{childrenWithProps}</section>
			</Dialog>
		</div>
	);
}
