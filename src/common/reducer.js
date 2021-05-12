export const initialState = {
	authUser: null,
	tasks: [],
};

export const reducer = (state, action) => {
	switch (action.type) {
		case 'SET_USER':
			return { ...state, authUser: action.authUser };
		default:
			return state;
	}
};
