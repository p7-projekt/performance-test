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

// Gets a Python or Haskell solution attempt for the Equal Strings exercise.
export function equalStringsExercise() {
	const number = Math.round(Math.random());

	// 50/50 split between Python and Haskell solutions.
	if (number == 0) {
		return haskellExercise();
	} else {
		return pythonExercise();
	}
}

// Gets a Haskell solution attempt from the Equal Strings exercise.
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
		"module Solution where\n\nsolution :: String -> String -> Bool\nsolution s1 s2 = s1 == s2";
	const check = {
		"haskell equal strings exercise status": (r) => r.status === 200,
		"haskell equal strings exercise result": (r) => checkCorrect(r),
	};
	return newHaskellSolution(solution, check, 4);
}

// Wrong answer Haskell solution.
function wrongAnswerHaskell() {
	const solution =
		"module Solution where\n\nsolution :: String -> String -> Bool\nsolution s1 s2 = s1 /= s2";
	const check = {
		"haskell equal strings exercise wrong answer status": (r) =>
			r.status === 400,
		"haskell equal strings exercise wrong answer result": (r) =>
			checkWrongAnswer(r),
	};
	return newHaskellSolution(solution, check, 4);
}

// Runtime error Haskell solution.
function runtimeErrorHaskell() {
	const solution =
		"module Solution where\n\nsolution :: String -> String -> Bool\nsolution s1 s2 = head []";
	const check = {
		"haskell equal strings exercise runtime error status": (r) =>
			r.status === 400,
		"haskell equal strings exercise runtime error result": (r) =>
			checkRuntimeError(r),
	};
	return newHaskellSolution(solution, check, 4);
}

// Compilation error Haskell solution.
function compilationErrorHaskell() {
	const solution =
		"module Solution where\n\nsolution :: String -> String -> Bool\nsolution s1 s2 =";
	const check = {
		"haskell equal strings exercise compilation error status": (r) =>
			r.status === 400,
		"haskell equal strings exercise compilation error result": (r) =>
			checkCompileError(r),
	};
	return newHaskellSolution(solution, check, 4);
}

// Execution timeout Haskell solution.
function executionTimeoutHaskell() {
	const solution =
		"module Solution where\n\nsolution :: String -> String -> Bool\nsolution s1 s2 = solution s1 s2";
	const check = {
		"haskell equal strings exercise execution timeout status": (r) =>
			r.status === 400,
		"haskell equal strings exercise execution timeout result": (r) =>
			checkExecutionTimeout(r),
	};
	return newHaskellSolution(solution, check, 4);
}

// Gets a Python solution attempt from the Equal Strings exercise.
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
	const solution = "def solution(s1: str, s2: str):\n    return s1 == s2";
	const check = {
		"python equal strings exercise correct status": (r) => r.status === 200,
		"python equal strings exercise correct result": (r) => checkCorrect(r),
	};
	return newPythonSolution(solution, check, 4);
}

// Wrong answer Python solution.
function wrongAnswerPython() {
	const solution = "def solution(s1: str, s2: str):\n    return s1 != s2";
	const check = {
		"python equal strings exercise wrong answer status": (r) =>
			r.status === 400,
		"python equal strings exercise wrong answer result": (r) =>
			checkWrongAnswer(r),
	};
	return newPythonSolution(solution, check, 4);
}

// Runtime error Python solution.
function runtimeErrorPython() {
	const solution = "def solution(s1: str, s2: str):\n    return len(s1) / 0";
	const check = {
		"python equal strings exercise runtime error status": (r) =>
			r.status === 400,
		"python equal strings exercise runtime error result": (r) =>
			checkRuntimeError(r),
	};
	return newPythonSolution(solution, check, 4);
}

// Syntax error Python solution.
function syntaxErrorPython() {
	const solution = "def solution(s1: str, s2: str)\n    return len(s1) / 0";
	const check = {
		"python equal strings exercise syntax error status": (r) =>
			r.status === 400,
		"python equal strings exercise syntax error result": (r) =>
			checkSyntaxError(r),
	};
	return newPythonSolution(solution, check, 4);
}

// Execution timeout Python solution.
function executionTimeoutPython() {
	const solution =
		"def solution(s1: str, s2: str):\n    while True:\n        n = 1\n    return s1";
	const check = {
		"python equal strings exercise execution timeout status": (r) =>
			r.status === 400,
		"python equal strings exercise execution timeout result": (r) =>
			checkExecutionTimeout(r),
	};
	return newPythonSolution(solution, check, 4);
}
