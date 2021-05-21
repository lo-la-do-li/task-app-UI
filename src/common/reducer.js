export const initialState = {
	authUser: JSON.parse(localStorage.getItem('user')),
	tasks: [],
	completed: [],
	toDo: [],
};

export const reducer = (state, action) => {
	switch (action.type) {
		case 'SET_USER':
			return { ...state, authUser: action.authUser };
		case 'SET_TASKS':
			return { ...state, tasks: action.tasks };
		case 'SET_COMPLETED':
			return { ...state, completed: action.completed };
		case 'SET_TODO':
			return { ...state, toDo: action.toDo };
		default:
			return state;
	}
};
