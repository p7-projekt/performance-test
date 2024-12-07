const fetch = require('node-fetch');
const { generateRandomString } = require('./randomGenerators.js');


module.exports = { createSessionsForAllClassrooms };

async function createSession(token, classroomId, sessionNumber) {
    const url = `http://localhost:80/v2/classrooms/${classroomId}/session`;
  
    // Generate session data directly inside this function
    const sessionData = {
      title: generateRandomString(sessionNumber, 30), // Random title
      description: generateRandomString(20), // Random description
      exerciseIds: Array.from({ length: 10 }, (_, i) => i + 1), // [1, 2, ..., 10]
      languageIds: [1, 2], // Static language IDs
    };

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(sessionData),
    };

    const response = await fetch(url, options);

    try {
      if (!response.ok) {
        throw new Error(`Failed to create session. Status: ${response.text()}`);
      }
    } catch (error) {
		throw new Error(`Error creating session for classroom ${classroomId}:`, error);
    }
  }

  async function createSessionsForAllClassrooms(classroomIds, token) {
  
    for (const classroomId of classroomIds) {
      for (let i = 0; i < 10; i++) {
        await createSession(token, classroomId, i); // Create session
      }
    }
  }