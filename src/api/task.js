const taskAPI = {
	getTasks: (query, sort) => {
		let url;
		if (query && sort) {
			url = `http://localhost:3000/tasks${query}&sortBy=createdAt:${sort}`;
		} else {
			url = `http://localhost:3000/tasks`;
		}
		return fetch(url, {
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
		await fetch(`http://localhost:3000/tasks/${id}`, {
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
		await fetch('http://localhost:3000/tasks', {
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
		return fetch(`http://localhost:3000/tasks/${taskId}`, {
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
};

export default taskAPI;
