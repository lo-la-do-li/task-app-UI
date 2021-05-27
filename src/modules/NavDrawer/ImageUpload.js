import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import PhotoLibraryRoundedIcon from '@material-ui/icons/PhotoLibraryRounded';
// import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import userAPI from '../../api/user';


const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		padding: '2em',
		flexDirection: 'column',
		alignItems: 'center',
		height: '100%',
		minWidth: '300px',
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
		paddingBottom: '10px',
	},
	input: {
		display: 'none',
	},
	preview: {
		width: '80%',
		paddingTop: '.7em',
		position: 'relative',
		'& img': {
			// border: '1px solid black',
			borderRadius: '50%',
			width: '200px',
			height: '200px',
			objectFit: 'cover',
		},
	},
	fab: {
		outline: 'none',
		color: '#fff',
		border: 'none',
		background: 'linear-gradient(to bottom right, #4d4ae8, #8375d3)',
		willChange: 'transform',
		margin: '25px 0px',
		cursor: 'pointer',
		// position: 'relative',
		transition:
			'transform ease .3s, border ease 2s, background ease .3s, color ease .3s',
		'&:hover': {
			transform: 'translateY(-5%)',
			background: '#2b2733',
			// color: '#fff',
		},
	},
	button: {
		margin: 10,
	},
	extendedIcon: {
		marginRight: theme.spacing(1),
	},
	title: {
		fontFamily: 'Martel Sans',
		color: '#2b2733',
	},
	text: {
		fontFamily: 'Lato',
	},
}));

const ImageUpload = ({ checkAvatar, handleClose }) => {
	const classes = useStyles();
	const [source, setSource] = useState('');
	const [sourceFile, setSourceFile] = useState(null);
	const [error, setError] = useState('');

  useEffect(() => {
    resetPhotoUpload()
  }, [handleClose])

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

  const resetPhotoUpload = () => {
    setSourceFile(null);
		setSource('');
		setError('');
  }

  const submitNewAvatar = async () => {
    await userAPI.uploadAvatar(sourceFile).then(res => {
      if(res.status === 200) {
      resetPhotoUpload()
      handleClose()
      } else {
        setError(res)
        return console.log(res)
      }
      return checkAvatar();
    })
  }

	return (
		<div className={classes.root}>
			{!sourceFile && (
				<Typography className={classes.title} variant='body1' gutterBottom>
					Take a photo on your mobile device or upload one
				</Typography>
			)}
			{sourceFile && (
				<>
					<div className={classes.preview}>
						<img src={source} alt={'snap'} className={classes.img} />
					</div>

					<Typography className={classes.text} variant='subtitle1' gutterBottom>
						{sourceFile.name}
					</Typography>
				</>
			)}
			<Typography
				variant='subtitle2'
				style={{ color: 'red', marginBottom: '1em' }}
				gutterBottom
			>
				{error}
			</Typography>
			<div>
				<input
					accept='image/*'
					className={classes.input}
					id='icon-button-file'
					type='file'
					capture='environment'
					onChange={(e) => handleCapture(e.target)}
				/>
				<label htmlFor='icon-button-file'>
			
					<Fab className={classes.button} component='span' variant='extended'>
						<PhotoLibraryRoundedIcon className={classes.extendedIcon} />
						Select an image
					</Fab>

				</label>
			</div>
			{sourceFile && (
				<label htmlFor='icon-button-file'>
					<Fab className={classes.fab} onClick={submitNewAvatar}>
						<span aria-label='upload user image'>
							<AddPhotoAlternateIcon />
						</span>
					</Fab>
				</label>
			)}
		</div>
	);
};
export default ImageUpload;
