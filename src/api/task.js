let url =
	process.env.NODE_ENV === 'development'
		? process.env.REACT_APP_SERVER_URL_LOC
		: process.env.REACT_APP_SERVER_URL_PROD;

    const taskAPI = {
	getTasks: (query, sort) => {
		let reqURL;
		if (query && sort) {
			reqURL = `${url}/tasks${query}&sortBy=createdAt:${sort}`;
		} else {
			reqURL = `${url}`;
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
		await fetch(`${url}/tasks/${id}`, {
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
		await fetch(`${url}/tasks`, {
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
		return fetch(`${url}/tasks/${taskId}`, {
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
		await fetch(`${url}/tasks/${id}`, {
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
