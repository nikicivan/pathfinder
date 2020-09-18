import styled from 'styled-components';

export const PlayContainerDiv = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    @media (max-width: 768px) {
        flex-direction: column;
        justify-content: center;
    }
`;