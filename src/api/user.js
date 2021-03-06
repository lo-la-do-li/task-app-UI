const url =
	process.env.NODE_ENV === 'development'
		? process.env.REACT_APP_SERVER_URL_LOC
		: process.env.REACT_APP_SERVER_URL_PROD

const userAPI = {
	testAPIConnection: () => {
		return fetch("https://lola-task-manager.herokuapp.com/")
			.then((res) => res.json())
			.then((data) => console.log(data))
			.catch((e) => console.log(e));
	},
	createNewUser: (newUserData) => {
		return fetch("https://lola-task-manager.herokuapp.com/users", {
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
    
		return fetch("https://lola-task-manager.herokuapp.com/users/login", {
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
		return fetch("https://lola-task-manager.herokuapp.com/users/me", {
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
		return fetch(`https://lola-task-manager.herokuapp.com/users/logout`, {
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
		return fetch(`https://lola-task-manager.herokuapp.com/users/logoutAll`, {
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
		return fetch(`https://lola-task-manager.herokuapp.com/users/me`, {
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
		return fetch(`https://lola-task-manager.herokuapp.com/users/me`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json',
				'Authorization': `Bearer ${window.localStorage.getItem('token')}`,
			},
		})
			.then((res) => res.json())
			.catch((e) => console.log(e));
	},
	uploadAvatar: (file) => {
    
    let data = new FormData();
		data.append('avatar', file);
		return fetch(`https://lola-task-manager.herokuapp.com/users/me/avatar`, {
			method: 'POST',
			body: data,
			headers: {
				'Authorization': `Bearer ${window.localStorage.getItem('token')}`,
			},
		})
			.then((res) => {
				if (res.ok) {
					return res;
				} else {
					return res.json();
				}
			})
			.catch((e) => console.log(e));
	},
  getUserAvatar: (id) => {
    return fetch(
			`https://lola-task-manager.herokuapp.com/users/${id}/avatar`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			}
		)
			.then((res) => res)
			.catch((e) => console.log(e));
  }
};

export default userAPI;
