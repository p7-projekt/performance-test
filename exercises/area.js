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

// Gets a Python or Haskell solution attempt for the Area exercise.
export function areaExercise() {
	const number = Math.round(Math.random());

	// 50/50 split between Python and Haskell solutions.
	if (number == 0) {
		return haskellExercise();
	} else {
		return pythonExercise();
	}
}

// Gets a Haskell solution attempt from the Area exercise.
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
		"module Solution where\n\nsolution :: Int -> Int -> Int\nsolution h w = h * w";
	const check = {
		"haskell area exercise status": (r) => r.status === 200,
		"haskell area exercise result": (r) => checkCorrect(r),
	};
	return newHaskellSolution(solution, check, 2);
}

// Wrong answer Haskell solution.
function wrongAnswerHaskell() {
	const solution =
		"module Solution where\n\nsolution :: Int -> Int -> Int\nsolution h w = h + w";
	const check = {
		"haskell area exercise wrong answer status": (r) => r.status === 400,
		"haskell area exercise wrong answer result": (r) => checkWrongAnswer(r),
	};
	return newHaskellSolution(solution, check, 2);
}

// Runtime error Haskell solution.
function runtimeErrorHaskell() {
	const solution =
		"module Solution where\n\nsolution :: Int -> Int -> Int\nsolution h w = h `div` 0";
	const check = {
		"haskell area exercise runtime error status": (r) => r.status === 400,
		"haskell area exercise runtime error result": (r) => checkRuntimeError(r),
	};
	return newHaskellSolution(solution, check, 2);
}

// Compilation error Haskell solution.
function compilationErrorHaskell() {
	const solution =
		"module Solution where\n\nsolution :: Int -> Int -> Int\nsolution h w =";
	const check = {
		"haskell area exercise compilation error status": (r) => r.status === 400,
		"haskell area exercise compilation error result": (r) =>
			checkCompileError(r),
	};
	return newHaskellSolution(solution, check, 2);
}

// Execution timeout Haskell solution.
function executionTimeoutHaskell() {
	const solution =
		"module Solution where\n\nsolution :: Int -> Int -> Int\nsolution h w = solution h w";
	const check = {
		"haskell area exercise execution timeout status": (r) => r.status === 400,
		"haskell area exercise execution timeout result": (r) =>
			checkExecutionTimeout(r),
	};
	return newHaskellSolution(solution, check, 2);
}

// Gets a Python solution attempt from the Area exercise.
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
	const solution = "def solution(h: int, w: int):\n    return h * w";
	const check = {
		"python area exercise correct status": (r) => r.status === 200,
		"python area exercise correct result": (r) => checkCorrect(r),
	};
	return newPythonSolution(solution, check, 2);
}

// Wrong answer Python solution.
function wrongAnswerPython() {
	const solution = "def solution(h: int, w: int):\n    return h + w";
	const check = {
		"python area exercise wrong answer status": (r) => r.status === 400,
		"python area exercise wrong answer result": (r) => checkWrongAnswer(r),
	};
	return newPythonSolution(solution, check, 2);
}

// Runtime error Python solution.
function runtimeErrorPython() {
	const solution = "def solution(h: int, w: int):\n    return h / 0";
	const check = {
		"python area exercise runtime error status": (r) => r.status === 400,
		"python area exercise runtime error result": (r) => checkRuntimeError(r),
	};
	return newPythonSolution(solution, check, 2);
}

// Syntax error Python solution.
function syntaxErrorPython() {
	const solution = "def solution(h: int, w: int)\n    return h";
	const check = {
		"python area exercise syntax error status": (r) => r.status === 400,
		"python area exercise syntax error result": (r) => checkSyntaxError(r),
	};
	return newPythonSolution(solution, check, 2);
}

// Execution timeout Python solution.
function executionTimeoutPython() {
	const solution =
		"def solution(h: int, w: int):\n    while True:\n        h = w + h\n    return h";
	const check = {
		"python area exercise execution timeout status": (r) => r.status === 400,
		"python area exercise execution timeout result": (r) =>
			checkExecutionTimeout(r),
	};
	return newPythonSolution(solution, check, 2);
}
