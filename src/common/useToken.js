import { useState, useEffect } from 'react';

export default function useToken() {
	const getToken = () => {
		const tokenString = localStorage.getItem('token');
		// if (!tokenString) {
		// 	console.log('No token!!');
		// 	return undefined;
		// }
		// const userToken = JSON.parse(tokenString);
		// console.log(userToken)
		return tokenString;
	};

	const [token, setToken] = useState(getToken());

	const saveToken = (userToken) => {
		console.log('setToken in useToken.js:', userToken);
		localStorage.setItem('token', userToken);
		setToken(userToken);
	};

	return {
		setToken: saveToken,
		token,
	};
}
