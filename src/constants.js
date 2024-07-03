import { createPosition } from './helper'

export const Status = {
    'ongoing' : 'Ongoing',
    'promoting' : 'Promoting',
    'white' : 'White wins',
    'black' : 'Black wins',
    'stalemate' : 'Game draws due to stalemate',
    'insufficient' : 'Game draws due to insufficient material',
}

export const initGameState = {
    position : [createPosition()],
    turn : 'w',
    candidateMoves : [],
    candidateSquare : {
        rank : null,
        file : null
    },
    movesList : [],
    highlightedSquares: [...Array(8)].map(_ => Array(8)),
    promotionSquare : null,
    status : Status.ongoing,
    castleDirection : {
        w : 'both',
        b : 'both'
    },
    boardSettings: {
        pieces: 4,
        board: 1,
        soundTheme: 0,
        coordinates: 0,
        pieceNotation: 0,
        moveClassificationStyle: 0,
        pieceAnimations: 0,
        moveMethod: 0,
        highlightMoves: false,
        showLegalMoves: false,
    }
}

export const BoardSettingOptions = {
    pieces: ['Neo', 'Game Room', 'Wood', 'Glass', 'Gothic', 'Classic', 'Metal', 'Bases', 'Neo-Wood', 'Icy', 'Sea', 'Club', 'Ocean', 'Newspaper', 'Blindfold', 'Space', 'Cases', 'Condal', '3D - ChessKid', '8-Bit', 'Marble', 'Book', 'Alpha', 'Bubblegum', 'Dash', 'Graffiti', 'Light', 'Lolz', 'Luca', 'Maya', 'Modern', 'Nature', 'Neon', 'Sky', 'Tigers', 'Tournament', 'Vintage', '3D - Wood', '3D - Staunton', '3D - Plastic', 'Real 3D' ],
    board: ['Green', 'Dark', 'Wood', 'Glass', 'Brown', 'Icy', 'Sea', 'Newspaper', 'Walnut', 'Sky', 'Lolz', 'Stone', 'Bases', '8-Bit', 'Marble', 'Purple', 'Translucent', 'Metal', 'Tournament', 'Dash', 'Burled', 'Wood', 'Blue', 'Bubblegum', 'Checkers', 'Graffiti', 'Light', 'Neon', 'Orange', 'Overlay', 'Parchment', 'Red', 'Sand', 'Tan'],
    soundTheme: ['None', 'Default', 'Nature', 'Metal', 'Marble', 'Space', 'Beat', 'Silly', 'Lolz', 'Newspaper'],
    coordinates: ['None', 'Inside', 'Outside'],
    pieceNotation: ['Text', 'Figurine'],
    moveClassificationStyle: ['Default', 'Traditional'],
    pieceAnimations: ['None', 'Slow', 'Medium (Default)', 'Fast', 'Natural', 'Arcade'],
    moveMethod: ['Drag or Click', 'Click Squares', 'Drag Pieces']
}