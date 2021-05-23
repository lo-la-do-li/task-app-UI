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
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Button from '@material-ui/core/Button';
import ImageUpload from './ImageUpload';

// App imports 
import AppContext from '../../common/context';
import userAPI from '../../api/user';
import User from '../../utils/userClass';
import UserForm from '../../ui/modal/UserForm';
import ModalWrap from '../../ui/modal/ModalWrap';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
    // backgroundColor: '#2b2733'
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
    backgroundImage: 'linear-gradient(to right, #eacdcd , #d7d6f0)',
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
    backgroundImage: 'linear-gradient(to right, #d7d6f0, #eacdcd)',
    color: '#2b2733'
	},
  profile: {
    display: 'flex',
    flexDirection: 'column', 
    alignItems: 'center',
    padding: '20px 2px 20px 2px'
  },
  profilePic: {
    width: "200px",
    borderRadius: "50%"
  }
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
    let placeholderImg = "https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1214428300?k=6&m=1214428300&s=170667a&w=0&h=hMQs-822xLWFz66z3Xfd8vPog333rNFHU6Q_kc9Sues="
      await userAPI.getUserAvatar(localStorage.getItem('userId')).then(res => {
        if (res.url) {
        return setAvatar(res.url)
      } else {
        return setAvatar(placeholderImg)
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
        console.log(res)
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
			// setTaskEdit(null);
			
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
					<Typography
						style={{ fontFamily: 'Lato', fontSize: '24px', fontWeight: '600' }}
						component='h1'
						noWrap
					>
						Task App
					</Typography>
					<Button onClick={logout} color='inherit'>
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
					<div style={{ paddingBottom: '20px' }}>
						<img
							className={classes.profilePic}
							src={avatar}
							alt='profile-pic'
						/>
						<ModalWrap button={<EditIcon style={{ fill: '#021448a6' }} />}>
							<ImageUpload />
						</ModalWrap>
					</div>
					<Typography variant='subtitle1'>
						{profile.name.toUpperCase()}
					</Typography>
					<Typography variant='subtitle2' gutterBottom>
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
									<EditIcon style={{ fill: '#021448a6' }} />
								</ListItemIcon>
								<ListItemText primary={'Edit User Info'} />
							</ListItem>
						}
					/>

					<ListItem button>
						<ListItemIcon>
							<DeleteForeverIcon style={{ fill: '#021448a6' }} />
						</ListItemIcon>
						<ListItemText primary={'Delete Account'} />
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
