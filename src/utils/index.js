export const getAccessToken = () => {
	return localStorage.getItem('token');
};

export const getUser = () => {
	return localStorage.getItem(JSON.parse('user'));
};

export const taskDate = (taskDate) => {
	let month = new Date(taskDate).getUTCMonth();
	let date = new Date(taskDate).getUTCDate();
      //Create an array containing each day, starting with Sunday.
    let weekdays = new Array(
        "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
    );
    //Use the getDay() method to get the day.
    let day = new Date(taskDate).getDay();
    //Return the element that corresponds to that index.
    
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
    
      return [month, date, weekdays[day]]
};
