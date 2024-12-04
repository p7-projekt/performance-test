import { absoluteValueExercise } from "./absoluteValue.js";
import { stringLengthExercise } from "./stringLength.js";

export function newHaskellSolution(solution, check) {
  return {
    payload: {
      solution,
      languageId: 1,
    },
    check,
  }
}

export function newPythonSolution(solution, check) {
  return {
    payload: {
      solution,
      languageId: 1,
    },
    check,
  }
}

// Helper to check whether a value is within a specific range.
export function inRange(value, min, max) {
  return value >= min && value <= max;
}

// Get a job to send to Mozart.
//
// Returns a JSON payload for the request, and a check for the result of the request.
export function getExercise() {
  // Generates number n, where 0 <= n < 1.
  const number = Math.random();

  // There is a 10% change of getting any given exercise.
  switch (true) {
    case inRange(number, 0, 0.09):
      return absoluteValueExercise();
    case inRange(number, 0.10, 0.14):
      return stringLengthExercise();
  }
}
