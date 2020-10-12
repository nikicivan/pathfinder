import FILTER_TYPES from './filter.types';

const INITIAL_STATE = {
	algorithms: [
		{
			id: 0,
			checked: true,
			type: 'unweighted',
			name: 'Breadth First Search',
			abbreviation: 'BFS',
			description: 'BFS is unweighted & gives shortest path',
			complexity: 'O(V+E)',
		},
		{
			id: 1,
			checked: false,
			type: 'weighted',
			name: "Dijkstra's Algorithm",
			description: 'Dijkstra algorithm is weighted & guarantee shortest path',
			complexity: 'O(V+ElogV)',
		},
		{
			id: 2,
			checked: false,
			type: 'weighted',
			name: 'A * algorithm',
			description: 'A * algorithm is weighted & guarantees shortest path',
			complexity: 'O(V+E)',
		},
	],
	level: 1,
	endGame: false,
};

const filterReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
	case FILTER_TYPES.CHOSE_ALGO:
		return {
			...state,
			currentAlg: action.payload,
		};
	case FILTER_TYPES.CHOSE_CHECKBOX: {
		const index = state.algorithms.findIndex(algo => algo.id === action.payload);
		const newAlgorithms = [...state.algorithms];
		newAlgorithms[index].checked = !newAlgorithms[index].checked;
		return {
			...state,
			algorithms: newAlgorithms,
		};
	}
	case FILTER_TYPES.SET_LEVEL:
		return {
			...state,
			level: action.payload,
		};
	case FILTER_TYPES.GAME_OVER:
		return {
			...state,
			endGame: action.payload,
		};
	default:
		return state;
	}
};

export default filterReducer;
