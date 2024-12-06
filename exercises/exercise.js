import { absoluteValueExercise } from "./absoluteValue.js";
import { stringLengthExercise } from "./stringLength.js";
import { doubleStringExercise } from "./doubleString.js";
import { squareNumberExercise } from "./squareNumber.js";
import { palindromeExercise } from "./palindrome.js";
import { vowelCountExercise } from "./vowelCount.js";
import { reverseExercise } from "./reverse.js";
import { areaExercise } from "./area.js";
import { equalStringsExercise } from "./equalStrings.js";
import { signDetectorExercise } from "./signDetector.js";

export function newHaskellSolution(solution, check, exerciseId) {
	return {
		payload: {
			solution,
			exerciseId,
			languageId: 1,
		},
		check,
	};
}

export function newPythonSolution(solution, check, exerciseId) {
	return {
		payload: {
			solution,
			exerciseId,
			languageId: 2,
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
		case inRange(number, 0.1, 0.19):
			return stringLengthExercise();
		case inRange(number, 0.2, 0.29):
			return squareNumberExercise();
		case inRange(number, 0.3, 0.39):
			return doubleStringExercise();
		case inRange(number, 0.4, 0.49):
			return palindromeExercise();
		case inRange(number, 0.5, 0.59):
			return vowelCountExercise();
		case inRange(number, 0.6, 0.69):
			return reverseExercise();
		case inRange(number, 0.7, 0.79):
			return areaExercise();
		case inRange(number, 0.8, 0.89):
			return equalStringsExercise();
		default:
			return signDetectorExercise();
	}
}

// Checks a correct solutions response.
export function checkCorrect(response) {
	return response.body.length === 0;
}

// Checks a wrong answer solutions response.
export function checkWrongAnswer(response) {
	const json = JSON.parse(response.json());
	let wrongAnswer = false;

	console.log("WRONG ANSWER CHECK: " + json.testCaseResults);

	for (let i = 0; i < json.testCaseResults.length; i++) {
		let testCase = json.testCaseResults[i];
		if (testCase.cause === "wrongAnswer") {
			wrongAnswer = true;
			break;
		}
	}

	return json.result === "failure" && wrongAnswer;
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
