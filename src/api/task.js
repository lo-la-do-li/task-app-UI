const taskAPI = {
	getTasks: (accessToken) => {
		return fetch('http://localhost:3000/tasks', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				'Authorization': `Bearer ${accessToken}`,
			},
		})
			.then((res) => res.json())
			.then((data) => data)
			.catch((e) => console.log(e));
	},
	getTaskById: async (accessToken, id) => {
		await fetch(`http://localhost:3000/tasks/${id}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				'Authorization': ` Bearer ${accessToken}`,
			},
		})
			.then((res) => res.json())
			.then((data) => data)
			.catch((e) => console.log(e));
	},
	createTask: async (accessToken, description, completed) => {
		await fetch('http://localhost:3000/tasks', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				'Authorization': ` Bearer ${accessToken}`,
			},
			body: {
				description,
				completed,
				createdAt: new Date().getTime(),
			},
		})
			.then((res) => res.json())
			.catch((e) => console.log(e));
	},
};

export default taskAPI;
