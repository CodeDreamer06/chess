import './Board.sass'
import { useAppContext }from '../../contexts/Context'
import Pieces from '../Pieces/Pieces'
import PromotionBox from '../Popup/PromotionBox/PromotionBox'
import Popup from '../Popup/Popup'
import GameEnds from '../Popup/GameEnds/GameEnds'

import arbiter from '../../arbiter/arbiter'
import { getKingPosition } from '../../arbiter/getMoves'
import { BoardSettingOptions } from '../../data/constants';
import { useEffect, useRef, useState } from 'react'

const Board = () => {
    const ranks = Array(8).fill().map((x,i) => 8-i)
    const files = Array(8).fill().map((x,i) => i+1)

    const { appState } = useAppContext();
    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [startPos, setStartPos] = useState({ x: 0, y: 0 });
    const { turn, highlightedSquares, boardSettings } = appState
    const { board: theme, coordinates } = boardSettings
    const position = appState.position[appState.position.length - 1];
    const checkTile = (() => {
        const isInCheck =  (arbiter.isPlayerInCheck({
            positionAfterMove : position,
            player : turn
        }))

        if (isInCheck) return getKingPosition(position, turn)
        return null
    })()

    const getClassName = (i, j) => {
        let c = 'tile'
        c += (i + j) % 2 === 0 ? ' tile--dark ' : ' tile--light '

        if (appState.candidateMoves?.find(m => m[0] === i && m[1] === j)) {
            if (position[i][j])
                c += ' attacking'
            else
                c += ' highlight'
        }

        if(checkTile && checkTile[0] === i && checkTile[1] === j) 
            c += ' checked'

        if(highlightedSquares[i][j])
            c += ' ' + highlightedSquares[i][j]

        return c
    }

    const onClick = e => {
        e.preventDefault()
        console.log(e)
    }

    const getMarkers = (i, j, orientation) => {
        const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
        if (orientation === 'files') if(i === 7) return files[j]
        if (orientation === 'ranks') if(j === 0) return 8 - i
    }

    const generateMarkerClasses = (i, j, kind) => `markers markers--${kind} markers--${(i + j) % 2 === 0 ? 'dark' : 'light'}-text`;

    const themeClass = BoardSettingOptions.board[theme].toLowerCase().split(' ').join('-');
  
    useEffect(() => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
  
      const handleRightClick = (e) => {
        e.preventDefault();
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setStartPos({ x, y });
        setIsDrawing(true);
      };
  
      const handleMouseMove = (e) => {
        if (!isDrawing) return;
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        drawArrow(ctx, startPos.x, startPos.y, x, y);
      };
  
      const handleMouseUp = () => {
        setIsDrawing(false);
      };
  
      canvas.addEventListener('contextmenu', handleRightClick);
      canvas.addEventListener('mousemove', handleMouseMove);
      canvas.addEventListener('mouseup', handleMouseUp);
  
      return () => {
        canvas.removeEventListener('contextmenu', handleRightClick);
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('mouseup', handleMouseUp);
      };
    }, [isDrawing, startPos]);
  
    const drawArrow = (ctx, fromx, fromy, tox, toy) => {
      const headlen = 10;
      const angle = Math.atan2(toy - fromy, tox - fromx);
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.beginPath();
      ctx.moveTo(fromx, fromy);
      ctx.lineTo(tox, toy);
      ctx.lineTo(tox - headlen * Math.cos(angle - Math.PI / 6), toy - headlen * Math.sin(angle - Math.PI / 6));
      ctx.moveTo(tox, toy);
      ctx.lineTo(tox - headlen * Math.cos(angle + Math.PI / 6), toy - headlen * Math.sin(angle + Math.PI / 6));
      ctx.stroke();
    };

    return <div className='board' style={{ backgroundImage: `url('https://images.chesscomfiles.com/chess-themes/boards/${BoardSettingOptions.board[boardSettings.board].toLowerCase().replace(/[- ]/g, "_")}/100.png')` }}>
        <div className='tiles'>
            {ranks.map((rank, i) =>
                files.map((file, j) =>
                    <div
                        key={file + '' + rank}
                        onClick={onClick}
                        i={i}
                        j={j}
                        className={`${getClassName(7 - i, j)}`}
                        theme={themeClass}>
                        {coordinates === 1 &&
                            <><span className={generateMarkerClasses(i, j, 'files')} theme={themeClass}>{getMarkers(i, j, 'files')}</span>
                            <span className={generateMarkerClasses(i, j, 'ranks')} theme={themeClass}>{getMarkers(i, j, 'ranks')}</span></>}
                    </div>
            ))}
        </div>

        <Pieces/>
        <canvas
            ref={canvasRef}
            id="arrowCanvas"
            width={600}
            height={600}
            style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}
        />
        <Popup>
            <PromotionBox />
            <GameEnds />
        </Popup>
    </div>    
}

export default Board