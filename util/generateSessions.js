import http from "k6/http";
import { check } from "k6";
import { generateRandomString } from "./randomGenerators.js";

export async function createSession(token, classroomId, sessionNumber) {
	const url = `http://localhost:80/v2/classrooms/${classroomId}/session`;

	// Generate session data directly inside this function
	const sessionData = {
		title: generateRandomString(sessionNumber, 30), // Random title
		description: generateRandomString(20), // Random description
		exerciseIds: Array.from({ length: 10 }, (_, i) => i + 1), // [1, 2, ..., 10]
		languageIds: [1, 2], // Static language IDs
	};

	const options = {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	};

	const response = http.post(url, JSON.stringify(sessionData), options);

	// Use k6's check to validate the response
	check(response, {
		"session creation successful": (r) => r.status === 201,
	});

	if (response.status !== 201) {
		console.error(
			`Error creating session for classroom ${classroomId}: ${response.status} - ${response.body}`,
		);
	}
}

export async function createSessionsForAllClassrooms(classroomIds, token) {
	for (const classroomId of classroomIds) {
		for (let i = 0; i < 10; i++) {
			createSession(token, classroomId, i); // Create session
		}
	}
}

export async function createExercises(exercises, token) {
	const url = "http://localhost:80/v1/exercises";

	// Iterate over the exercises array and send a POST request for each
	for (const exercise of exercises) {
		// Set up the request options
		const options = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`, // Pass the token for authorization
			},
		};

		// Send the POST request for each exercise
		const response = http.post(url, JSON.stringify(exercise), options);

		// Use k6's check to validate the response
		check(response, {
			"exercise creation successful": (r) => r.status === 201,
		});

		if (response.status !== 201) {
			console.error("Error creating exercise:", response.status, response.body);
		}
	}
}
