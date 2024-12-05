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

// Gets a Python or Haskell solution attempt for the Vowel Count exercise.
export function vowelCountExercise() {
	const number = Math.round(Math.random());

	// 50/50 split between Python and Haskell solutions.
	if (number == 0) {
		return haskellExercise();
	} else {
		return pythonExercise();
	}
}

// Gets a Haskell solution attempt from the Vowel Count exercise.
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
		'module Solution where\n\nsolution :: String -> Int\nsolution s = length (filter (`elem` "aeiouAEIOU") s)';
	const check = {
		"haskell vowel count exercise status": (r) => r.status === 200,
		"haskell vowel count exercise result": (r) => checkCorrect(r),
	};
	return newHaskellSolution(solution, check);
}

// Wrong answer Haskell solution.
function wrongAnswerHaskell() {
	const solution =
		"module Solution where\n\nsolution :: String -> Int\nsolution s = 0";
	const check = {
		"haskell vowel count exercise wrong answer status": (r) => r.status === 400,
		"haskell vowel count exercise wrong answer result": (r) =>
			checkWrongAnswer(r),
	};
	return newHaskellSolution(solution, check);
}

// Runtime error Haskell solution.
function runtimeErrorHaskell() {
	const solution =
		"module Solution where\n\nsolution :: String -> Int\nsolution s = 1 + solution (head s)";
	const check = {
		"haskell vowel count exercise runtime error status": (r) =>
			r.status === 400,
		"haskell vowel count exercise runtime error result": (r) =>
			checkRuntimeError(r),
	};
	return newHaskellSolution(solution, check);
}

// Compilation error Haskell solution.
function compilationErrorHaskell() {
	const solution =
		"module Solution where\n\nsolution :: String -> Int\nsolution s =";
	const check = {
		"haskell vowel count exercise compilation error status": (r) =>
			r.status === 400,
		"haskell vowel count exercise compilation error result": (r) =>
			checkCompileError(r),
	};
	return newHaskellSolution(solution, check);
}

// Execution timeout Haskell solution.
function executionTimeoutHaskell() {
	const solution =
		"module Solution where\n\nsolution :: Int -> Int\nsolution s = solution s";
	const check = {
		"haskell vowel count exercise execution timeout status": (r) =>
			r.status === 400,
		"haskell vowel count exercise execution timeout result": (r) =>
			checkExecutionTimeout(r),
	};
	return newHaskellSolution(solution, check);
}

// Gets a Python solution attempt from the Vowel Count exercise.
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
		"def solution(s: str):\n    return sum(c in 'aeiouAEIOU' for c in s)";
	const check = {
		"python vowel count exercise correct status": (r) => r.status === 200,
		"python vowel count exercise correct result": (r) => checkCorrect(r),
	};
	return newPythonSolution(solution, check);
}

// Wrong answer Python solution.
function wrongAnswerPython() {
	const solution = "def solution(s: str):\n    return 1 + len(s)";
	const check = {
		"python vowel count exercise wrong answer status": (r) => r.status === 400,
		"python vowel count exercise wrong answer result": (r) =>
			checkWrongAnswer(r),
	};
	return newPythonSolution(solution, check);
}

// Runtime error Python solution.
function runtimeErrorPython() {
	const solution = "def solution(s: str):\n    return len(s) / 0";
	const check = {
		"python vowel count exercise runtime error status": (r) => r.status === 400,
		"python vowel count exercise runtime error result": (r) =>
			checkRuntimeError(r),
	};
	return newPythonSolution(solution, check);
}

// Syntax error Python solution.
function syntaxErrorPython() {
	const solution = "def solution(s: str)\n    return len(s) / 0";
	const check = {
		"python vowel count exercise syntax error status": (r) => r.status === 400,
		"python vowel count exercise syntax error result": (r) =>
			checkSyntaxError(r),
	};
	return newPythonSolution(solution, check);
}

// Execution timeout Python solution.
function executionTimeoutPython() {
	const solution =
		"def solution(s: str):\n    while True:\n        n = 1\n    return s";
	const check = {
		"python vowel count exercise execution timeout status": (r) =>
			r.status === 400,
		"python vowel count exercise execution timeout result": (r) =>
			checkExecutionTimeout(r),
	};
	return newHaskellSolution(solution, check);
}
