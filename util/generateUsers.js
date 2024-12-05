import http from "k6/http";
import { check } from "k6";
import { generateRandomEmail, generatePassword } from "./randomGenerators.js";

export async function login(email, password) {
	const url = "http://localhost:80/login";

	const options = {
		headers: {
			"Content-Type": "application/json",
		},
	};

	const payload = JSON.stringify({ email, password });

	const response = http.post(url, payload, options);

	// Check if the login was successful
	check(response, {
		"login successful": (r) => r.status === 200,
	});

	if (response.status === 200) {
		const data = JSON.parse(response.body);
		return data.token; // Return the token
	} else {
		throw new Error(`Login failed:${response.status} - ${response.body}`);
	}
}

export async function createRandomUsers(numberOfUsers) {
	const results = [];
	let count = 50;
	for (let i = 1; i <= numberOfUsers; i++) {
		results.push(await createRandomUser(i));
		if (i > count) {
			console.log("Created users:", count);
			count += 50;
		}
	}
	return results;
}

export async function createRandomUser(number) {
	const url = "http://localhost:80/register"; // Update to correct k9s service
	const email = generateRandomEmail(number);
	const password = generatePassword();
	const confirmPassword = password;

	const payload = JSON.stringify({
		email,
		password,
		confirmPassword,
		name: `User ${Math.random().toString(36).substring(2, 8)}`,
	});

	const options = {
		headers: { "Content-Type": "application/json" },
	};

	const response = http.post(url, payload, options);

	// Check if registration was successful
	check(response, {
		"registration successful": (r) => r.status === 200,
	});

	if (response.status === 200) {
		return login(email, password);
	} else {
		throw new Error(`Registration failed:${response.status} - ${response.body}`);
	}
}
