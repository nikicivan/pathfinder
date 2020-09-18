import FILTER_TYPES from './filter.types';

export const chooseAlg = (id) => ({
    type: FILTER_TYPES.CHOSE_ALGO,
    payload: id,
});

export const setLevel = (lv) => ({
    type: FILTER_TYPES.SET_LEVEL,
    payload: lv,
})

export const timeSpent = (tm) => ({
    type: FILTER_TYPES.TIME_SPENT,
    payload: tm,
});

export const cellVisitedNumber = (vc) => ({
    type: FILTER_TYPES.CELL_VISITED_NUMBER,
    payload: vc,
});

