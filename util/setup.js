const { login, createRandomUsers } = require('./generateUsers');
const { generateRandomClassrooms } = require('./generateClassrooms');
const { createSessionsForAllClassrooms } = require('./generateSessions');
const { getExercises} = require('./generateExercise');

module.exports = { generateSetup };

async function generateSetup(numberOfUsers, numberOfClassrooms){
    token = await login("admin@p7.dk", "Admin!1234");
    let userIds = []
    userIds = await createRandomUsers(numberOfUsers);
    console.log("User ids collected");
	let exercises = getExercises();
	await createExercises(exercises, token);
    //Generate classrooms
    const classRoomIds = await generateRandomClassrooms(numberOfClassrooms, token)
    console.log("ClassRooms created")
    //Generate sessions on classrooms
    await createSessionsForAllClassrooms(classRoomIds, token);
    console.log("Sessions in classrooms created");
    return await distributeStudentsToSessions(userIds, classRoomIds, token);
}

async function fetchClassroomDetails(token, classroomId) {
    const url = `http://localhost:80/v2/classrooms/${classroomId}`;
  
    const options = {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    };
  
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json(); // Return the classroom data
    } catch (error) {
      console.error(`Error fetching classroom ${classroomId} details:`, error);
      throw error;
    }
  }
  

  async function joinClassroom(token, roomCode) {
    const url = 'http://localhost:80/join';
    const options = {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code: roomCode, name: `Student${token}` }),
    };
  
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`Failed to join classroom. Status: ${response.status}`);
      }
    } catch (error) {
      console.error(`Error joining classroom with room code ${roomCode}:`, error);
    }
  }
  
  async function distributeStudentsToSessions(studentTokens, classroomIds, adminToken) {
    const classroomData = [];
  
    // Fetch classroom details including room codes and sessions
    for (const classroomId of classroomIds) {
      try {
        const token = adminToken;
        const data = await fetchClassroomDetails(token, classroomId);
        classroomData.push({
          classroomId,
          roomCode: data.roomcode,
          sessions: data.sessions.map(session => session.id),
        });
      } catch (error) {
        console.error(`Failed to fetch details for classroom ${classroomId}`);
      }
    }
  
    const assignments = []; // Array to store the userId and sessionId assignments
  
    // Distribute students across classrooms
    const studentGroups = Array.from({ length: classroomIds.length }, () => []);
    studentTokens.forEach((token, index) => {
      const groupIndex = index % classroomIds.length;
      studentGroups[groupIndex].push(token);
    });
  
    // Distribute students across sessions within each classroom
    for (let i = 0; i < classroomIds.length; i++) {
      const { classroomId, roomCode, sessions } = classroomData[i] || {};
  
      if (!roomCode || !sessions || sessions.length === 0) {
        console.error(`No valid room code or sessions for classroom ${classroomId}`);
        continue;
      }
  
      const studentsInGroup = studentGroups[i];
  
      // Make students join the classroom
      for (const studentToken of studentsInGroup) {
        await joinClassroom(studentToken, roomCode);
      }
  
      // Distribute the students evenly across sessions
      const sessionGroups = Array.from({ length: sessions.length }, () => []);
      studentsInGroup.forEach((token, index) => {
        const groupIndex = index % sessions.length;
        sessionGroups[groupIndex].push(token);
      });
  
      // Assign students to their sessions
      for (let j = 0; j < sessions.length; j++) {
        const sessionId = sessions[j];
        const studentsInSession = sessionGroups[j];
  
        for (const studentToken of studentsInSession) {
          assignments.push({ userId: studentToken, sessionId });
        }
      }
    }
  
    return assignments;
  }

  async function createExercises(exercises, token) {
	const url = "http://localhost:80/v1/exercises";
  
	// Iterate over the exercises array and send a POST request for each
	for (const exercise of exercises) {
	  try {
		// Set up the request options
		const options = {
		  method: 'POST',
		  headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`, // Pass the token for authorization
		  },
		  body: JSON.stringify(exercise), // Convert the exercise object to a JSON string
		};
  
		// Send the POST request for each exercise using node-fetch
		const response = await fetch(url, options);
  
		// Check if the exercise creation was successful
		if (!response.ok) {
		  const errorText = await response.text(); // Get the error response text
		  throw new Error(`Error creating exercise: ${response.status} - ${errorText}`);
		}
  
	  } catch (error) {
		console.error(`Error: ${error.message}`);
		throw error;
	  }
	}
  }