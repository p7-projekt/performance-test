import http from "k6/http";
import { check, sleep } from "k6";
import { getExercise } from "../exercises/exercise.js";
import { SharedArray } from "k6/data";

export const options = {
	setupTimeout: "30m",
	stages: [
		{ duration: "1m", target: 200 },
		{ duration: "5m", target: 200 },
		{ duration: "1m", target: 0 },
	],
};

const data = new SharedArray("some name", function () {
	const f = JSON.parse(open("./users.json"));
	return f;
});

export default function () {
	const user = data[__VU];
	let exercise = getExercise();
	console.log(`HERE:${user.userId}, ${exercise.payload.exerciseId}`);
	const url = `http://localhost:80/v2/exercises/${exercise.payload.exerciseId}/submission`;
	const params = {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${user.userId}`,
		},
	};
	delete exercise.payload.exerciseId;
	exercise.payload.sessionId = user.sessionId;
	console.log("dddddd", exercise.payload);
	const res = http.post(url, JSON.stringify(exercise.payload), params);
	console.log("status:", res.status);
	console.log("body: " + res.body);
	check(res, exercise.check);
	sleep(30);
}
