// let url =
// 	process.env.NODE_ENV === 'development'
// 		? process.env.REACT_APP_SERVER_URL_LOC
// 		: process.env.REACT_APP_SERVER_URL_PROD;

    const taskAPI = {
	getTasks: (query, sort) => {
		let reqURL;
		if (query && sort) {
			reqURL = `https://lola-task-manager.herokuapp.com/tasks${query}&sortBy=createdAt:${sort}`;
		} else {
			reqURL = `https://lola-task-manager.herokuapp.com`;
		}
		return fetch(reqURL, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				'Authorization': `Bearer ${localStorage.getItem('token')}`,
			},
		})
			.then((res) => res.json())
			.then((data) => data)
			.catch((e) => console.log(e));
	},
	getTaskById: async (id) => {
		await fetch(`https://lola-task-manager.herokuapp.com/tasks/${id}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				'Authorization': `Bearer ${localStorage.getItem('token')}`,
			},
		})
			.then((res) => res.json())
			.then((data) => data)
			.catch((e) => console.log(e));
	},
	createTask: async (taskBody) => {
		await fetch(`https://lola-task-manager.herokuapp.com/tasks`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				'Authorization': `Bearer ${localStorage.getItem('token')}`,
			},
			body: JSON.stringify(taskBody),
		})
			.then((res) => res.json())
			.then((data) => console.log(data))
			.catch((e) => console.log(e));
	},
	updateTask: (taskId, updates) => {
		return fetch(`https://lola-task-manager.herokuapp.com/tasks/${taskId}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				'Authorization': `Bearer ${localStorage.getItem('token')}`,
			},
			body: JSON.stringify(updates),
		})
			.then((res) => res.json())
			.then((data) => data)
			.catch((e) => console.log(e));
	},
	deleteTask: async (id) => {
		await fetch(`https://lola-task-manager.herokuapp.com/tasks/${id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				'Authorization': `Bearer ${localStorage.getItem('token')}`,
			},
		})
			.then((res) => res.json())
			.catch((e) => console.log(e));
	},
};

export default taskAPI;
