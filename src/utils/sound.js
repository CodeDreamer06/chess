import { BoardSettingOptions } from '../data/constants'
import arbiter from '../arbiter/arbiter';

const playSounds = (newMove, newPosition, opponent, soundThemeIndex) => {
    if (soundThemeIndex === 0) return
    const soundTheme = BoardSettingOptions.soundTheme[soundThemeIndex].toLowerCase();

    if (arbiter.isPlayerInCheck({
        positionAfterMove: newPosition,
        player: opponent
    }))
        new Audio(`https://images.chesscomfiles.com/chess-themes/sounds/_WEBM_/${soundTheme}/move-check.webm`).play()
    
    else {
        if (newMove.includes("x"))
            new Audio(`https://images.chesscomfiles.com/chess-themes/sounds/_WEBM_/${soundTheme}/capture.webm`).play()

        else if (newMove.includes("O"))
            new Audio(`https://images.chesscomfiles.com/chess-themes/sounds/_WEBM_/${soundTheme}/castle.webm`).play()

        else {
            if(opponent === "b")
                new Audio(`https://images.chesscomfiles.com/chess-themes/sounds/_WEBM_/${soundTheme}/move-self.webm`).play()
            else
                new Audio(`https://images.chesscomfiles.com/chess-themes/sounds/_WEBM_/${soundTheme}/move-opponent.webm`).play()
        }
    }
}

export default playSounds;