import {useState} from "react";
import {WordleGameState, initialState, startGame, resetGame} from "./domain/useCases/WordsUseCases";
import styles from './Words.module.css'
import {Board} from "./components/board/Board.tsx";
import {Header} from "./components/header/Header.tsx";

export const Words = () => {

    const [wordLength, setWordLength] = useState<string>('5');
    const [wordsState, setWordsState] = useState<WordleGameState>(initialState());

    const handleStartGame = () => {
        try {
            setWordsState(startGame(wordsState, wordLength));
        } catch (error) {
            console.error("Error al iniciar el juego:", error);
        }
    };

    const restartGame = () => setWordsState(resetGame())

    return (
        <div className={styles.main}>

            <Header/>
            {
                wordsState.currentState === 'idle' &&
                    <form onSubmit={handleStartGame} className={styles.welcome}>
                        <div className={styles.welcomeText}>
                            Longitud de la palabra: (5 - 9)
                            <input
                                className={styles.wordLength}
                                min="5"
                                max="9"
                                value={wordLength}
                                type="number"
                                name="length"
                                onChange={(event) => setWordLength(event.target.value)}
                            />
                        </div>
                        <button type="submit" disabled={wordLength < '5' || wordLength > '9'}>A jugar!</button>
                    </form>
            }
            {
                (wordsState.currentState === 'waitingWord' || wordsState.currentState === 'resolving') &&
                    <Board gameState={wordsState} setGameState={setWordsState}/>
            }

            {
                (wordsState.currentState === 'OK' || wordsState.currentState === 'KO') &&
                    <div className={styles.message}>
                        {wordsState.currentState === 'OK' && <div>¡Felicidades, has ganado!</div>}
                        {wordsState.currentState === 'KO' &&
                            <div>Has perdido. 😢 La palabra era: {wordsState.targetWord}</div>}
                        <button onClick={restartGame}>A jugar!</button>
                    </div>
            }
        </div>
    )
}
