import http from "k6/http";
import { SharedArray } from "k6/data";
import { check, sleep } from "k6";
import { getExercise } from "../exercises/exercise.js";
import { generateSetup } from "../util/setup.js";

export const options = {
	stages: [
		{ duration: "1m", target: 200 },
		{ duration: "5m", target: 200 },
		{ duration: "1m", target: 0 },
	],
};

const data = new SharedArray("users", generateSetup(200, 2));

export default function () {
	const user = data[__VU];
	let exercise = getExercise();
	const url = `http://localhost:80/v2/exercises/${exercise.payload.exerciseId}/submission`;
	const params = {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${user.userId}`,
		},
	};
	delete exercise.payload.exerciseId;
	exercise.payload.sessionId = user.sessionId;

	const res = http.post(url, JSON.stringify(exercise.payload), params);
	console.log("body: " + res.body);
	check(res, solution.check);
	sleep(30);
}
