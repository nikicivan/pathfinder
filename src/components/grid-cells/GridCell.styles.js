import styled, { css, keyframes } from 'styled-components';
import imgFloor from '../../assets/tiles/path_grey.png';
import imgWall from '../../assets/tiles/wall_red.png';
import imgPlayer from '../../assets/player/player.png';
import imgTarget from '../../assets/player/cherry.png';

const GridCellContainer = css`
    width: 2.5rem;
    height: 2.5rem;
    margin: 0;
    box-sizing: border-box;
    background-size: cover;
    background-clip: padding-box;    
    background-size: contain;
    -moz-background-clip: padding-box;
    cursor: pointer;    
    @media (max-width: 768px) {
        width: 1.1rem;
        height: 1.1rem
    }
`;

export const GridCellFloor = styled.div`
    ${GridCellContainer};
    background: url(${imgFloor});
    background-size: contain;
    &:hover {
        cursor: pointer;
    }
`;

export const GridCellWall = styled.div`  
    ${GridCellContainer};
    background: url(${imgWall});  
    background-position: center;   
    &:focus { 
        cursor: pointer
    }
`;

export const GridCellPlayer = styled.div`  
    ${GridCellContainer};
    background: url(${imgPlayer});
    background-position: center;    
    &:focus { 
        cursor: pointer
    }
`;

export const GridCellTarget = styled.div`
    ${GridCellContainer}
    background: url(${imgTarget});   
    background-position: center; 
    &:focus { 
        cursor: pointer
    }
`;

const AnimationSPDFS = keyframes`
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

export const GridCellShortestPathDFS = styled.div`
    width: 2.5rem;
    height: 2.5rem;
    margin: 0;
    box-sizing: border-box; 
    opacity: 1;
    animation-name: ${AnimationSPDFS};
    animation-duration: 0s;
    animation-timing-function: ease-out;
    animation-direction: alternate;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
    animation-play-state: running;
    @media (max-width: 768px) {
        width: 1.1rem;
        height: 1.1rem
    }
`;

const AnimationSPBFS = keyframes`
    0% {
        transform: scale(0.3);
        background-color: rgb(32, 32, 32);
        border-radius: 100%;
    }
    50% {
        background-color: rgb(230, 230, 80);;
    }
    75% {
        transform: scale(1.2);
        background-color: rgb(230, 230, 80);;
    }
    100% {
        transform: scale(1);
        background-color: rgb(230, 230, 80);
    }
`;

export const GridCellShortestPathBFS = styled.div`
    width: 2.5rem;
    height: 2.5rem;
    margin: 0;
    box-sizing: border-box;
    opacity: 1;
    animation-name: ${AnimationSPBFS};
    animation-duration: 0s;
    animation-timing-function: ease-out;
    animation-direction: alternate;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
    animation-play-state: running;
    @media (max-width: 768px) {
        width: 1.1rem;
        height: 1.1rem
    }
`;

const AnimationSPDijkstra = keyframes`
    0% {
        transform: scale(0.3);
        background-color: rgb(32, 32, 32);
        border-radius: 100%;
    }
    50% {
        background-color: rgb(255, 11, 11);
    }
    75% {
        transform: scale(1.2);
        background-color: rgb(240, 43, 145);
    }
    100% {
        transform: scale(1);
        background-color: rgb(240, 85, 85);
    }
`;

export const GridCellShortestPathDijkstra = styled.div`
    width: 2.5rem;
    height: 2.5rem;
    margin: 0;
    box-sizing: border-box; 
    opacity: 1;
    animation-name: ${AnimationSPDijkstra};
    animation-duration: 0s;
    animation-timing-function: ease-out;
    animation-direction: alternate;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
    animation-play-state: running;
    @media (max-width: 768px) {
        width: 1.1rem;
        height: 1.1rem
    }
`;

const AnimationSPAstar = keyframes`
    0% {
        transform: scale(0.3);
        background-color: rgb(32, 32, 32);
        border-radius: 100%;
    }
    50% {
        background-color: rgb(64, 50, 10);
    }
    75% {
        transform: scale(1.2);
        background-color: rgb(127, 100, 15);
    }
    100% {
        transform: scale(1);
        background-color: rgb(64, 52, 11);
    }
`;

export const GridCellShortestPathAstar = styled.div`
    width: 2.5rem;
    height: 2.5rem;
    margin: 0;
    box-sizing: border-box; 
    opacity: 1;
    animation-name: ${AnimationSPAstar};     
    animation-duration: 0s;
    animation-timing-function: ease-out;
    animation-direction: alternate;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
    animation-play-state: running;
    @media (max-width: 768px) {
        width: 1.1rem;
        height: 1.1rem
    }
`;
