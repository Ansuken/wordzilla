import React, {useState, useRef, useEffect} from 'react';
import styles from './Board.module.css';
import {WordleGameState, makeAttempt, resolveAnimation, initialState} from '../../domain/useCases/WordsUseCases';

type BoardProps = {
    gameState: WordleGameState;
    setGameState: React.Dispatch<React.SetStateAction<WordleGameState>>;
};

export const Board = ({ gameState, setGameState }: BoardProps) => {
    const [currentInput, setCurrentInput] = useState('');
    const [revealedLetters, setRevealedLetters] = useState<Record<number, number[]>>({}); // Revelado por fila
    const inputRef = useRef<HTMLInputElement>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentInput(e.target.value.toUpperCase());
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (currentInput.length !== gameState.targetWord?.length) {
            alert('La palabra debe tener exactamente 5 letras.');
            return;
        }

        try {
            const updatedState = makeAttempt(gameState, currentInput);
            setGameState(updatedState);

            if (updatedState.currentState === 'resolving') {
                const rowIndex = updatedState.attempts.length - 1; // Última fila
                const revealAnimation = () => {
                    if (!gameState.targetWord) return;
                    for (let i = 0; i < gameState.targetWord.length; i++) {
                        setTimeout(() => {
                            setRevealedLetters((prev) => ({
                                ...prev,
                                [rowIndex]: [...(prev[rowIndex] || []), i], // Agregar índice a la fila específica
                            }));
                            if (gameState.targetWord && (i === gameState.targetWord.length - 1)) {
                                // Una vez completada la animación, resolvemos
                                setTimeout(() => {
                                    const resolvedState = resolveAnimation(updatedState);
                                    setGameState(resolvedState);
                                }, 100);
                            }
                        }, i * 100); // Retraso progresivo por letra
                    }
                };

                revealAnimation();
            }
            setCurrentInput('');
        } catch (error) {
            console.log(error);
        }
    };

    const handleCancel = () => {
        setCurrentInput('');
        setRevealedLetters({});
        setGameState(initialState())
    }

    useEffect(()=>{
        if (gameState.currentState === 'waitingWord') {
            inputRef.current?.focus();
        }
    }, [gameState])

    if (!gameState.targetWord) return null

    return (
        <div className={styles.board}>
            <div className={styles.grid}>
                {Array.from({ length: gameState.maxAttempts }).map((_, rowIndex) => {
                    const attempt = gameState.attempts[rowIndex] || '';

                    // Inicializamos un contador para las letras correctas
                    const correctLetterCount: { [key: string]: number } = {};
                    if (!gameState.targetWord) return null;

                    // Primero, contamos cuántas letras están en la posición correcta
                    Array.from({ length: gameState.targetWord.length }).forEach((_, i) => {
                        if (!gameState.targetWord) return;
                        if (attempt[i] === gameState.targetWord[i]) {
                            correctLetterCount[attempt[i]] = (correctLetterCount[attempt[i]] || 0) + 1;
                        }
                    });

                    return (
                        <div key={rowIndex} className={styles.row}>
                            {Array.from({ length: gameState.targetWord.length }).map((_, colIndex) => {
                                const letter = attempt[colIndex] || '';
                                let cellState = '';

                                if (letter && gameState.targetWord) {
                                    if (letter === gameState.targetWord[colIndex]) {
                                        cellState = styles.correct;
                                    } else if (
                                        gameState.targetWord.includes(letter) &&
                                        (correctLetterCount[letter] || 0) < gameState.targetWord.split(letter).length - 1
                                    ) {
                                        // Verificamos si la letra no ha excedido su límite de posiciones correctas
                                        correctLetterCount[letter] = (correctLetterCount[letter] || 0) + 1;
                                        cellState = styles.present;
                                    } else {
                                        cellState = styles.absent;
                                    }
                                }

                                const isRevealed =
                                    gameState.currentState !== 'resolving' ||
                                    (revealedLetters[rowIndex]?.includes(colIndex) ?? false);

                                return (
                                    <div
                                        key={colIndex}
                                        className={`${styles.cell} ${isRevealed ? cellState : ''}`}
                                    >
                                        {isRevealed ? letter : ''}
                                    </div>
                                );
                            })}
                        </div>
                    );
                })}

            </div>

            <form onSubmit={handleSubmit} className={styles.inputContainer}>
                <input
                    type="text"
                    maxLength={gameState.targetWord.length}
                    value={currentInput}
                    onChange={handleInputChange}
                    className={styles.input}
                    placeholder="Escribe aquí..."
                    disabled={gameState.currentState === 'resolving'}
                    autoFocus
                    ref={inputRef}
                />
                <button type="submit"
                        className={styles.submitButton}
                        disabled={gameState.currentState === 'resolving' || currentInput.length !== gameState.targetWord.length}>
                    Enviar
                </button>
                <button
                        className={styles.cancelButton}
                        onClick={handleCancel}>
                    Cancel
                </button>
            </form>
        </div>
    );
};
