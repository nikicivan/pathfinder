import styled, { keyframes, css } from 'styled-components';
import imgFloor from '../../assets/tiles/path_grey.png';
import imgWall from '../../assets/tiles/wall_red.png';
import imgPlayer from '../../assets/player/player.png';
import imgTarget from '../../assets/player/cherry.png';


const GridCellContainer = css`
    width: 3rem;
    height: 3rem;
    margin: 0;
    box-sizing: border-box;
    background-size: cover;
    background-clip: padding-box;    
    background-size: contain;
    -moz-background-clip: padding-box;
    cursor: pointer;
    
`;

export const GridCellFloor = styled.td`
    ${GridCellContainer};
    background: url(${imgFloor});
    background-size: contain;

    &:hover {
        cursor: pointer;
    }
`;

export const GridCellWall = styled.td`  
    ${GridCellContainer};
    background: url(${imgWall});  
    background-position: center;   
    &:focus { 
        cursor: pointer
    }
`;

export const GridCellPlayer = styled.td`  
    ${GridCellContainer};
    background: url(${imgPlayer});
    background-position: center;    
    &:focus { 
        cursor: pointer
    }
`;

export const GridCellTarget = styled.td`
    ${GridCellContainer}
    background: url(${imgTarget});   
    background-position: center; 
    &:focus { 
        cursor: pointer
    }
`;

const AnimationVisited = keyframes`
    0% {
        transform: scale(0.3);
        background-color: rgb(32, 32, 32);
        border-radius: 100%;
    }
    50% {
        background-color: rgb(0, 198, 212);
    }
    75% {
        transform: scale(1.2);
        background-color: rgb(51, 43, 145);
    }
    100% {
        transform: scale(1);
        background-color: rgb(67, 54, 180);
    }
`;


export const GridCellVisited = styled.td`
    width: 3rem;
    height: 3rem;
    margin: 0;
    box-sizing: border-box; 
    opacity: 1;
    animation-name: ${AnimationVisited};
    animation-duration: 1.5s;
    animation-timing-function: ease-out;
    animation-direction: alternate;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
    animation-play-state: running;
`;

const AnimationSP = keyframes`
    0% {
        transform: scale(0.3);
        background-color: rgb(32, 32, 32);
        border-radius: 100%;
    }
    50% {
        background-color: rgb(0, 218, 47);
    }
    75% {
        transform: scale(1.2);
        background-color: rgb(100, 145, 50);
    }
    100% {
        transform: scale(1);
        background-color: rgb(230, 230, 80);
    }
`;

export const GridCellShortestPath = styled.td`
    width: 3rem;
    height: 3rem;
    margin: 0;
    box-sizing: border-box;
    opacity: 1;
    animation-name: ${AnimationSP};
    animation-duration: 1.5s;
    animation-timing-function: ease-out;
    animation-direction: alternate;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
    animation-play-state: running;
`;