import shortId from 'shortid';

export const createGridUtil = (state) => {
    const { rows, columns, playerPos, targetPos } = state;
    
    const gridCells = [];
    

    for (let i = 0; i < rows; i++) {
        gridCells.push([]);
        for (let j = 0; j < columns; j++) {
            gridCells[i].push({
                id: shortId(),
                i, 
                j,                
                isWall: false,
                isPlayer: false,
                isTarget: false,
                visited: false,
                shortestPath: false,
                weight: 1,
                draggable: false
            });
        }
    }

    gridCells[playerPos.i][playerPos.j].isPlayer = true;
    gridCells[playerPos.i][playerPos.j].draggable = true;

    gridCells[targetPos.i][targetPos.j].isTarget = true;
    gridCells[targetPos.i][targetPos.j].draggable = true;

    clearPlayerAndTargetWalls(playerPos, targetPos, gridCells);

    return { gridCells, enableVisualizeButton: true }
};

export const makeCellVisitedUtil = (state, { i, j }) => {
    const gridCells = [...state.gridCells];   
        
    gridCells[i][j].visited = true; 
    
    return gridCells;
};



export const makeCellShortPathUtil = (state, {i, j}) => {
    const gridCells = [...state.gridCells];
    gridCells[i][j].shortestPath = true;
    gridCells[i][j].visited = false;
    return gridCells;
};

export const resetVisitedAndSPUtil = (state) => {
    const gridCells = [...state.gridCells];

    for (let i=0; i < gridCells.length; i++) {
        for (let j=0; j < gridCells[i].length; j++) {
            gridCells[i][j].shortestPath = false;
            gridCells[i][j].visited = false;
        }
    }
    return gridCells;
};

export const addWallsUtil = (state) => {
    
    const gridCells = [...state.gridCells];

    let m = Math.floor(Math.random() * 10);
    let k = Math.floor(Math.random() * 10);
    let hashTable = [];
    hashTable.push(m, k);
            
    for (let i = 0; i < gridCells.length; i++) {
        for (let j = 0; j < gridCells[i].length; j++) {                 

            if (gridCells[m][k].isWall === false && gridCells[m][k].isPlayer === false && gridCells[m][k].isTarget === false) {               

                if (hashTable.includes(4,0) || hashTable.includes(4,9)) {
                    gridCells[m][k].isWall = false; 
                } else {
                    gridCells[m][k].isWall = true;
                }                                                                 
            }      
        }
    }    
    return gridCells;    
}

export const onCellClickUtil = (state, {i, j, algType}) => {
    const { wKeyPressed, enableVisualizeButton } = state;
    const gridCells = [...state.gridCells];

    if (enableVisualizeButton) {
        if(wKeyPressed && algType === 'weighted') {
            if (!gridCells[i][j].isPlayer && !gridCells[i][j].isTarget) {
                if (gridCells[i][j].isWall) {
                    gridCells[i][j].isWall = false;
                }
                gridCells[i][j].isWeight = true;
                gridCells[i][j].weight = 3;
            }
        } else if (!gridCells[i][j].isPlayer && !gridCells[i][j].isTarget && gridCells[i][j].isWall) {
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

export const onDragDropUtil = (state, {i, j, type}) => {
    const gridCells = [...state.gridCells];
    const { playerPos, targetPos, enableVisualizeButton } = state;

    if (enableVisualizeButton) {
        gridCells[i][j].isWall = false;
        gridCells[i][j].isWeight = false;
        gridCells[i][j].weight = 1;

        if (type === "player") {
            gridCells[i][j].isPlayer = true;
            gridCells[i][j].draggable = true;
            gridCells[playerPos.i][playerPos.j].isPlayer = false;
            gridCells[playerPos.i][playerPos.j].draggable = false;
            playerPos.i = i;
            playerPos.j = j;
        } else if (type === "target") {
            gridCells[i][j].isTarget = true;
            gridCells[i][j].draggable = true;
            gridCells[targetPos.i][targetPos.j].isTarget = false;
            gridCells[targetPos.i][targetPos.j].draggable = false;
            targetPos.i = i;
            targetPos.j = j;
        }
    }
    return {playerPos, targetPos, gridCells};
};

export const onMouseDownMouseOverUtil = (state, {i, j, type}) => {
    const gridCells = [...state.gridCells];
    const { mouseDown, wKeyPressed, enableVisualizeButton } = state;

    if (enableVisualizeButton) {
        if (mouseDown && wKeyPressed && type === "weighted") {
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

function clearPlayerAndTargetWalls(playerPos, targetPos, gridCells) {
    if (gridCells[playerPos.i][playerPos.j].isWall) {
        gridCells[playerPos.i][playerPos.j].isWall = false;
        gridCells[playerPos.i][playerPos.j].isPlayer = true;
    }
    if (gridCells[targetPos.i][targetPos.j].isWall) {
        gridCells[targetPos.i][targetPos.j].isWall = false;
        gridCells[targetPos.i][targetPos.j].isTarget = true;
    }
};



