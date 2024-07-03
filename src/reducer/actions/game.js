import actionTypes from '../actionTypes';
import { initGameState } from '../../data/constants';

export const updateCastling = direction => {
    return {
        type: actionTypes.CAN_CASTLE,
        payload: direction,
    }
}

export const detectStalemate = () => {
    return {
        type: actionTypes.STALEMATE,
    }
}

export const detectInsufficientMaterial = () => {
    return {
        type: actionTypes.INSUFFICIENT_MATERIAL,
    }
}

export const detectCheckmate = winner => {
    return {
        type: actionTypes.WIN,
        payload: winner
    }
}

export const flipBoard = () => {
    return {
        type: actionTypes.FLIP_BOARD
    }
}

export const changeSettings = (setting, value) => {
    return {
        type: actionTypes.CHANGE_SETTINGS,
        payload: {setting, value}
    }
}

export const initializeSettings = config => ({
    type: actionTypes.INIT_SETTINGS,
    payload: config
})

export const setupNewGame = () => {
    return {
        type: actionTypes.NEW_GAME,
        payload : initGameState
    }
}