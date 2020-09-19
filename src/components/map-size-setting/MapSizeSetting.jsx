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
        if (row >= 10) {
            if (row <= 20) {
                if (column >= 10) {
                    if (column <= 20) {
                        dispatch(changeRows(row));
                        dispatch(changeColumns(column));
                    } else {
                        alert("Y value must be equal or less then 20");
                    }
                } else {
                    alert("Y value must be equal or grather then 10");
                }
            } else {
                alert("X value must be equal or less then 20");
            }
        } else {
            alert("X value must be equal or grather then 10");
        }        
    }
    
    return (
        <MapSizeContainer style={{marginRight: '1rem', marginTop: '1rem'}}>
            <MapSizeInput onChange={(e) => setRow(e.target.value)} type="number" placeholder="x value" />
            <MapSizeInput onChange={(e) => setColumn(e.target.value)} type="number" placeholder="y value" />
            <Button onClick={handleMapSize} variant="contained" color="primary">Change</Button>
        </MapSizeContainer>
    )
};

export default MapSizeSetting;
