import shortId from 'shortid';

function clearPlayerAndTargetWalls(playerPos, targetPos, gridCells) {
	if (gridCells[playerPos.i][playerPos.j].isWall) {
		gridCells[playerPos.i][playerPos.j].isWall = false;
		gridCells[playerPos.i][playerPos.j].isPlayer = true;
	}
	if (gridCells[targetPos.i][targetPos.j].isWall) {
		gridCells[targetPos.i][targetPos.j].isWall = false;
		gridCells[targetPos.i][targetPos.j].isTarget = true;
	}
}

export const createGridUtil = (state) => {
	const {
		rows, columns, playerPos, targetPos,
	} = state;

	const gridCells = [];

	for (let i = 0; i < rows; i += 1) {
		gridCells.push([]);
		for (let j = 0; j < columns; j += 1) {
			gridCells[i].push({
				id: shortId(),
				i,
				j,
				isWall: false,
				isPlayer: false,
				isTarget: false,
				shortestPathBFS: false,
				shortestPathDFS: false,
				shortestPathDijkstra: false,
				shortestPathAstar: false,
				weight: 1,
			});
		}
	}

	gridCells[playerPos.i][playerPos.j].isPlayer = true;

	gridCells[targetPos.i][targetPos.j].isTarget = true;

	clearPlayerAndTargetWalls(playerPos, targetPos, gridCells);

	return { gridCells, enableVisualizeButton: true };
};

export const makeCellVisitedUtil = (state, { i, j }) => {
	const gridCells = [...state.gridCells];

	gridCells[i][j].visited = true;

	return gridCells;
};

export const makeCellShortPathUtilBFS = (state, { i, j }) => {
	const gridCells = [...state.gridCells];
	gridCells[i][j].shortestPathBFS = true;
	gridCells[i][j].visited = false;
	return gridCells;
};

export const makeCellShortPathUtilDFS = (state, { i, j }) => {
	const gridCells = [...state.gridCells];
	gridCells[i][j].shortestPathDFS = true;
	gridCells[i][j].visited = false;
	return gridCells;
};

export const makeCellShortPathUtilDijkstra = (state, { i, j }) => {
	const gridCells = [...state.gridCells];
	gridCells[i][j].shortestPathDijkstra = true;
	gridCells[i][j].visited = false;
	return gridCells;
};

export const makeCellShortPathUtilAstar = (state, { i, j }) => {
	const gridCells = [...state.gridCells];
	gridCells[i][j].shortestPathAstar = true;
	gridCells[i][j].visited = false;
	return gridCells;
};

export const resetVisitedAndSPUtil = (state) => {
	const gridCells = [...state.gridCells];

	for (let i = 0; i < gridCells.length; i += 1) {
		for (let j = 0; j < gridCells[i].length; j += 1) {
			gridCells[i][j].shortestPathBFS = false;
			gridCells[i][j].shortestPathDFS = false;
			gridCells[i][j].shortestPathDijkstra = false;
			gridCells[i][j].shortestPathAstar = false;
			gridCells[i][j].visited = false;
		}
	}
	return gridCells;
};

export const addWallsUtil = (state) => {
	const gridCells = [...state.gridCells];

	let m;
	let k;

	switch (gridCells.length) {
	case 10:
		m = Math.floor(Math.random() * 10);
		k = Math.floor(Math.random() * 10);
		break;
	case 11:
		m = Math.floor(Math.random() * 11);
		k = Math.floor(Math.random() * 11);
		break;
	case 12:
		m = Math.floor(Math.random() * 12);
		k = Math.floor(Math.random() * 12);
		break;
	case 13:
		m = Math.floor(Math.random() * 13);
		k = Math.floor(Math.random() * 13);
		break;
	case 14:
		m = Math.floor(Math.random() * 14);
		k = Math.floor(Math.random() * 14);
		break;
	case 15:
		m = Math.floor(Math.random() * 15);
		k = Math.floor(Math.random() * 15);
		break;
	case 16:
		m = Math.floor(Math.random() * 16);
		k = Math.floor(Math.random() * 16);
		break;
	case 17:
		m = Math.floor(Math.random() * 17);
		k = Math.floor(Math.random() * 17);
		break;
	case 18:
		m = Math.floor(Math.random() * 18);
		k = Math.floor(Math.random() * 18);
		break;
	case 19:
		m = Math.floor(Math.random() * 19);
		k = Math.floor(Math.random() * 19);
		break;
	case 20:
		m = Math.floor(Math.random() * 20);
		k = Math.floor(Math.random() * 20);
		break;
	default:
		break;
	}

	for (let i = 0; i < gridCells.length; i += 1) {
		for (let j = 0; j < gridCells[i].length; j += 1) {
			if (
				!gridCells[m][k].isPlayer && !gridCells[m][k].isTarget &&
        !gridCells[m][k].isWall
			) {
				gridCells[m][k].isWall = true;
			}
		}
	}
	return gridCells;
};

export const onCellClickUtil = (state, { i, j, algType }) => {
	const { wKeyPressed, enableVisualizeButton } = state;
	const gridCells = [...state.gridCells];

	if (enableVisualizeButton) {
		if (wKeyPressed && algType === 'weighted') {
			if (!gridCells[i][j].isPlayer && !gridCells[i][j].isTarget) {
				if (gridCells[i][j].isWall) {
					gridCells[i][j].isWall = false;
				}
				gridCells[i][j].isWeight = true;
				gridCells[i][j].weight = 3;
			}
		} else if (
			!gridCells[i][j].isPlayer && !gridCells[i][j].isTarget &&
      gridCells[i][j].isWall
		) {
			gridCells[i][j].isWall = false;
			gridCells[i][j].weight = 1;
		} else if (gridCells[i][j].isWeight) {
			gridCells[i][j].isWeight = false;
			gridCells[i][j].weight = 1;
		} else if (!gridCells[i][j].isPlayer && !gridCells[i][j].isTarget) {
			gridCells[i][j].isWall = true;
		}
	}
	return gridCells;
};

export const onDragDropUtil = (state, { i, j, type }) => {
	const gridCells = [...state.gridCells];
	const { playerPos, targetPos, enableVisualizeButton } = state;

	if (enableVisualizeButton) {
		gridCells[i][j].isWall = false;
		gridCells[i][j].isWeight = false;
		gridCells[i][j].weight = 1;

		if (type === 'player') {
			gridCells[i][j].isPlayer = true;
			gridCells[i][j].draggable = true;
			gridCells[playerPos.i][playerPos.j].isPlayer = false;
			gridCells[playerPos.i][playerPos.j].draggable = false;
			playerPos.i = i;
			playerPos.j = j;
		} else if (type === 'target') {
			gridCells[i][j].isTarget = true;
			gridCells[i][j].draggable = true;
			gridCells[targetPos.i][targetPos.j].isTarget = false;
			gridCells[targetPos.i][targetPos.j].draggable = false;
			targetPos.i = i;
			targetPos.j = j;
		}
	}
	return { playerPos, targetPos, gridCells };
};

export const onMouseDownMouseOverUtil = (state, { i, j, type }) => {
	const gridCells = [...state.gridCells];
	const { mouseDown, wKeyPressed, enableVisualizeButton } = state;

	if (enableVisualizeButton) {
		if (mouseDown && wKeyPressed && type === 'weighted') {
			gridCells[i][j].isWall = false;
			gridCells[i][j].isWeight = true;
			gridCells[i][j].weight = 3;
		} else if (mouseDown) {
			gridCells[i][j].isWall = true;
			gridCells[i][j].isWeight = false;
			gridCells[i][j].weight = 1;
		}
	}
	return gridCells;
};
