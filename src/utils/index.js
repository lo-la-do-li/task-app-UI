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
    
      return [month, date]
};
