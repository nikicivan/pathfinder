import { Button } from '@material-ui/core';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { changeColumns, changeRows } from '../../redux/grid/grid.actions';

import { MapSizeContainer, MapSizeInput } from './mapSize-styles';


const MapSizeSetting = () => {
    const [row, setRow] = useState(0);
    const [column, setColumn] = useState(0);

    
    const dispatch = useDispatch();

    
    const handleMapSize = (e) => {
        e.preventDefault();
        dispatch(changeRows(row));
        dispatch(changeColumns(column));
    }
    
    return (
        <MapSizeContainer>
            <MapSizeInput min={10} onChange={(e) => setRow(e.target.value)} type="number" name="horizontal" placeholder="x value" max={20} required></MapSizeInput>
            <MapSizeInput min={10} onChange={(e) => setColumn(e.target.value)} type="number" name="vertical" placeholder="y value" max={20} required></MapSizeInput>
            <Button onClick={handleMapSize} variant="contained" color="primary">Change</Button>
        </MapSizeContainer>
    )
}

export default MapSizeSetting;
