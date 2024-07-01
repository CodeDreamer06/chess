import actionTypes from '../actionTypes';

export const makeNewMove = ({newPosition, newMove}) => {
    return {
        type: actionTypes.NEW_MOVE,
        payload: {newPosition, newMove},
    }
}

export const clearCandidates = () => {
    return {
        type: actionTypes.CLEAR_CANDIDATE_MOVES,
    }
}

export const clearHighlights = () => {
    return {
        type: actionTypes.CLEAR_HIGHLIGHTS,
    }
}

export const highlightSquare = (i, j, color) => {
    return {
        type: actionTypes.HIGHLIGHT_SQUARE,
        payload: {i, j, color}
    }
}

export const generateCandidates = ({ candidateMoves }) => {
    return {
        type: actionTypes.GENERATE_CANDIDATE_MOVES,
        payload : { candidateMoves }
    }
}

export const setCandidateSquare = ({ file, rank }) => {
    return {
        type: actionTypes.SET_CANDIDATE_SQUARE,
        payload : { file, rank }
    }
}

export const takeBack = () => {
    return {
        type: actionTypes.TAKE_BACK,
    }
}
