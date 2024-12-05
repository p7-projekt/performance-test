export function getExercises() {
	let exercises = [
		absoluteValue(), // id 0 (increasing)
		area(),
		doubleString(),
		equalStrings(),
		palindrome(),
		reverse(),
		signDetector(),
		squareNumber(),
		stringLength(),
		vowelCount(),
	];

	return exercises;
}

function absoluteValue() {
	return {
		name: "Absolute Value of an Integer",
		description: "Compute the absolute value of a provided integer.",
		solution:
			"def solution(n: int):\n    if n < 0:\n        return n * (-1)\n    else:        return n",
		solutionLanguage: 2,
		inputParameterType: ["int"],
		outputParameterType: ["int"],
		testCases: [
			{
				inputParams: ["-5"],
				outputParams: ["5"],
				publicVisible: true,
			},
			{
				inputParams: ["0"],
				outputParams: ["0"],
				publicVisible: true,
			},
			{
				inputParams: ["5"],
				outputParams: ["5"],
				publicVisible: true,
			},
		],
	};
}

function area() {
	return {
		name: "Area of a Square",
		description: "Compute the area of a square.",
		solution: "def solution(h: int, w: int):\n    return h * w",
		solutionLanguage: 2,
		inputParameterType: ["int", "int"],
		outputParameterType: ["int"],
		testCases: [
			{
				inputParams: ["5", "20"],
				outputParams: ["100"],
				publicVisible: true,
			},
			{
				inputParams: ["0", "5"],
				outputParams: ["0"],
				publicVisible: true,
			},
			{
				inputParams: ["1", "1"],
				outputParams: ["1"],
				publicVisible: true,
			},
		],
	};
}

function doubleString() {
	return {
		name: "Double a String",
		description: "Given a string return it doubled.",
		solution: "def solution(s: str):\n    return s + s",
		solutionLanguage: 2,
		inputParameterType: ["string"],
		outputParameterType: ["string"],
		testCases: [
			{
				inputParams: [""],
				outputParams: [""],
				publicVisible: true,
			},
			{
				inputParams: ["hello"],
				outputParams: ["hellohello"],
				publicVisible: true,
			},
			{
				inputParams: ["a"],
				outputParams: ["aa"],
				publicVisible: true,
			},
		],
	};
}

function equalStrings() {
	return {
		name: "Equal Strings",
		description: "Check if two strings are equal",
		solution: "def solution(s1: str, s2: str):\n    return s == s",
		solutionLanguage: 2,
		inputParameterType: ["string", "string"],
		outputParameterType: ["bool"],
		testCases: [
			{
				inputParams: ["", ""],
				outputParams: ["true"],
				publicVisible: true,
			},
			{
				inputParams: ["hello", "world"],
				outputParams: ["false"],
				publicVisible: true,
			},
			{
				inputParams: ["a", "a"],
				outputParams: ["false"],
				publicVisible: true,
			},
			{
				inputParams: ["world", "world"],
				outputParams: ["true"],
				publicVisible: true,
			},
		],
	};
}

function palindrome() {
	return {
		name: "Palindrome",
		description: "Check if a string is a palindrome",
		solution: "def solution(s: str):\n    return s == s[::-1]",
		solutionLanguage: 2,
		inputParameterType: ["string"],
		outputParameterType: ["bool"],
		testCases: [
			{
				inputParams: ["regninger"],
				outputParams: ["true"],
				publicVisible: true,
			},
			{
				inputParams: ["hello"],
				outputParams: ["false"],
				publicVisible: true,
			},
			{
				inputParams: [""],
				outputParams: ["true"],
				publicVisible: true,
			},
		],
	};
}

function reverse() {
	return {
		name: "Reverse a String",
		description: "Given a string return it reversed.",
		solution: "def solution(s: str):\n    return s[::-1]",
		solutionLanguage: 2,
		inputParameterType: ["string"],
		outputParameterType: ["string"],
		testCases: [
			{
				inputParams: [""],
				outputParams: [""],
				publicVisible: true,
			},
			{
				inputParams: ["hello"],
				outputParams: ["olleh"],
				publicVisible: true,
			},
			{
				inputParams: ["regninger"],
				outputParams: ["regninger"],
				publicVisible: true,
			},
		],
	};
}

function signDetector() {
	return {
		name: "Sign Detector",
		description: "Figure out if an integer is signed, unsigned or zero",
		solution:
			'def solution(n: int):\n    return "positive" if n > 0 else "negative" if n < 0 else "zero"',
		solutionLanguage: 2,
		inputParameterType: ["int"],
		outputParameterType: ["string"],
		testCases: [
			{
				inputParams: ["5"],
				outputParams: ["positive"],
				publicVisible: true,
			},
			{
				inputParams: ["-5"],
				outputParams: ["negative"],
				publicVisible: true,
			},
			{
				inputParams: ["0"],
				outputParams: ["zero"],
				publicVisible: true,
			},
		],
	};
}

function squareNumber() {
	return {
		name: "Square Number",
		description: "Compute the square of a number",
		solution: "def solution(n: int):\n    return n * n",
		solutionLanguage: 2,
		inputParameterType: ["int"],
		outputParameterType: ["int"],
		testCases: [
			{
				inputParams: ["5"],
				outputParams: ["25"],
				publicVisible: true,
			},
			{
				inputParams: ["0"],
				outputParams: ["0"],
				publicVisible: true,
			},
			{
				inputParams: ["-5"],
				outputParams: ["25"],
				publicVisible: true,
			},
		],
	};
}

function stringLength() {
	return {
		name: "String Length",
		description: "Compute the length of a string",
		solution: "def solution(s: str):\n    return len(s)",
		solutionLanguage: 2,
		inputParameterType: ["string"],
		outputParameterType: ["int"],
		testCases: [
			{
				inputParams: ["hello"],
				outputParams: ["5"],
				publicVisible: true,
			},
			{
				inputParams: [""],
				outputParams: ["0"],
				publicVisible: true,
			},
			{
				inputParams: ["a"],
				outputParams: ["1"],
				publicVisible: true,
			},
		],
	};
}

function vowelCount() {
	return {
		name: "Vowel Count",
		description: "Count the vowels in a string",
		solution:
			"def solution(s: str):\n    return sum(c in 'aeiouAEIOU' for c in s)",
		solutionLanguage: 2,
		inputParameterType: ["string"],
		outputParameterType: ["int"],
		testCases: [
			{
				inputParams: ["hello"],
				outputParams: ["2"],
				publicVisible: true,
			},
			{
				inputParams: ["HELLO"],
				outputParams: ["2"],
				publicVisible: true,
			},
			{
				inputParams: [""],
				outputParams: ["0"],
				publicVisible: true,
			},
		],
	};
}
