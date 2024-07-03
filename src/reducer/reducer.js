import { Status } from "../constants";
import actionTypes from "./actionTypes";

export const reducer = (state, action) => {
    switch (action.type) {
        case actionTypes.NEW_MOVE : {
            let {position, movesList, turn} = state

            position = [
                ...position,
                action.payload.newPosition
            ]
            
            movesList = [
                ...movesList,
                action.payload.newMove
            ]
            
            turn = turn === 'w' ? 'b' : 'w'

            return {
                ...state,
                position,
                movesList,
                turn,
            }
        }

        case actionTypes.GENERATE_CANDIDATE_MOVES : {
            const { candidateMoves } = action.payload
            return {
                ...state,
                candidateMoves
            }
        } 

        case actionTypes.SET_CANDIDATE_SQUARE: {
            const { file, rank } = action.payload;

            return {
                ...state,
                candidateSquare : { file, rank }
            }
        } 

        case actionTypes.CLEAR_CANDIDATE_MOVES : {
            return {
                ...state,
                candidateMoves : [],
                candidateSquare : {
                    rank : null,
                    file : null
                }
            }
        }

        case actionTypes.FLIP_BOARD: {
            let { position } = state
            position[position.length - 1] = [...position[position.length - 1]].reverse()

            return {
                ...state,
                position
            }
        }

        case actionTypes.CHANGE_SETTINGS: {
            let { boardSettings } = state
            boardSettings[action.payload.setting] = action.payload.value

            return {
                ...state,
                boardSettings
            }
        }

        case actionTypes.SHOW_INNER_MARKERS: {
            return {
                ...state,
                showInnerMarkers: action.payload
            }
        }

        case actionTypes.CLEAR_HIGHLIGHTS : {
            return {
                ...state,
                highlightedSquares: [...Array(8)].map(_ => Array(8))
            }
        }

        case actionTypes.HIGHLIGHT_SQUARE : {
            const highlightedSquares = state.highlightedSquares;
            highlightedSquares[action.payload.i][action.payload.j] = action.payload.color

            return {
                ...state,
                highlightedSquares
            }
        }
    
        case actionTypes.PROMOTION_OPEN : {
            return {
                ...state,
                status : Status.promoting,
                promotionSquare : { ...action.payload },
            }
        }

        case actionTypes.PROMOTION_CLOSE : {
            return {
                ...state,
                status : Status.ongoing,
                promotionSquare : null,
            }
        }

        case actionTypes.CAN_CASTLE : {
            let {turn,castleDirection} = state 
        
            castleDirection[turn] = action.payload
            
            return {
                ...state,
                castleDirection,
            }
        }
        
        case actionTypes.STALEMATE : {
            return {
                ...state,
                status : Status.stalemate
            }
        }

        case actionTypes.INSUFFICIENT_MATERIAL : {
            return {
                ...state,
                status : Status.insufficient
            }
        }

        case actionTypes.WIN : {
            return {
                ...state,
                status : action.payload === 'w' ? Status.white : Status.black
            }
        }
         
        case actionTypes.NEW_GAME: {
            return {
                ...action.payload,
            }
        }
         
        case actionTypes.THEME: {
            return {
                ...state,
                ...action.payload,
            }
        }

        case actionTypes.TAKE_BACK : {
            let { position, movesList, turn } = state

            if (position.length > 1) {
                position = position.slice(0,position.length-1)
                movesList = movesList.slice(0,movesList.length-1)
                turn = turn === 'w' ? 'b' : 'w'
            }

            return {
                ...state,
                position,
                movesList,
                turn,
            }
        }

        default: 
            return state
    }
};
