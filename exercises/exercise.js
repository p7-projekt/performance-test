import { absoluteValueExercise } from "./absoluteValue.js";
import { stringLengthExercise } from "./stringLength.js";

export function newHaskellSolution(solution, check) {
	return {
		payload: {
			solution,
			languageId: 1,
		},
		check,
	};
}

export function newPythonSolution(solution, check) {
	return {
		payload: {
			solution,
			languageId: 1,
		},
		check,
	};
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
		case inRange(number, 0.1, 0.14):
			return stringLengthExercise();
	}
}

// Checks a correct solutions response.
export function checkCorrect(response) {
	return response.json().result === "pass";
}

// Checks a wrong answer solutions response.
export function checkWrongAnswer(response) {
	return response
		.json()
		.testCaseResults.some((testCase) => testCase.cause === "wrongAnswer");
}

// Checks a runtime error solutions response.
export function checkRuntimeError(response) {
	return (
		response.json().result === "failure" &&
		response
			.json()
			.testCaseResults.some((testCase) => testCase.cause === "runtimeError")
	);
}

// Checks a compile time error solutions response.
export function checkCompileError(response) {
	return (
		response.json().result === "error" &&
		response.json().message.startsWith("an error occurred during compilation")
	);
}

// Checks an execution timeout solutions response.
export function checkExecutionTimeout(response) {
	return (
		response.json().result === "error" &&
		response.json().message === "execution exceeded the timeout limit of 5s"
	);
}

// Checks a syntax error solutions response.
export function checkSyntaxError(response) {
	return (
		response.json().result === "error" &&
		response.json().message.startsWith("an error occured during execution")
	);
}
