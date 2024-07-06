import { BoardSettingOptions } from '../data/constants';

export const getPieceImage = (piece, pieceTheme, quality = 150) => `url('https://images.chesscomfiles.com/chess-themes/pieces/${BoardSettingOptions.pieces[pieceTheme].toLowerCase().replace(/[- ]/g, "_")}/${quality}/${piece}.png')`;