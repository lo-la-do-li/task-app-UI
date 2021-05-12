const taskAPI = {
	getTasks: async () => {
		await fetch('http://localhost:3000/tasks', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				'Authorization': ` Bearer ${window.localStorage.getItem('token')}`,
			},
		})
			.then((res) => res.json())
			.then((data) => data)
			.catch((e) => console.log(e));
	},
};

export default taskAPI;
