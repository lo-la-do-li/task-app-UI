export const getAccessToken = () => {
	return localStorage.getItem('token');
};

export const getUser = () => {
	return localStorage.getItem(JSON.parse('user'));
};

export const taskDate = (taskDate) => {
	let month = new Date(taskDate).getUTCMonth();
	let date = new Date(taskDate).getUTCDate();
	month =
		month === 0
			? 'Jan'
			: month === 1
			? 'Feb'
			: month === 2
			? 'Mar'
			: month === 3
			? 'Apr'
			: month === 4
			? 'May'
			: month === 5
			? 'Jun'
			: month === 6
			? 'Jul'
			: month === 7
			? 'Aug'
			: month === 8
			? 'Sept'
			: month === 9
			? 'Oct'
			: month === 10
			? 'Nov'
			: 'Dec';
	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
        marginLeft: '-8px',
        textAlign: 'center',
        // padding: '4px 0 0 0'
				// justifyContent: 'space-between',
			}}
		>
			<span style={{ fontSize: 18}}>
				{month.toUpperCase()}
			</span>
			<span style={{ fontSize: 30}}>{date}</span>
		</div>
	);
};
