export const initialState = {
	user: null,
	tasks: [],
};

export const reducer = (state, action) => {
	switch (action.type) {
		case 'LOGIN':
			return { ...state, user: action.user };
	}
};
