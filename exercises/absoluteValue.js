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

// Gets a Python or Haskell solution attempt for the Absolute Value exercise.
export function absoluteValueExercise() {
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
		"module Solution where\n\nsolution :: Int -> Int\nsolution n =\n  if n < 0\n    then n * (-1)\n    else n";
	const check = {
		"haskell absolute value exercise status": (r) => r.status === 200,
		"haskell absolute value exercise result": (r) => checkCorrect(r),
	};
	return newHaskellSolution(solution, check, 0);
}

// Wrong answer Haskell solution.
function wrongAnswerHaskell() {
	const solution =
		"module Solution where\n\nsolution :: Int -> Int\nsolution n = n";
	const check = {
		"haskell absolute value exercise wrong answer status": (r) =>
			r.status === 400,
		"haskell absolute value exercise wrong answer result": (r) =>
			checkWrongAnswer(r),
	};
	return newHaskellSolution(solution, check, 0);
}

// Runtime error Haskell solution.
function runtimeErrorHaskell() {
	const solution =
		"module Solution where\n\nsolution :: Int -> Int\nsolution n = n `div` 0";
	const check = {
		"haskell absolute value exercise runtime error status": (r) =>
			r.status === 400,
		"haskell absolute value exercise runtime error result": (r) =>
			checkRuntimeError(r),
	};
	return newHaskellSolution(solution, check, 0);
}

// Compilation error Haskell solution.
function compilationErrorHaskell() {
	const solution =
		"module Solution where\n\nsolution :: Int -> Int\nsolution n =";
	const check = {
		"haskell absolute value exercise compilation error status": (r) =>
			r.status === 400,
		"haskell absolute value exercise compilation error result": (r) =>
			checkCompileError(r),
	};
	return newHaskellSolution(solution, check, 0);
}

// Execution timeout Haskell solution.
function executionTimeoutHaskell() {
	const solution =
		"module Solution where\n\nsolution :: Int -> Int\nsolution n = solution n";
	const check = {
		"haskell absolute value exercise execution timeout status": (r) =>
			r.status === 400,
		"haskell absolute value exercise execution timeout result": (r) =>
			checkExecutionTimeout(r),
	};
	return newHaskellSolution(solution, check, 0);
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
		"def solution(n: int):\n    if n < 0:\n        return n * (-1)\n    else:        return n";
	const check = {
		"python absolute value exercise correct status": (r) => r.status === 200,
		"python absolute value exercise correct result": (r) => checkCorrect(r),
	};
	return newPythonSolution(solution, check, 0);
}

// Wrong answer Python solution.
function wrongAnswerPython() {
	const solution = "def solution(n: int):\n    return n";
	const check = {
		"python absolute value exercise wrong answer status": (r) =>
			r.status === 400,
		"python absolute value exercise wrong answer result": (r) =>
			checkWrongAnswer(r),
	};
	return newPythonSolution(solution, check, 0);
}

// Runtime error Python solution.
function runtimeErrorPython() {
	const solution = "def solution(n: int):\n    return n / 0";
	const check = {
		"python absolute value exercise runtime error status": (r) =>
			r.status === 400,
		"python absolute value exercise runtime error result": (r) =>
			checkRuntimeError(r),
	};
	return newPythonSolution(solution, check, 0);
}

// Syntax error Python solution.
function syntaxErrorPython() {
	const solution = "def solution(n: int)\n    return n";
	const check = {
		"python absolute value exercise syntax error status": (r) =>
			r.status === 400,
		"python absolute value exercise syntax error result": (r) =>
			checkSyntaxError(r),
	};
	return newPythonSolution(solution, check, 0);
}

// Execution timeout Python solution.
function executionTimeoutPython() {
	const solution =
		"def solution(n: int):\n    while True:\n        n = n + n\n    return n";
	const check = {
		"python absolute value exercise execution timeout status": (r) =>
			r.status === 400,
		"python absolute value exercise execution timeout result": (r) =>
			checkExecutionTimeout(r),
	};
	return newHaskellSolution(solution, check, 0);
}
