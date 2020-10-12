import styled from 'styled-components';

export const MapSizeContainer = styled.div`
    display: flex;
    @media (max-width: 768px) {
        display: block;
    }
`;

export const MapSizeInput = styled.input`
    margin-left: .5rem;
    background-color: whitesmoke;
    outline-width: 0;
    border:none;
    color: black;
    text-align: center;
    font-size: small;
    box-shadow: 0 10px 5px 0 rgba(0, 0, 0, 0.5);
    border-radius: 3px;
    width: 10rem;
    height: 2rem;
`;

export const MapSizeForm = styled.form`
    display: flex;
    @media (max-width: 768px) {
        display: grid;
        place-items: center;        
    }
`;

export const MapSizeButton = styled.button`
    width: 5rem;
    background-color: #3f51b5;
    border-radius: 5px;
    height: 2rem;
    margin-left: 1rem;
    color: white;
    cursor: pointer;
    display: none;
    @media (max-width: 768px) {
        display: grid;
        place-items: center;
        margin-top: 1rem;
    }
`;

export const MapSizeFormPlayer = styled.form`
    display: flex;
    box-shadow: 5px 5px 10px -5px rgba(0, 0, 0, 0.75);
    @media (max-width: 768px) {
        display: grid;
        place-items: center;
        margin-bottom: 1rem;
    }
`;

export const MapSizePlayerPosButton = styled.button`
    width: 5rem;
    background-color: #3f51b5;
    border-radius: 5px;
    height: 2rem;
    margin-left: 1rem;
    color: white;
    cursor: pointer;
    display: none;
    @media (max-width: 768px) {
        display: grid;
        place-items: center;
        margin-top: 1rem;
    }
`;

export const MapSizeFormTarget = styled.form`
    display: flex;   
    box-shadow: 5px 5px 10px -5px rgba(0, 0, 0, 0.75);
    @media (max-width: 768px) {
        display: grid;
        place-items: center;
        margin-bottom: 1rem;
    }
`;

export const MapSizeTargetPosButton = styled.button`
    width: 5rem;
    background-color: #3f51b5;
    border-radius: 5px;
    height: 2rem;
    margin-left: 1rem;
    color: white;
    cursor: pointer;
    display: none;
    @media (max-width: 768px) {
        display: grid;
        place-items: center;
        margin-top: 1rem;
    }
`;
