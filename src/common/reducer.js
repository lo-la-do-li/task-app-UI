export const initialState = {
	authUser: null,
	isAuthorized: false,
	tasks: [],
};

export const reducer = (state, action) => {
	switch (action.type) {
		case 'SET_USER':
			return { ...state, authUser: action.authUser };
		case 'SET_AUTHORIZED':
			return { ...state, isAuthorized: action.isAuthorized };
		default:
			return state;
	}
};
