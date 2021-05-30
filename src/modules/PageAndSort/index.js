import React, { useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import ScheduleIcon from '@material-ui/icons/Schedule';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
	pageNav: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		height: '40px',
		borderRadius: '20px',
		padding: '0px 16px 0px 16px',
		background: '#2b2733',
		color: '#fff',
		[theme.breakpoints.down('600')]: {
			minWidth: 'max-content',
		},
	},
	subTitleBar: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
    alignItems: 'baseline',
		margin: '6px 20px 10px 16px',
		fontFamily: 'Martel Sans',
		background: 'transparent',
		color: '#888892',
	},
	title: {
		textAlign: 'center',
		fontSize: '16px',
		fontFamily: 'Martel Sans',
		width: 'inherit',
		flexGrow: 1,
	},
}));

export default function PageAndSort({ title, sort, handleSort, tasksPerPage, totalTasks, paginate }){
	const classes = useStyles();
  const [allPages, setAllPages] = useState([])
  const [number, setNumber] = useState(1)
  
  useEffect(() => {
    setAllPages(getAllPages())
  }, [number])

  const getAllPages = () => {
    let pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalTasks / tasksPerPage); i++) {
			pageNumbers.push(i);
		}
    return pageNumbers
  }

  const handlePageUp = () => {
    let pages = getAllPages()
    if (number !== pages.length) {
      setNumber(number +1)
      return paginate(number+1);
    } else {
      return
    }
  
  }
    const handlePageDown = () => {
      if (number > 1) {
				setNumber(number - 1);
				return paginate(number - 1);
			} else {
				return;
			}
		};

	return (
		<>
			<Container maxWidth='xl' className={classes.pageNav}>
				<>
					<ScheduleIcon />
					{sort === 'desc' ? (
						<IconButton
							style={{ padding: '0px 4px 0px 8px' }}
							onClick={() => handleSort('asc', title)}
						>
							<KeyboardArrowUpIcon style={{ fill: '#fff' }} />
						</IconButton>
					) : (
						<IconButton
							style={{ padding: '0px 8px 0px 4px' }}
							onClick={() => handleSort('desc', title)}
						>
							<KeyboardArrowDownIcon style={{ fill: '#fff' }} />
						</IconButton>
					)}
				</>
				<h3 className={classes.title}>{title}</h3>

				{number === 1 ? (
					<IconButton
						style={{ padding: '0px 4px 0px 4px' }}
						onClick={handlePageDown}
						disabled
					>
						<NavigateBeforeIcon style={{ fill: '#888892' }} />
					</IconButton>
				) : (
					<IconButton
						style={{ padding: '0px 4px 0px 4px' }}
						onClick={handlePageDown}
					>
						<NavigateBeforeIcon style={{ fill: '#fff' }} />
					</IconButton>
				)}
				<span style={{ fontFamily: 'Martel Sans' }}>{number}</span>

				{number === getAllPages().length ? (
					<IconButton
						style={{ padding: '0px 0px 0px 4px' }}
						onClick={handlePageUp}
						disabled
					>
						<NavigateNextIcon style={{ fill: '#888892' }} />
					</IconButton>
				) : (
					<IconButton
						style={{ padding: '0px 0px 0px 4px' }}
						onClick={handlePageUp}
					>
						<NavigateNextIcon style={{ fill: '#fff' }} />
					</IconButton>
				)}
			</Container>
			<div className={classes.subTitleBar}>
				<span>Sort Date</span>
				<span>Page #</span>
			</div>
		</>
	);
}
