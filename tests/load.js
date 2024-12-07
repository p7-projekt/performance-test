import http from "k6/http";
import { check, sleep } from "k6";
import { getExercise } from "../exercises/exercise.js";
import { SharedArray } from "k6/data";

export const options = {
    noConnectionReuse: true,
	setupTimeout: "30m",
	stages: [
		{ duration: "10m", target: 4000 },
		{ duration: "1h", target: 4000 },
		{ duration: "10m", target: 0 },
	],
};

const data = new SharedArray("some name", function () {
	const f = JSON.parse(open("./users.json"));
	return f;
});

export default function () {
	const user = data[__VU - 1];
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
	if (!check(res, exercise.check)) {
		console.error("FAILED CHECK");
	}
	sleep(180);
}