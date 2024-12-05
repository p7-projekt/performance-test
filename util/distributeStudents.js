import http from 'k6/http';
import { check } from 'k6';

export async function distributeStudentsToSessions(studentTokens, classroomIds, adminToken) {
  const classroomData = [];

  // Fetch classroom details including room codes and sessions
  for (const classroomId of classroomIds) {
    try {
      const token = adminToken;
      const data = fetchClassroomDetails(token, classroomId);
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
      joinClassroom(studentToken, roomCode);
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

export async function fetchClassroomDetails(token, classroomId) {
  const url = `http://10.92.1.109:5015/v2/classrooms/${classroomId}`;

  const options = {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  };

  const response = http.get(url, options);

  // Check if the classroom details were fetched successfully
  check(response, {
    'classroom details fetched successfully': (r) => r.status === 200,
  });

  if (response.status === 200) {
    return JSON.parse(response.body); // Return the classroom data
  } else {
    console.error(`Error fetching classroom ${classroomId} details:`, response.status, response.body);
    throw new Error(`Error fetching classroom details`);
  }
}

export async function joinClassroom(token, roomCode) {
  const url = 'http://10.92.1.109:5015/join';
  const payload = JSON.stringify({ code: roomCode, name: `Student${token}` });

  const options = {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };

  const response = http.post(url, payload, options);

  // Check if the student joined the classroom successfully
  check(response, {
    'student joined classroom successfully': (r) => r.status === 200,
  });

  if (response.status !== 200) {
    console.error(`Failed to join classroom with room code ${roomCode}:`, response.status, response.body);
  }
}
