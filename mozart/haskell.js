import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  // Scaling up to 20 requests per second.
  stages: [
    // It spends 20 seconds to reach 2 VUs meaning it scales linear.
    { duration: "20s", target: 2 },
    { duration: "20s", target: 3 },
    { duration: "20s", target: 4 },
    { duration: "20s", target: 5 },
    { duration: "20s", target: 6 },
    { duration: "20s", target: 7 },
    { duration: "20s", target: 8 },
    { duration: "20s", target: 9 },
    { duration: "20s", target: 10 },
    { duration: "20s", target: 11 },
    { duration: "20s", target: 12 },
    { duration: "20s", target: 13 },
    { duration: "20s", target: 14 },
    { duration: "20s", target: 15 },
    { duration: "20s", target: 16 },
    { duration: "20s", target: 17 },
    { duration: "20s", target: 18 },
    { duration: "20s", target: 19 },
    { duration: "20s", target: 20 },
    // This means that it also runs 20 seconds at 20 VUs instead of just reaching 20 and exiting.
    { duration: "20s", target: 20 },
  ],
};

export default function() {
  const url = "http://localhost:8080/submit";
  const solution = getSolution();
  const params = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const res = http.post(url, JSON.stringify(solution.payload), params);
  console.log("body: " + res.body);
  check(res, solution.check);
  sleep(1);
}

// Helper to check whether a value is within a specific range.
function inRange(value, min, max) {
  return value >= min && value <= max;
}

// Get a solution to send to Mozart.
//
// Returns a JSON payload for the request, and a check for the result of the request.
function getSolution() {
  // Generates number n, where 0 <= n < 1.
  const number = Math.random();

  switch (true) {
    case inRange(number, 0, 0.49):
      return absoluteValueExercise();
    default:
      return stringLengthExercise();
  }
}

function stringLengthExercise() {
  let solution = "";
  let check = {};
  const number = Math.random();

  // The probability splits are as follows:
  // -            runtime error: 5%
  // -        execution timeout: 5%
  // - compilation/syntax error: 5%
  // -             wrong answer: 35%
  // -           correct answer: 50%
  switch (true) {
    // runtime error
    case inRange(number, 0, 0.04):
      solution = "module Solution where\n\nsolution :: String -> Int\nsolution s = 1 + solution (head s)";
      check = {
        "status": r => r.status === 400,
        "result": r => r.json().result === "failure" && r.json().testCases.some(testCase => testCase.testResult.cause === "runtimeError"),
      };
      break;
    // execution timeout
    case inRange(number, 0.05, 0.09):
      solution = "module Solution where\n\nsolution :: Int -> Int\nsolution s = solution s";
      check = {
        "status": r => r.status === 400,
        "error": r => r.json().error.startsWith("execution exceeded the timeout limit of"),
      };
      break;
    // compilation error
    case inRange(number, 0.10, 0.14):
      solution = "module Solution where\n\nsolution :: String -> Int\nsolution s =";
      check = {
        "status": r => r.status === 400,
        "error": r => r.json().error.startsWith("an error occurred during compilation"),
      };
      break;
    // wrong answer
    case inRange(number, 0.15, 0.50):
      solution = "module Solution where\n\nsolution :: String -> Int\nsolution [] = 0\nsolution s = 0 + solution (tail s)";
      check = {
        "status": r => r.status === 400,
        "result": r => r.json().result === "failure" && r.json().testCases.some(testCase => testCase.testResult.cause === "wrongAnswer"),
      };
      break;
    // correct
    default:
      solution = "module Solution where\n\nsolution :: String -> Int\nsolution [] = 0\nsolution s = 1 + solution (tail s)";
      check = {
        "status": r => r.status === 200,
        "result": r => r.json().result === "pass",
      };
  }

  return {
    payload: {
      solution,
      testCases: [
        {
          id: 0,
          inputParameters: [
            {
              valueType: "string",
              value: "hello",
            },
          ],
          outputParameters: [
            {
              valueType: "int",
              value: "5",
            },
          ],
        },
        {
          id: 1,
          inputParameters: [
            {
              valueType: "string",
              value: "a",
            },
          ],
          outputParameters: [
            {
              valueType: "int",
              value: "1",
            },
          ],
        },
        {
          id: 2,
          inputParameters: [
            {
              valueType: "string",
              value: "",
            },
          ],
          outputParameters: [
            {
              valueType: "int",
              value: "0",
            },
          ],
        },
        {
          id: 4,
          inputParameters: [
            {
              valueType: "string",
              value: "abcdefghijklmnopqrstuwvxyz",
            },
          ],
          outputParameters: [
            {
              valueType: "int",
              value: "26",
            },
          ],
        },
      ],
    },
    check,
  }
}

function absoluteValueExercise() {
  let solution = "";
  let check = {};
  const number = Math.random();

  // The probability splits are as follows:
  // -            runtime error: 5%
  // -        execution timeout: 5%
  // - compilation/syntax error: 5%
  // -             wrong answer: 35%
  // -           correct answer: 50%
  switch (true) {
    // runtime error
    case inRange(number, 0, 0.04):
      solution = "module Solution where\n\nsolution :: Int -> Int\nsolution n = n `div` 0";
      check = {
        "status": r => r.status === 400,
        "result": r => r.json().result === "failure" && r.json().testCases.some(testCase => testCase.testResult.cause === "runtimeError"),
      };
      break;
    // execution timeout
    case inRange(number, 0.05, 0.09):
      solution = "module Solution where\n\nsolution :: Int -> Int\nsolution n = solution n";
      check = {
        "status": r => r.status === 400,
        "error": r => r.json().error.startsWith("execution exceeded the timeout limit of"),
      };
      break;
    // compilation error
    case inRange(number, 0.10, 0.14):
      solution = "module Solution where\n\nsolution :: Int -> Int\nsolution n =";
      check = {
        "status": r => r.status === 400,
        "error": r => r.json().error.startsWith("an error occurred during compilation"),
      };
      break;
    // wrong answer
    case inRange(number, 0.15, 0.50):
      solution = "module Solution where\n\nsolution :: Int -> Int\nsolution n = n";
      check = {
        "status": r => r.status === 400,
        "result": r => r.json().result === "failure" && r.json().testCases.some(testCase => testCase.testResult.cause === "wrongAnswer"),
      };
      break;
    // correct
    default:
      solution = "module Solution where\n\nsolution :: Int -> Int\nsolution n =\n  if n < 0\n    then n * (-1)\n    else n";
      check = {
        "status": r => r.status === 200,
        "result": r => r.json().result === "pass",
      };
  }

  return {
    payload: {
      solution,
      testCases: [
        {
          id: 0,
          inputParameters: [
            {
              valueType: "int",
              value: "5",
            },
          ],
          outputParameters: [
            {
              valueType: "int",
              value: "5",
            },
          ],
        },
        {
          id: 1,
          inputParameters: [
            {
              valueType: "int",
              value: "0",
            },
          ],
          outputParameters: [
            {
              valueType: "int",
              value: "0",
            },
          ],
        },
        {
          id: 2,
          inputParameters: [
            {
              valueType: "int",
              value: "-5",
            },
          ],
          outputParameters: [
            {
              valueType: "int",
              value: "5",
            },
          ],
        },
        {
          id: 4,
          inputParameters: [
            {
              valueType: "int",
              value: "-100000",
            },
          ],
          outputParameters: [
            {
              valueType: "int",
              value: "100000",
            },
          ],
        },
      ],
    },
    check,
  }
}
