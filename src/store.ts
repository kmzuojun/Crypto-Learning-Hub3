import { Task, Record, GameState } from './types';

const STORAGE_KEY = 'decryption_game_data';

const defaultState: GameState = {
  tasks: [],
  records: []
};

export function loadGameState(): GameState {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : defaultState;
}

export function saveGameState(state: GameState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function addTask(task: Task) {
  const state = loadGameState();
  state.tasks.push(task);
  saveGameState(state);
}

export function addRecord(record: Record) {
  const state = loadGameState();
  state.records.push(record);
  saveGameState(state);
}