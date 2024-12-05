import { login, createRandomUsers } from "./generateUsers.js";
import { generateRandomClassrooms } from "./generateClassrooms.js";
import {
	createSessionsForAllClassrooms,
	createExercises,
} from "./generateSessions.js";
import { distributeStudentsToSessions } from "./distributeStudents.js";
import { getExercises } from "./generateExercise.js";

export async function generateSetup(numberOfUsers, numberOfClassrooms) {
	let token = await login("admin@p7.dk", "Admin!1234");
	let userIds = [];
	userIds = await createRandomUsers(numberOfUsers);
	console.log("User ids collected");
	//Insert exercises
	const exercises = getExercises();
	await createExercises(exercises, token);
	//Generate classrooms
	const classRoomIds = await generateRandomClassrooms(
		numberOfClassrooms,
		token,
	);
	console.log("ClassRooms created");
	//Generate sessions on classrooms
	await createSessionsForAllClassrooms(classRoomIds, token);
	console.log("Sessions in classrooms created");
	return await distributeStudentsToSessions(userIds, classRoomIds, token);
}
