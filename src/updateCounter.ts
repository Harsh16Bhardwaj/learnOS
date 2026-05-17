import path from "node:path";
import { CounterState } from "./types.js";
import { ROOT_DIR, readJson, writeJson } from "./utils.js";

export function updateCounterForSuccess(day: number, today: string): CounterState {
  const counterPath = path.join(ROOT_DIR, "counter.json");
  const counter = readJson<CounterState>(counterPath);
  const completed = new Set(counter.completedDays);
  completed.add(day);

  const nextState: CounterState = {
    currentDay: counter.currentDay + 1,
    lastGeneratedDate: today,
    completedDays: Array.from(completed).sort((left, right) => left - right)
  };

  writeJson(counterPath, nextState);
  return nextState;
}

