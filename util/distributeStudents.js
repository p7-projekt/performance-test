const fetch = require('node-fetch');

module.exports = { distributeStudentsToSessions };

async function fetchClassroomDetails(token, classroomId) {
    const url = `http://localhost:5015/v2/classrooms/${classroomId}`;
  
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
    const url = 'http://localhost:5015/join';
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
  