import { inRange, newHaskellSolution, newPythonSolution } from "./exercise.js";

// Gets a Python or Haskell solution attempt for the Absolute Value exercise.
export function stringLengthExercise() {
  const number = Math.round(Math.random());

  // 50/50 split between Python and Haskell solutions.
  if (number == 0) {
    return haskellExercise();
  } else {
    return pythonExercise();
  }
}

// Gets a Haskell solution attempt from the Absolute Value exercise.
function haskellExercise() {
  const number = Math.random();

  // The probability splits are as follows:
  // -            runtime error: 5%
  // -        execution timeout: 5%
  // - compilation/syntax error: 5%
  // -             wrong answer: 35%
  // -           correct answer: 50%
  switch (true) {
    case inRange(number, 0, 0.04):
      return runtimeErrorHaskell();
    case inRange(number, 0.05, 0.09):
      return executionTimeoutHaskell();
    case inRange(number, 0.10, 0.14):
      return compilationErrorHaskell();
    case inRange(number, 0.15, 0.49):
      return wrongAnswerHaskell();
    default:
      return correctHaskell();
  }
}

// Correct Haskell solution.
function correctHaskell() {
  const solution = "module Solution where\n\nsolution :: String -> Int\nsolution [] = 0\nsolution s = 1 + solution (tail s)";
  const check = {
    "status": r => r.status === 200,
    "result": r => r.json().result === "pass",
  };
  return newHaskellSolution(solution, check);
}

// Wrong answer Haskell solution.
function wrongAnswerHaskell() {
  const solution = "module Solution where\n\nsolution :: String -> Int\nsolution [] = 0\nsolution s = 0 + solution (tail s)";
  const check = {
    "status": r => r.status === 400,
    "result": r => r.json().result === "failure" && r.json().testCases.some(testCase => testCase.testResult.cause === "wrongAnswer"),
  };
  return newHaskellSolution(solution, check);
}

// Runtime error Haskell solution.
function runtimeErrorHaskell() {
  const solution = "module Solution where\n\nsolution :: String -> Int\nsolution s = 1 + solution (head s)";
  const check = {
    "status": r => r.status === 400,
    "result": r => r.json().result === "failure" && r.json().testCases.some(testCase => testCase.testResult.cause === "runtimeError"),
  };
  return newHaskellSolution(solution, check);
}

// Compilation error Haskell solution.
function compilationErrorHaskell() {
  const solution = "module Solution where\n\nsolution :: String -> Int\nsolution s =";
  const check = {
    "status": r => r.status === 400,
    "error": r => r.json().error.startsWith("an error occurred during compilation"),
  };
  return newHaskellSolution(solution, check);
}

// Execution timeout Haskell solution.
function executionTimeoutHaskell() {
  const solution = "module Solution where\n\nsolution :: Int -> Int\nsolution s = solution s";
  const check = {
    "status": r => r.status === 400,
    "error": r => r.json().error.startsWith("execution exceeded the timeout limit of"),
  };
  return newHaskellSolution(solution, check);
}

// Gets a Python solution attempt from the Absolute Value exercise.
function pythonExercise() {
  const number = Math.random();

  // The probability splits are as follows:
  // -            runtime error: 5%
  // -        execution timeout: 5%
  // - compilation/syntax error: 5%
  // -             wrong answer: 35%
  // -           correct answer: 50%
  switch (true) {
    case inRange(number, 0, 0.04):
      return runtimeErrorPython();
    case inRange(number, 0.05, 0.09):
      return executionTimeoutPython();
    case inRange(number, 0.10, 0.14):
      return syntaxErrorPython();
    case inRange(number, 0.15, 0.50):
      return wrongAnswerPython();
    default:
      return correctPython();
  }
}

// Correct Python solution.
function correctPython() {
  const solution = "def solution(s: str):\n    return len(s)";
  const check = {
    "status": r => r.status === 200,
    "result": r => r.json().result === "pass",
  };
  return newPythonSolution(solution, check);
}

// Wrong answer Python solution.
function wrongAnswerPython() {
  const solution = "def solution(s: str):\n    return 1 + len(s)";
  const check = {
    "status": r => r.status === 400,
    "result": r => r.json().result === "failure" && r.json().testCases.some(testCase => testCase.testResult.cause === "wrongAnswer"),
  };
  return newPythonSolution(solution, check);
}

// Runtime error Python solution.
function runtimeErrorPython() {
  const solution = "def solution(s: str):\n    return len(s) / 0";
  const check = {
    "status": r => r.status === 400,
    "result": r => r.json().result === "failure" && r.json().testCases.some(testCase => testCase.testResult.cause === "runtimeError"),
  };
  return newPythonSolution(solution, check);
}

// Syntax error Python solution.
function syntaxErrorPython() {
  const solution = "def solution(s: str)\n    return len(s) / 0";
  const check = {
    "status": r => r.status === 400,
    "error": r => r.json().error.startsWith("an error occured during execution"),
  };
  return newPythonSolution(solution, check);
}

// Execution timeout Python solution.
function executionTimeoutPython() {
  const solution = "def solution(s: str):\n    while True:";
  const check = {
    "status": r => r.status === 400,
    "error": r => r.json().error.startsWith("execution exceeded the timeout limit of"),
  };
  return newHaskellSolution(solution, check);
}
