import GRID_TYPES from './grid.types';

export const createGrid = () => ({
	type: GRID_TYPES.CREATE_GRID,
});

export const findPath = find => ({
	type: GRID_TYPES.FIND_PATH,
	payload: find,
});

export const markCellVisited = (i, j) => ({
	type: GRID_TYPES.MARK_CELL_VISITED,
	payload: { i, j },
});

export const markShortestPathBFS = (i, j) => ({
	type: GRID_TYPES.MARK_SHORTEST_PATH_BFS,
	payload: { i, j },
});

export const markShortestPathDFS = (i, j) => ({
	type: GRID_TYPES.MARK_SHORTEST_PATH_DFS,
	payload: { i, j },
});

export const markShortestPathDijkstra = (i, j) => ({
	type: GRID_TYPES.MARK_SHORTEST_PATH_DIJKSTRA,
	payload: { i, j },
});

export const markShortestPathAstar = (i, j) => ({
	type: GRID_TYPES.MARK_SHORTEST_PATH_ASTAR,
	payload: { i, j },
});

export const resetVisitedAndSP = () => ({
	type: GRID_TYPES.RESET_VISITED_AND_SP,
});

export const addWeights = () => ({
	type: GRID_TYPES.ADD_WEIGHTS,
});

export const addWalls = () => ({
	type: GRID_TYPES.ADD_WALLS,
});

export const countVisited = data => ({
	type: GRID_TYPES.COUNT_VISITED_CELLS,
	payload: data,
});

export const wKeyPress = pressed => ({
	type: GRID_TYPES.W_KEY_PRESS,
	payload: pressed,
});

export const cellClicked = (i, j, algType) => ({
	type: GRID_TYPES.CELL_CLICKED,
	payload: { i, j, algType },
});

export const dragDrop = (i, j, type) => ({
	type: GRID_TYPES.DRAG_DROP,
	payload: { i, j, type },
});

export const mouseDown = down => ({
	type: GRID_TYPES.MOUSE_DOWN,
	payload: down,
});

export const mouseOver = (i, j, type) => ({
	type: GRID_TYPES.MOUSE_OVER,
	payload: { i, j, type },
});

export const changeRows = r => ({
	type: GRID_TYPES.CHANGE_ROWS,
	payload: r,
});

export const changeColumns = c => ({
	type: GRID_TYPES.CHANGE_COLUMNS,
	payload: c,
});

export const playerPositionChange = dataPlayer => ({
	type: GRID_TYPES.PLAYER_POSITION,
	payload: dataPlayer,
});

export const targetPositionChange = dataTarget => ({
	type: GRID_TYPES.TARGET_POSITION,
	payload: dataTarget,
});
