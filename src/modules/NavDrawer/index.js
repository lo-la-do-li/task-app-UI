import React, { useContext, useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Fab from '@material-ui/core/Fab';
import Avatar from '@material-ui/core/Avatar';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
// import ListItemText from '@material-ui/core/ListItemText';
import EditIcon from '@material-ui/icons/Edit';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Button from '@material-ui/core/Button';
import ImageUpload from './ImageUpload';

// App imports 
import AppContext from '../../common/context';
import userAPI from '../../api/user';
import User from '../../utils/userClass';
import UserForm from '../../ui/modal/UserForm';
import ModalWrap from '../../ui/modal/ModalWrap';
import avatarPlaceholder from '../../ui/images/profile_placeholder.jpg';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
	},
	appBar: {
		transition: theme.transitions.create(['margin', 'width'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},
	appBarShift: {
		width: `calc(100% - ${drawerWidth}px)`,
		marginLeft: drawerWidth,
		transition: theme.transitions.create(['margin', 'width'], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	hide: {
		display: 'none',
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
	},
	drawerPaper: {
		width: drawerWidth,
		backgroundImage: 'linear-gradient(to bottom right, #ebe5fd, #fdebeb)',
	},
	drawerHeader: {
		display: 'flex',
		alignItems: 'center',
		padding: theme.spacing(0, 1),
		...theme.mixins.toolbar,
		justifyContent: 'flex-end',
	},
	contentSpacer: {
		display: 'flex',
		alignItems: 'center',
		padding: theme.spacing(0, 1),
		// necessary for content to be below app bar
		...theme.mixins.toolbar,
		justifyContent: 'flex-end',
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
		background: '#fffcfc',
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		marginLeft: -drawerWidth,
	},
	contentShift: {
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
		marginLeft: 0,
	},
	toolbar: {
		display: 'flex',
		justifyContent: 'space-between',
		// fontFamily: 'Source Sans Pro',
		backgroundImage: 'linear-gradient(to bottom right, #ebe5fd, #fdebeb)',
		color: '#2b2733',
	},
	profile: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		padding: '20px 2px 20px 2px',
	},
	avatar: {
		width: '200px',
		borderRadius: '50%',
	},
	avatarPlaceholder: {
		width: '200px',
		height: 'auto',
		borderRadius: '50%',
	},
	fab: {
		outline: 'none',
		color: '#fff',
		border: 'none',
		background: '#2b2733',
		willChange: 'transform',
		marginTop: '10px',
		cursor: 'pointer',
    position: 'absolute',
		transition:
			'transform ease .3s, border ease 2s, background ease .3s, color ease .3s',
		'&:hover': {
			transform: 'translateY(-5%)',
			color: '#fff',
			background: 'linear-gradient(to bottom right, #4d4ae8, #8375d3)',
		},
	},
}));

