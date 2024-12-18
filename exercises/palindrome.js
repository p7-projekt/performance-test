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

// Gets a Python or Haskell solution attempt for the Palindrome exercise.
export function palindromeExercise() {
	const number = Math.random();

	if (number < HASKELL_EXERCISE_RATE) {
		return haskellExercise();
	} else {
		return pythonExercise();
	}
}

// Gets a Haskell solution attempt from the Palindrome exercise.
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
		"module Solution where\n\nsolution :: String -> Bool\nsolution s = s == reverse s";
	const check = {
		"haskell palindrome exercise status": (r) => r.status === 200,
		"haskell palindrome exercise result": (r) => checkCorrect(r),
	};
	return newHaskellSolution(solution, check, 5);
}

// Wrong answer Haskell solution.
function wrongAnswerHaskell() {
	const solution =
		"module Solution where\n\nsolution :: String -> Bool\nsolution s = True";
	const check = {
		"haskell palindrome exercise wrong answer status": (r) => r.status === 400,
		"haskell palindrome exercise wrong answer result": (r) =>
			checkWrongAnswer(r),
	};
	return newHaskellSolution(solution, check, 5);
}

// Runtime error Haskell solution.
function runtimeErrorHaskell() {
	const solution =
		"module Solution where\n\nsolution :: String -> Bool\nsolution s = head []";
	const check = {
		"haskell palindrome exercise runtime error status": (r) => r.status === 400,
		"haskell palindrome exercise runtime error result": (r) =>
			checkRuntimeError(r),
	};
	return newHaskellSolution(solution, check, 5);
}

// Compilation error Haskell solution.
function compilationErrorHaskell() {
	const solution =
		"module Solution where\n\nsolution :: String -> Bool\nsolution s =";
	const check = {
		"haskell palindrome exercise compilation error status": (r) =>
			r.status === 400,
		"haskell palindrome exercise compilation error result": (r) =>
			checkCompileError(r),
	};
	return newHaskellSolution(solution, check, 5);
}

// Execution timeout Haskell solution.
function executionTimeoutHaskell() {
	const solution =
		"module Solution where\n\nsolution :: String -> Bool\nsolution s = solution s";
	const check = {
		"haskell palindrome exercise execution timeout status": (r) =>
			r.status === 400,
		"haskell palindrome exercise execution timeout result": (r) =>
			checkExecutionTimeout(r),
	};
	return newHaskellSolution(solution, check, 5);
}

// Gets a Python solution attempt from the Palindrome exercise.
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
	const solution = "def solution(s: str):\n    return s == s[::-1]";
	const check = {
		"python palindrome exercise correct status": (r) => r.status === 200,
		"python palindrome exercise correct result": (r) => checkCorrect(r),
	};
	return newPythonSolution(solution, check, 5);
}

// Wrong answer Python solution.
function wrongAnswerPython() {
	const solution = "def solution(s: str):\n    return s";
	const check = {
		"python palindrome exercise wrong answer status": (r) => r.status === 400,
		"python palindrome exercise wrong answer result": (r) =>
			checkWrongAnswer(r),
	};
	return newPythonSolution(solution, check, 5);
}

// Runtime error Python solution.
function runtimeErrorPython() {
	const solution = "def solution(s: str):\n    return len(s) / 0";
	const check = {
		"python palindrome exercise runtime error status": (r) => r.status === 400,
		"python palindrome exercise runtime error result": (r) =>
			checkRuntimeError(r),
	};
	return newPythonSolution(solution, check, 5);
}

// Syntax error Python solution.
function syntaxErrorPython() {
	const solution = "def solution(s: str)\n    return len(s) / 0";
	const check = {
		"python palindrome exercise syntax error status": (r) => r.status === 400,
		"python palindrome exercise syntax error result": (r) =>
			checkSyntaxError(r),
	};
	return newPythonSolution(solution, check, 5);
}

// Execution timeout Python solution.
function executionTimeoutPython() {
	const solution =
		"def solution(s: str):\n    while True:\n        n = 1\n    return s";
	const check = {
		"python palindrome exercise execution timeout status": (r) =>
			r.status === 400,
		"python palindrome exercise execution timeout result": (r) =>
			checkExecutionTimeout(r),
	};
	return newPythonSolution(solution, check, 5);
}
