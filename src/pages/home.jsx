import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {createGrid } from '../redux/grid/grid.actions';

import { HomeContainer } from './homeStyles';
import Header from '../components/header/Header';
import PlayContainer from '../components/play-container/PlayContainer';


const Home = () =>  {  
    const [results, setResults] = useState([]);
       
    const grid = useSelector(state => state.grid);
    const { columns, rows } = grid;

    const filter = useSelector(state => state.filter);
    const { level } = filter;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(createGrid());
        // eslint-disable-next-line
    }, [rows, columns]);    


    const getLocalStorage = () => {
        if (!localStorage.getItem('results')) {
            localStorage.setItem('results', JSON.stringify([]));
        }
        else {
            let localResults = JSON.parse(localStorage.getItem('results'));
            setResults(localResults);
        }
    };

    const removeLocalStorage = () => {
        if(localStorage.getItem('results')) {
            localStorage.removeItem('results');
        }
    };

    useEffect(() => {
        getLocalStorage();
    }, []);

          
    return (
        <HomeContainer>            
            <Header results={results} setResults={setResults} removeLocalStorage={removeLocalStorage} />
            <PlayContainer results={results} setResults={setResults} level={level} />
        </HomeContainer>
    )       
}

export default Home;




