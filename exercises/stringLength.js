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

// Gets a Python or Haskell solution attempt for the String Length exercise.
export function stringLengthExercise() {
	const number = Math.round(Math.random());

	// 50/50 split between Python and Haskell solutions.
	if (number == 0) {
		return haskellExercise();
	} else {
		return pythonExercise();
	}
}

// Gets a Haskell solution attempt from the String Length exercise.
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
		"module Solution where\n\nsolution :: String -> Int\nsolution [] = 0\nsolution s = 1 + solution (tail s)";
	const check = {
		"haskell string length exercise status": (r) => r.status === 200,
		"haskell string length exercise result": (r) => checkCorrect(r),
	};
	return newHaskellSolution(solution, check, 9);
}

// Wrong answer Haskell solution.
function wrongAnswerHaskell() {
	const solution =
		"module Solution where\n\nsolution :: String -> Int\nsolution [] = 0\nsolution s = 0 + solution (tail s)";
	const check = {
		"haskell string length exercise wrong answer status": (r) =>
			r.status === 400,
		"haskell string length exercise wrong answer result": (r) =>
			checkWrongAnswer(r),
	};
	return newHaskellSolution(solution, check, 9);
}

// Runtime error Haskell solution.
function runtimeErrorHaskell() {
	const solution =
		"module Solution where\n\nsolution :: String -> Int\nsolution s = 1 + solution (head s)";
	const check = {
		"haskell string length exercise runtime error status": (r) =>
			r.status === 400,
		"haskell string length exercise runtime error result": (r) =>
			checkRuntimeError(r),
	};
	return newHaskellSolution(solution, check, 9);
}

// Compilation error Haskell solution.
function compilationErrorHaskell() {
	const solution =
		"module Solution where\n\nsolution :: String -> Int\nsolution s =";
	const check = {
		"haskell string length exercise compilation error status": (r) =>
			r.status === 400,
		"haskell string length exercise compilation error result": (r) =>
			checkCompileError(r),
	};
	return newHaskellSolution(solution, check, 9);
}

// Execution timeout Haskell solution.
function executionTimeoutHaskell() {
	const solution =
		"module Solution where\n\nsolution :: String -> Int\nsolution s = solution s";
	const check = {
		"haskell string length exercise execution timeout status": (r) =>
			r.status === 400,
		"haskell string length exercise execution timeout result": (r) =>
			checkExecutionTimeout(r),
	};
	return newHaskellSolution(solution, check, 9);
}

// Gets a Python solution attempt from the String Length exercise.
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
	const solution = "def solution(s: str):\n    return len(s)";
	const check = {
		"python string length exercise correct status": (r) => r.status === 200,
		"python string length exercise correct result": (r) => checkCorrect(r),
	};
	return newPythonSolution(solution, check, 9);
}

// Wrong answer Python solution.
function wrongAnswerPython() {
	const solution = "def solution(s: str):\n    return 1 + len(s)";
	const check = {
		"python string length exercise wrong answer status": (r) =>
			r.status === 400,
		"python string length exercise wrong answer result": (r) =>
			checkWrongAnswer(r),
	};
	return newPythonSolution(solution, check, 9);
}

// Runtime error Python solution.
function runtimeErrorPython() {
	const solution = "def solution(s: str):\n    return len(s) / 0";
	const check = {
		"python string length exercise runtime error status": (r) =>
			r.status === 400,
		"python string length exercise runtime error result": (r) =>
			checkRuntimeError(r),
	};
	return newPythonSolution(solution, check, 9);
}

// Syntax error Python solution.
function syntaxErrorPython() {
	const solution = "def solution(s: str)\n    return len(s) / 0";
	const check = {
		"python string length exercise syntax error status": (r) =>
			r.status === 400,
		"python string length exercise syntax error result": (r) =>
			checkSyntaxError(r),
	};
	return newPythonSolution(solution, check, 9);
}

// Execution timeout Python solution.
function executionTimeoutPython() {
	const solution =
		"def solution(s: str):\n    while True:\n        n = 1\n    return s";
	const check = {
		"python string length exercise execution timeout status": (r) =>
			r.status === 400,
		"python string length exercise execution timeout result": (r) =>
			checkExecutionTimeout(r),
	};
	return newHaskellSolution(solution, check, 9);
}
