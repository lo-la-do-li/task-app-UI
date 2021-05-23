import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import userAPI from '../../api/user';


const useStyles = makeStyles(() => ({
	root: {
		display: 'flex',
		padding: '1em',
		flexDirection: 'column',
		alignItems: 'center',
		height: '100%',
		textAlign: 'center',
	},
	box: {
		fontSize: '1em',
		width: '100%',
		border: 'none',
		padding: '1em',
		borderRadius: '10px',
		backgroundColor: 'rgb(40,44,52, .5)',
		outline: 'none',
		color: 'blanchedalmond',
	},
	imgBox: {
		marginRight: '2em',
		paddingBottom: '10px',
		display: 'flex',
		justifyContent: 'center',
		border: 1,
	},
	img: {
		height: 'inherit',
		maxWidth: 'inherit',
		paddingBottom: '30px',
	},
	input: {
		// display: 'none',
	},
	icon: {
		margin: 'auto',
		position: 'relative',
		width: '80%',
		height: '80%',
		paddingTop: '.7em',
		'& img': {
			width: '100%',
			height: '100%',
			objectFit: 'cover',
		},
	},
}));

const ImageUpload = () => {
	const classes = useStyles();
	const [source, setSource] = useState('');
	const [sourceFile, setSourceFile] = useState(null);
	const [open, setOpen] = useState(true);

	const handleClose = () => {
		setOpen(!open);
	};

	const handleCapture = (target) => {
		if (target.files) {
			if (target.files.length !== 0) {
				const file = target.files[0];
				const newUrl = URL.createObjectURL(file);
				setSource(newUrl);
				setSourceFile(file);
			}
		}
	};

	// useEffect(() => {
	// 	let updates = {};
	// 	updates.image = sourceFile;
	// 	source ? console.log('source file', updates) : console.log('no source', updates);
	// }, [source]);
  
  const submitNewAvatar = async () => {
    await userAPI.uploadAvatar(sourceFile).then(res => console.log(res))
  }

	return (
		<div className={classes.root}>
      <h4>Take a new photo or upload one with your device</h4>
			{source && (
				<div className={classes.icon}>
					<img src={source} alt={'snap'} className={classes.img} />
				</div>
			)}
			<input
				accept='image/*'
				className={classes.input}
				id='icon-button-file'
				type='file'
				capture='environment'
				onChange={(e) => handleCapture(e.target)}
			/>


			<label htmlFor='icon-button-file'>
				<IconButton
					onClick={submitNewAvatar}
				>
					<EditIcon/>
				</IconButton>
			</label>
		</div>
	);
};
export default ImageUpload;
