import {getRandomWordByLength} from "../getRandomWordByLength.ts";

export type GameState = 'idle' | 'waitingWord' | 'resolving' | 'OK' | 'KO';

export type WordleGameState = {
    currentState: GameState; // Current state of the game
    attempts: string[]; // Attempts by the user
    targetWord: string | null; // Target word to discover
    maxAttempts: number; // Maximum attempts
}

const DEFAULT_MAX_ATTEMPTS = 6;

export const initialState = (): WordleGameState => {
    return {
        currentState: 'idle',
        attempts: [],
        targetWord: null,
        maxAttempts: DEFAULT_MAX_ATTEMPTS,
    };
}

export const startGame =
    (state: WordleGameState, length: string): WordleGameState => {
    if (state.currentState !== 'idle') {
        throw new Error('El juego ya ha comenzado o está en progreso.');
    }

    const targetWord = getRandomWordByLength(parseInt(length));

    return {
        ...state,
        currentState: 'waitingWord',
        targetWord,
        attempts: [],
    };
}

export const makeAttempt =
    (state: WordleGameState, attempt: string): WordleGameState => {
    if (state.currentState !== 'waitingWord') {
        throw new Error('No se puede registrar un intento en el estado actual.');
    }

    if (attempt.length !== state.targetWord?.length) {
        throw new Error(`El intento debe tener exactamente ${state.targetWord?.length} letras.`);
    }

    const newAttempts = [...state.attempts, attempt];

    if (attempt === state.targetWord) {
        return {
            ...state,
            attempts: newAttempts,
            currentState: 'OK',
        };
    }

    if (newAttempts.length >= state.maxAttempts) {
        return {
            ...state,
            attempts: newAttempts,
            currentState: 'KO',
        };
    }

    return {
        ...state,
        attempts: newAttempts,
        currentState: 'resolving',
    };
}

export const resolveAnimation =
    (state: WordleGameState): WordleGameState => {
    if (state.currentState !== 'resolving') {
        throw new Error('Solo se puede resolver después de que se hayan animado las letras.');
    }

    return {
        ...state,
        currentState: 'waitingWord',
    };
}

export const resetGame = (): WordleGameState => initialState();
