import GRID_TYPES from './grid.types';

import {
    createGridUtil,
    makeCellVisitedUtil,
    makeCellShortPathUtil,
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
        i: 4,
        j: 0,
    },
    targetPos: {
        i: 4,
        j: 9,
    },
    enableVisualizeButton: true,
    wKeyPressed: false,
    mouseDown: false,    
}

const gridReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
       case GRID_TYPES.CREATE_GRID: {
           const {enableVisualizeButton, gridCells} = createGridUtil(state);
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
        case GRID_TYPES.MARK_SHORTEST_PATH:
            return {
                ...state,
                gridCells: makeCellShortPathUtil(state, action.payload),
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
            }
        
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
            const { playerPos, targetPos, gridCells } = onDragDropUtil(state, action.payload);
            return {
                ...state,
                gridCells,
                playerPos,
                targetPos
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
            }
        
        case GRID_TYPES.CHANGE_COLUMNS:
            return {
                ...state,
                columns: action.payload,
            }
        default:
            return state;
    }
};

export default gridReducer;