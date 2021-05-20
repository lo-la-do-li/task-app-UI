const userAPI = {
	testAPIConnection: () => {
		return fetch('http://localhost:3000/')
			.then((res) => res.json())
			.then((data) => console.log(data))
			.catch((e) => console.log(e));
	},
	createNewUser: (newUserData) => {
		return fetch('http://localhost:3000/users', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(newUserData),
		})
			.then((res) => res.json())
			.then((data) => data)
			.catch((e) => console.log(e));
	},
	loginUser: (credentials) => {
		return fetch('http://localhost:3000/users/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(credentials),
		})
			.then((res) => res.json())
			.then((data) => data)
			.catch((e) => console.log(e));
	},
	readProfile: () => {
		return fetch('http://localhost:3000/users/me', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				'Authorization': `Bearer ${window.localStorage.getItem('token')}`,
			},
		})
			.then((res) => res.json())
			.then((data) => data)
			.catch((e) => console.log(e));
	},
	logoutSession: (accessToken) => {
		return fetch('http://localhost:3000/users/logout', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				'Authorization': `Bearer ${accessToken}`,
			},
		})
			.then((res) => res.json())
			.catch((e) => console.log(e));
	},
	logoutAllSessions: (accessToken) => {
		return fetch('http://localhost:3000/users/logoutAll', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				'Authorization': `Bearer ${accessToken}`,
			},
		})
			.then((res) => res.json())
			.catch((e) => console.log(e));
	},
	updateUserInfo: (updates) => {
		return fetch('http://localhost:3000/users/me', {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				'Authorization': `Bearer ${window.localStorage.getItem('token')}`,
			},
			body: JSON.stringify(updates),
		})
			.then((res) => res.json())
			.catch((e) => e.json());
	},
	deleteUser: () => {
		return fetch('http://localhost:3000/users/me', {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				'Authorization': ` Bearer ${window.localStorage.getItem('token')}`,
			},
		})
			.then((res) => res.json())
			.catch((e) => console.log(e));
	},
	uploadAvatar: (formData) => {
		return fetch('http://localhost:3000/users/me/avatar', {
			method: 'POST',
			headers: {
				'Content-Type': 'multipart/form-data',
				'Accept': 'application/json',
				'Authorization': `Bearer ${window.localStorage.getItem('token')}`,
			},
			body: formData,
		})
			.then((res) => res.json)
			.catch((e) => console.log(e));
	},
  getUserAvatar: (id) => {
    	return fetch(`http://localhost:3000/users/${id}/avatar`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				'Authorization': `Bearer ${window.localStorage.getItem('token')}`,
			},
		})
			.then((res) => res.json())
			.catch((e) => console.log(e));
  }
};

export default userAPI;