export default function NavDrawer({ token, setToken, children }) {
	const classes = useStyles();
	const theme = useTheme();
  const [state, dispatch] = useContext(AppContext);
	const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false)
  const [profile, setProfile] = useState(state.authUser);
  const [avatar, setAvatar] = useState('');
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    checkAvatar()
  }, [])
    
  useEffect(() => {
		console.log('reloaded')
	}, []);

    useEffect(() => {
      setProfile(state.authUser)
		}, [state.authUser]);

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

  const handleModalOpen = () => {
			setModalOpen(true);
		};

	const handleModalClose = () => {
			setModalOpen(false);
		};
  
  
  const checkAvatar = async () => {
    setAvatar('')
      await userAPI.getUserAvatar(localStorage.getItem('userId')).then(res => {
        if (res.error) {
        return setAvatar(avatarPlaceholder)
      } else {
        return setAvatar(res.url)
      }
    })
  }

  const setUserState = (user) => {
			const action = { type: 'SET_USER', authUser: user };
			dispatch(action);
	};

	const submitUserUpdates = async (e, name, email, password) => {
			e.preventDefault();
      let updates;
      if (password === "") {
        updates = {
          name,
          email
        }
      } else {
        updates = {
          name,
          email,
          password
        };
      }

			await userAPI.updateUserInfo(updates).then((res) => {
        if (res.errors) {
          let message;
          if (res.errors.password) {
            message = res.errors.password.message; 
          } 
          else if (res.errors.email) {
            message = res.errors.email.message;
          }
          return setErrorMessage(message)
        } else {
          let userToState = new User(res);
          localStorage.setItem('user', JSON.stringify(userToState));
          setModalOpen(false);
          setErrorMessage('')
          return setUserState(userToState)
        }
			});
			
	};

	const logout = async () => {
		await userAPI.logoutSession(token).then((response) => {
			if (response) {
				console.log(response);
				localStorage.removeItem('user');
				localStorage.removeItem('token');
				localStorage.removeItem('userId');
				let token = localStorage.getItem('token');
				setToken(token);
        // setProfile(null);
			}
		});
	};

	return (
		<div className={classes.root}>
			<CssBaseline />
			<AppBar
				position='fixed'
				className={clsx(classes.appBar, {
					[classes.appBarShift]: open,
				})}
			>
				<Toolbar className={classes.toolbar}>
					<IconButton
						color='inherit'
						aria-label='open drawer'
						onClick={handleDrawerOpen}
						edge='start'
						className={clsx(classes.menuButton, open && classes.hide)}
					>
						<MenuIcon />
					</IconButton>
					<Avatar
						src={avatar}
						alt={profile.name}
						className={clsx(open && classes.hide)}
					/>

					<Button
						onClick={logout}
						color='inherit'
						style={{ fontFamily: 'Martel Sans' }}
					>
						Logout
					</Button>
				</Toolbar>
			</AppBar>

			<Drawer
				className={classes.drawer}
				variant='persistent'
				anchor='left'
				open={open}
				classes={{
					paper: classes.drawerPaper,
				}}
			>
				<div className={classes.drawerHeader}>
					<IconButton onClick={handleDrawerClose}>
						{theme.direction === 'ltr' ? (
							<ChevronLeftIcon />
						) : (
							<ChevronRightIcon />
						)}
					</IconButton>
				</div>

				<Divider />

				<Container className={classes.profile} fixed>
          
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'flex-end',
							paddingBottom: '20px',
              
						}}
					>
						{avatar.includes(profile.name) ? (
							<img
								className={classes.avatar}
								src={avatar}
								alt={`${profile.name} Avatar`}
							/>
						) : (
							<img
								className={classes.avatar}
								src={avatar}
								alt={`${profile.name} Avatar`}
							/>
						)}

						<Fab className={classes.fab}>
              <ModalWrap
                buttonOpen={
                    <AddAPhotoIcon />
                }
              >
                <ImageUpload checkAvatar={checkAvatar} />
              </ModalWrap>
						</Fab>
					</div>
          
					<Typography style={{ fontFamily: 'Martel Sans' }} variant='subtitle1'>
						{profile.name.toUpperCase()}
					</Typography>
					<Typography
						style={{ fontFamily: 'Lato' }}
						variant='subtitle1'
						gutterBottom
					>
						{profile.email}
					</Typography>
          
				</Container>

				<Divider />

				<List>
					<UserForm
						open={modalOpen}
						handleClose={handleModalClose}
						profile={profile}
						submitAction={submitUserUpdates}
						errorMessage={errorMessage}
						button={
							<ListItem button onClick={handleModalOpen}>
								<ListItemIcon>
									<EditIcon style={{ fill: '#2b2733' }} />
								</ListItemIcon>

								<Typography
									style={{ fontFamily: 'Martel Sans' }}
									variant='button'
									gutterBottom
								>
									Edit User Info
								</Typography>
							</ListItem>
						}
					/>

					<ListItem button>
						<ListItemIcon>
							<DeleteForeverIcon style={{ fill: '#2b2733' }} />
						</ListItemIcon>

						<Typography
							style={{ fontFamily: 'Martel Sans' }}
							variant='button'
							gutterBottom
						>
							Delete Account
						</Typography>
					</ListItem>
				</List>
			</Drawer>

			<main
				className={clsx(classes.content, {
					[classes.contentShift]: open,
				})}
			>
				<div className={classes.contentSpacer} />
				{children}
			</main>
		</div>
	);
}
