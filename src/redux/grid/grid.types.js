const GRID_TYPES = {
	CREATE_GRID: 'CREATE_GRID',
	FIND_PATH: 'FIND_PATH',
	MARK_CELL_VISITED: 'MARK_CELL_VISITED',
	MARK_SHORTEST_PATH_BFS: 'MARK_SHORTEST_PATH_BFS',
	MARK_SHORTEST_PATH_DFS: 'MARK_SHORTEST_PATH_DFS',
	MARK_SHORTEST_PATH_DIJKSTRA: 'MARK_SHORTEST_PATH_DIJKSTRA',
	MARK_SHORTEST_PATH_ASTAR: 'MARK_SHORTEST_PATH_ASTAR',
	RESET_VISITED_AND_SP: 'RESET_VISITED_AND_SP',
	ADD_WEIGHTS: 'ADD_WEIGHTS',
	ADD_WALLS: 'ADD_WALLS',
	W_KEY_PRESS: 'W_KEY_PRESS',
	CELL_CLICKED: 'CELL_CLICKED',
	DRAG_DROP: 'DRAG_DROP',
	MOUSE_DOWN: 'MOUSE_DOWN',
	MOUSE_OVER: 'MOUSE_OVER',
	COUNT_VISITED_CELLS: 'COUNT_VISITED_CELLS',
	CHANGE_ROWS: 'CHANGE_ROWS',
	CHANGE_ROWS_COMPLETED: 'CHANGE_ROWS_COMPLETED',
	CHANGE_COLUMNS: 'CHANGE_COLUMNS',
	CHANGE_COLUMNS_COMPLETED: 'CHANGE_COLUMNS_COMPLETED',
	PLAYER_POSITION: 'PLAYER_POSITION',
	TARGET_POSITION: 'TARGET_POSITION',
};

export default GRID_TYPES;
