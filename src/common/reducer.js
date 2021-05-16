export const initialState = {
	authUser: null,
	isAuthorized: false,
	tasks: [],
	token: null,
};

export const reducer = (state, action) => {
	switch (action.type) {
		case 'SET_USER':
			return { ...state, authUser: action.authUser };
		case 'SET_AUTHORIZED':
			return { ...state, isAuthorized: action.isAuthorized };
		case 'SET_TASKS':
			return { ...state, tasks: action.tasks };
		default:
			return state;
	}
};
