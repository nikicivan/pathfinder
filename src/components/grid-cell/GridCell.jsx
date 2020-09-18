import React from 'react';

import { GridCellFloor, GridCellWall, GridCellPlayer, GridCellTarget, GridCellVisited, GridCellShortestPath } from './gridCell-styles';

const GridCell = (props) => {
    const {
        isWall, 
        isPlayer,
        isTarget,
        visited,        
        shortestPath,
        i,
        j,
        onCellClicked,
        draggable,
        onDragDrop,
        mouseDown,
        mouseOver,
    } = props;

    const dragStart = (e) => {
        if (e.target.getAttribute("data-isplayer") === "true") {
            e.dataTransfer.setData("isplayer", "true");
        } else if (e.target.getAttribute("data-istarget") === "true") {
            e.dataTransfer.setData("istarget", "true");
        }
    };

    const dragOver = (e) => {
        e.preventDefault();
    };

    const dragEnter = (e) => {
        e.preventDefault();
        e.target.style.background = "rgba(113,235,52, 0.5)";
    };

    const dragLeave = (e) => {
        e.target.style.background = null;
    };

    const dragDrop = (e) => {
        e.target.style.background = null;

        let i = e.target.getAttribute("data-i");
        let j = e.target.getAttribute("data-j");
        let type = "";

        if (e.dataTransfer.getData("isplayer") === "true") {
            type = "player";
            e.target.setAttribute("data-isplayer", "true");
        } else if (e.dataTransfer.getData("istarget") === "true") {
            type = "target";
            e.target.setAttribute("data-istarget", "true");
        }
        onDragDrop(i, j, type);
    }

    if (draggable) {
        return (
            
            isWall ? <GridCellWall                         
                        isWall={true}
                        className="wall"
                        data-i={i} 
                        data-j={j} 
                        data-isplayer={isPlayer} 
                        data-istarget={isTarget} 
                        onClick={() => onCellClicked(i,j)} 
                        draggable={true} 
                        onDragStart={dragStart}
                    /> : 
            isPlayer ? <GridCellPlayer 
                        className="player" 
                        isPlayer={true}                       
                        data-i={i} 
                        data-j={j} 
                        data-isplayer={isPlayer} 
                        data-istarget={isTarget} 
                        onClick={() => onCellClicked(i,j)} 
                        draggable={true}
                        onDragStart={dragStart}
                        /> : 
            isTarget ? <GridCellTarget 
                        className="target"
                        isTarget={true}                       
                        data-i={i} 
                        data-j={j} 
                        data-isplayer={isPlayer} 
                        data-istarget={isTarget} 
                        onClick={() => onCellClicked(i,j)} 
                        draggable={true}
                        onDragStart={dragStart}
                    /> : 
            visited ? <GridCellVisited 
                        className="visited"
                        visited={true}                       
                        data-i={i} 
                        data-j={j} 
                        data-isplayer={isPlayer} 
                        data-istarget={isTarget} 
                           
                    /> : 
            shortestPath ? <GridCellShortestPath 
                            className="shortest-path"
                            shortestPath={shortestPath}                           
                            data-i={i} 
                            data-j={j} 
                            data-isplayer={isPlayer} 
                            data-istarget={isTarget} 
                            
                            /> :
            <GridCellFloor 
                className="floor"
                floor={true}                              
                data-i={i} 
                data-j={j} 
                data-isplayer={isPlayer} 
                data-istarget={isTarget} 
                onClick={() => onCellClicked(i,j)} 
                draggable={true}
                onDragStart={dragStart}
            />
            
        );
    } else {
        return (
            isWall ? <GridCellWall  
                        className="wall"                       
                        isWall={isWall}
                        data-i={i} 
                        data-j={j} 
                        onDragOver={dragOver} 
                        onDragEnter={dragEnter} 
                        onDragLeave={dragLeave}
                        onDrop={dragDrop}    
                        onMouseDown={(e) => {
                            e.preventDefault();
                            onCellClicked(i, j);
                            mouseDown(true);
                        }}
                        onMouseUp={(e) => {
                            e.preventDefault();
                            mouseDown(false);
                        }}
                        onMouseOver={(e) => {
                            e.preventDefault();
                            mouseOver(i,j);
                        }}
                        /> : 
            isPlayer ? <GridCellPlayer
                        className="player"
                        isPlayer={true}                         
                        data-i={i} 
                        data-j={j} 
                        onDragOver={dragOver} 
                        onDragEnter={dragEnter} 
                        onDragLeave={dragLeave}
                        onDrop={dragDrop}    
                        onMouseDown={(e) => {
                            e.preventDefault();
                            onCellClicked(i, j);
                            mouseDown(true);
                        }}
                        onMouseUp={(e) => {
                            e.preventDefault();
                            mouseDown(false);
                        }}
                        onMouseOver={(e) => {
                            e.preventDefault();
                            mouseOver(i,j);
                        }}
                        /> : 
            isTarget ? <GridCellTarget  
                            target="target"
                            isTarget={true}                           
                            data-i={i} 
                            data-j={j} 
                            onDragOver={dragOver} 
                            onDragEnter={dragEnter} 
                            onDragLeave={dragLeave}
                            onDrop={dragDrop}    
                            onMouseDown={(e) => {
                                e.preventDefault();
                                onCellClicked(i, j);
                                mouseDown(true);
                            }}
                            onMouseUp={(e) => {
                                e.preventDefault();
                                mouseDown(false);
                            }}
                            onMouseOver={(e) => {
                                e.preventDefault();
                                mouseOver(i,j);
                            }}
                        /> : 
            visited ? <GridCellVisited 
                            className="visited"
                            visited={true}                          
                            data-i={i} 
                            data-j={j} 
                            
                        /> : 
            shortestPath ? <GridCellShortestPath  
                            className="shortest-path"
                            shortestPath={true}                          
                            data-i={i} 
                            data-j={j} 
                            
                        />:
            <GridCellFloor 
                className="floor"
                floor={true}
                data-i={i} 
                data-j={j} 
                onDragOver={dragOver} 
                onDragEnter={dragEnter} 
                onDragLeave={dragLeave}
                onDrop={dragDrop}    
                onMouseDown={(e) => {
                    e.preventDefault();
                    onCellClicked(i, j);
                    mouseDown(true);
                }}
                onMouseUp={(e) => {
                    e.preventDefault();
                    mouseDown(false);
                }}
                onMouseOver={(e) => {
                    e.preventDefault();
                    mouseOver(i,j);
                }}
            />
            
        )
    }
};

export default GridCell;