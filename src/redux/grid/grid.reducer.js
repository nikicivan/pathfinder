/* eslint-disable no-case-declarations */
import shortId from 'shortid';
import GRID_TYPES from './grid.types';

import {
	createGridUtil,
	makeCellVisitedUtil,
	makeCellShortPathUtilBFS,
	makeCellShortPathUtilDFS,
	makeCellShortPathUtilDijkstra,
	makeCellShortPathUtilAstar,
	resetVisitedAndSPUtil,
	addWallsUtil,
	onCellClickUtil,
	onDragDropUtil,
	onMouseDownMouseOverUtil,
} from './grid.utils';

const INITIAL_STATE = {
	rows: 10,
	columns: 10,
	gridCells: [],
	playerPos: {
		i: 0,
		j: 4,
	},
	targetPos: {
		i: 9,
		j: 4,
	},
	enableVisualizeButton: true,
	wKeyPressed: false,
	mouseDown: false,
	results: [],
};

const gridReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
	case GRID_TYPES.CREATE_GRID: {
		const { enableVisualizeButton, gridCells } = createGridUtil(state);
		return {
			...state,
			gridCells,
			enableVisualizeButton,
		};
	}
	case GRID_TYPES.FIND_PATH:
		return {
			...state,
			enableVisualizeButton: action.payload,
		};
	case GRID_TYPES.MARK_CELL_VISITED:
		return {
			...state,
			gridCells: makeCellVisitedUtil(state, action.payload),
		};
	case GRID_TYPES.MARK_SHORTEST_PATH_BFS:
		return {
			...state,
			gridCells: makeCellShortPathUtilBFS(state, action.payload),
		};
	case GRID_TYPES.MARK_SHORTEST_PATH_DFS:
		return {
			...state,
			gridCells: makeCellShortPathUtilDFS(state, action.payload),
		};
	case GRID_TYPES.MARK_SHORTEST_PATH_DIJKSTRA:
		return {
			...state,
			gridCells: makeCellShortPathUtilDijkstra(state, action.payload),
		};
	case GRID_TYPES.MARK_SHORTEST_PATH_ASTAR:
		return {
			...state,
			gridCells: makeCellShortPathUtilAstar(state, action.payload),
		};
	case GRID_TYPES.RESET_VISITED_AND_SP:
		return {
			...state,
			gridCells: resetVisitedAndSPUtil(state),
		};
	case GRID_TYPES.ADD_WALLS:
		return {
			...state,
			gridCells: addWallsUtil(state),
		};
	case GRID_TYPES.COUNT_VISITED_CELLS:
		const { data } = action.payload;
		const newResults = [...state.results];
		newResults.numberCV = data.numberCV;
		newResults.name = data.name;
		newResults.timeSpent = data.timeSpent;
		newResults.level = data.level;
		return {
			...state,
			results: [...newResults, {
				id: shortId(),
				name: newResults.name,
				numberCV: newResults.numberCV,
				timeSpent: newResults.timeSpent,
				level: newResults.level,
			}],
		};
	case GRID_TYPES.W_KEY_PRESS:
		return {
			...state,
			wKeyPressed: action.payload,
		};
	case GRID_TYPES.CELL_CLICKED:
		return {
			...state,
			gridCells: onCellClickUtil(state, action.payload),
		};
	case GRID_TYPES.DRAG_DROP: {
		const { playerPos, targetPos, gridCells } = onDragDropUtil(
			state,
			action.payload,
		);
		return {
			...state,
			gridCells,
			playerPos,
			targetPos,
		};
	}
	case GRID_TYPES.MOUSE_DOWN:
		return {
			...state,
			mouseDown: action.payload,
		};
	case GRID_TYPES.MOUSE_OVER:
		return {
			...state,
			gridCells: onMouseDownMouseOverUtil(state, action.payload),
		};
	case GRID_TYPES.CHANGE_ROWS:
		return {
			...state,
			rows: action.payload,
		};
	case GRID_TYPES.CHANGE_COLUMNS:
		return {
			...state,
			columns: action.payload,
		};
	case GRID_TYPES.PLAYER_POSITION:
		return {
			...state,
			playerPos: {
				i: action.payload.playerPosI,
				j: action.payload.playerPosJ,
			},
		};
	case GRID_TYPES.TARGET_POSITION:
		return {
			...state,
			targetPos: {
				i: action.payload.targetPosI,
				j: action.payload.targetPosJ,
			},
		};
	default:
		return state;
	}
};

export default gridReducer;
