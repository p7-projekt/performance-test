import {
	inRange,
	newHaskellSolution,
	newPythonSolution,
	checkCorrect,
	checkWrongAnswer,
	checkCompileError,
	checkExecutionTimeout,
	checkRuntimeError,
	checkSyntaxError,
	HASKELL_EXERCISE_RATE,
} from "./exercise.js";

// Gets a Python or Haskell solution attempt for the Sign Detector exercise.
export function signDetectorExercise() {
	const number = Math.random();

	if (number < HASKELL_EXERCISE_RATE) {
		return haskellExercise();
	} else {
		return pythonExercise();
	}
}

// Gets a Haskell solution attempt from the Sign Detector exercise.
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
		case inRange(number, 0.1, 0.14):
			return compilationErrorHaskell();
		case inRange(number, 0.15, 0.49):
			return wrongAnswerHaskell();
		default:
			return correctHaskell();
	}
}

// Correct Haskell solution.
function correctHaskell() {
	const solution =
		'module Solution where\n\nsolution :: Int -> String\nsolution n | n > 0 = "positive" | n < 0 = "negative" | otherwise = "zero"';
	const check = {
		"haskell sign detector exercise status": (r) => r.status === 200,
		"haskell sign detector exercise result": (r) => checkCorrect(r),
	};
	return newHaskellSolution(solution, check, 7);
}

// Wrong answer Haskell solution.
function wrongAnswerHaskell() {
	const solution =
		'module Solution where\n\nsolution :: Int -> String\nsolution n = "positive"';
	const check = {
		"haskell sign detector exercise wrong answer status": (r) =>
			r.status === 400,
		"haskell sign detector exercise wrong answer result": (r) =>
			checkWrongAnswer(r),
	};
	return newHaskellSolution(solution, check, 7);
}

// Runtime error Haskell solution.
function runtimeErrorHaskell() {
	const solution =
		"module Solution where\n\nsolution :: Int -> String\nsolution n = show (n `div` 0)";
	const check = {
		"haskell sign detector exercise runtime error status": (r) =>
			r.status === 400,
		"haskell sign detector exercise runtime error result": (r) =>
			checkRuntimeError(r),
	};
	return newHaskellSolution(solution, check, 7);
}

// Compilation error Haskell solution.
function compilationErrorHaskell() {
	const solution =
		"module Solution where\n\nsolution :: Int -> String\nsolution n =";
	const check = {
		"haskell sign detector exercise compilation error status": (r) =>
			r.status === 400,
		"haskell sign detector exercise compilation error result": (r) =>
			checkCompileError(r),
	};
	return newHaskellSolution(solution, check, 7);
}

// Execution timeout Haskell solution.
function executionTimeoutHaskell() {
	const solution =
		"module Solution where\n\nsolution :: Int -> String\nsolution n = solution n";
	const check = {
		"haskell sign detector exercise execution timeout status": (r) =>
			r.status === 400,
		"haskell sign detector exercise execution timeout result": (r) =>
			checkExecutionTimeout(r),
	};
	return newHaskellSolution(solution, check, 7);
}

// Gets a Python solution attempt from the Sign Detector exercise.
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
		case inRange(number, 0.1, 0.14):
			return syntaxErrorPython();
		case inRange(number, 0.15, 0.5):
			return wrongAnswerPython();
		default:
			return correctPython();
	}
}

// Correct Python solution.
function correctPython() {
	const solution =
		'def solution(n: int):\n    return "positive" if n > 0 else "negative" if n < 0 else "zero"';
	const check = {
		"python sign detector exercise correct status": (r) => r.status === 200,
		"python sign detector exercise correct result": (r) => checkCorrect(r),
	};
	return newPythonSolution(solution, check, 7);
}

// Wrong answer Python solution.
function wrongAnswerPython() {
	const solution = 'def solution(n: int):\n    return "positive"';
	const check = {
		"python sign detector exercise wrong answer status": (r) =>
			r.status === 400,
		"python sign detector exercise wrong answer result": (r) =>
			checkWrongAnswer(r),
	};
	return newPythonSolution(solution, check, 7);
}

// Runtime error Python solution.
function runtimeErrorPython() {
	const solution = "def solution(n: int):\n    return n / 0";
	const check = {
		"python sign detector exercise runtime error status": (r) =>
			r.status === 400,
		"python sign detector exercise runtime error result": (r) =>
			checkRuntimeError(r),
	};
	return newPythonSolution(solution, check, 7);
}

// Syntax error Python solution.
function syntaxErrorPython() {
	const solution = "def solution(n: int)\n    return n / 0";
	const check = {
		"python sign detector exercise syntax error status": (r) =>
			r.status === 400,
		"python sign detector exercise syntax error result": (r) =>
			checkSyntaxError(r),
	};
	return newPythonSolution(solution, check, 7);
}

// Execution timeout Python solution.
function executionTimeoutPython() {
	const solution =
		"def solution(n: int):\n    while True:\n        n = 1\n    return n";
	const check = {
		"python sign detector exercise execution timeout status": (r) =>
			r.status === 400,
		"python sign detector exercise execution timeout result": (r) =>
			checkExecutionTimeout(r),
	};
	return newPythonSolution(solution, check, 7);
}
