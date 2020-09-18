import FILTER_TYPES from "./filter.types";


const INITIAL_STATE = {
    algorithms: [
        {
            id: 0,
            type: "unweighted",
            name: "Breadth First Search",
            abbreviation: "BFS",
            description: "BFS is unweighted & gives shortest path",
            complexity: "O(V+E)",
        },
        {
            id: 1,
            type: "unweighted",
            name: "Depth First Search",
            abbreviation: "DFS",
            description: "DFS is unweighted & doesn't guarantee shortest path",
            complexity: "O(V+E)",
        },
        {
            id: 2,
            type: "weighted",
            name: "Dijkstra's Algorithm",            
            description: "Dijkstra algorithm is weighted & guarantee shortest path",
            complexity: "O(V+ElogV)",
        },
        {
            id: 3,
            type: "weighted",
            name: "A * algorithm",            
            description: "A * algorithm is weighted & guarantees shortest path",
            complexity: "O(V+E)",
        },
    ],
    currentAlg: 0,
    level: 1, 
    time: 0,
    numberCV: 0, 
}

const filterReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FILTER_TYPES.CHOSE_ALGO:
            return {
                ...state,
                currentAlg: action.payload
            }
        case FILTER_TYPES.TIME_SPENT: 
            return {
                ...state,
                time: action.payload
            }
        case FILTER_TYPES.SET_LEVEL:
            return {
                ...state,
                level: action.payload,
            }
        case FILTER_TYPES.CELL_VISITED_NUMBER:
            return {
                ...state,
                numberCV: action.payload, 
            }
        default:
            return state;
    }
}

export default filterReducer;