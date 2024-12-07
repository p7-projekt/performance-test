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
} from "./exercise.js";

// Gets a Python or Haskell solution attempt for the Square Number exercise.
export function squareNumberExercise() {
	const number = Math.round(Math.random());

	// 50/50 split between Python and Haskell solutions.
	if (number == 0) {
		return haskellExercise();
	} else {
		return pythonExercise();
	}
}

// Gets a Haskell solution attempt from the Square Number exercise.
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
		"module Solution where\n\nsolution :: Int -> Int\nsolution n = n * n";
	const check = {
		"haskell square number exercise status": (r) => r.status === 200,
		"haskell square number exercise result": (r) => checkCorrect(r),
	};
	return newHaskellSolution(solution, check, 8);
}

// Wrong answer Haskell solution.
function wrongAnswerHaskell() {
	const solution =
		"module Solution where\n\nsolution :: Int -> Int\nsolution n = n + n";
	const check = {
		"haskell square number exercise wrong answer status": (r) =>
			r.status === 400,
		"haskell square number exercise wrong answer result": (r) =>
			checkWrongAnswer(r),
	};
	return newHaskellSolution(solution, check, 8);
}

// Runtime error Haskell solution.
function runtimeErrorHaskell() {
	const solution =
		"module Solution where\n\nsolution :: Int -> Int\nsolution n = n `div` 0";
	const check = {
		"haskell square number exercise runtime error status": (r) =>
			r.status === 400,
		"haskell square number exercise runtime error result": (r) =>
			checkRuntimeError(r),
	};
	return newHaskellSolution(solution, check, 8);
}

// Compilation error Haskell solution.
function compilationErrorHaskell() {
	const solution =
		"module Solution where\n\nsolution :: Int -> Int\nsolution n =";
	const check = {
		"haskell square number exercise compilation error status": (r) =>
			r.status === 400,
		"haskell square number exercise compilation error result": (r) =>
			checkCompileError(r),
	};
	return newHaskellSolution(solution, check, 8);
}

// Execution timeout Haskell solution.
function executionTimeoutHaskell() {
	const solution =
		"module Solution where\n\nsolution :: Int -> Int\nsolution n = solution n";
	const check = {
		"haskell square number exercise execution timeout status": (r) =>
			r.status === 400,
		"haskell square number exercise execution timeout result": (r) =>
			checkExecutionTimeout(r),
	};
	return newHaskellSolution(solution, check, 8);
}

// Gets a Python solution attempt from the Double String exercise.
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
	const solution = "def solution(n: int):\n    return n * n";
	const check = {
		"python square number exercise correct status": (r) => r.status === 200,
		"python square number exercise correct result": (r) => checkCorrect(r),
	};
	return newPythonSolution(solution, check, 8);
}

// Wrong answer Python solution.
function wrongAnswerPython() {
	const solution = "def solution(n: int):\n    return n + n";
	const check = {
		"python square number exercise wrong answer status": (r) =>
			r.status === 400,
		"python square number exercise wrong answer result": (r) =>
			checkWrongAnswer(r),
	};
	return newPythonSolution(solution, check, 8);
}

// Runtime error Python solution.
function runtimeErrorPython() {
	const solution = "def solution(n: int):\n    return n / 0";
	const check = {
		"python square number exercise runtime error status": (r) =>
			r.status === 400,
		"python square number exercise runtime error result": (r) =>
			checkRuntimeError(r),
	};
	return newPythonSolution(solution, check, 8);
}

// Syntax error Python solution.
function syntaxErrorPython() {
	const solution = "def solution(n: int)\n    return n";
	const check = {
		"python square number exercise syntax error status": (r) =>
			r.status === 400,
		"python square number exercise syntax error result": (r) =>
			checkSyntaxError(r),
	};
	return newPythonSolution(solution, check, 8);
}

// Execution timeout Python solution.
function executionTimeoutPython() {
	const solution =
		"def solution(n: int):\n    while True:\n        n = n + n\n    return n";
	const check = {
		"python square number exercise execution timeout status": (r) =>
			r.status === 400,
		"python square number exercise execution timeout result": (r) =>
			checkExecutionTimeout(r),
	};
	return newPythonSolution(solution, check, 8);
}
