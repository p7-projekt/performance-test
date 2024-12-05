const fetch = require('node-fetch');
const { generateRandomString } = require('./randomGenerators.js');


module.exports = { createSessionsForAllClassrooms, createExercises };

async function createSession(token, classroomId, sessionNumber) {
    const url = `http://localhost:5015/v2/classrooms/${classroomId}/session`;
  
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
      console.error(`Error creating session for classroom ${classroomId}:`, error);
    }
  }

  async function createSessionsForAllClassrooms(classroomIds, token) {
  
    for (const classroomId of classroomIds) {
      for (let i = 0; i < 10; i++) {
        await createSession(token, classroomId, i); // Create session
      }
    }
  }

  async function createExercises(exercises, token) {
    const url = 'http://localhost:5015/v1/exercises';
  
    // Iterate over the exercises array and send a POST request for each
    for (const exercise of exercises) {
      // Set up the request options
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`  // Pass the token for authorization
        },
        body: JSON.stringify(exercise)  // Automatically stringify the object
      };
  
      // Send the POST request for each exercise
      try {
        const response = await fetch(url, options);
  
        if (!response.ok) {
          const errorBody = await response.text();
          console.error('Error creating exercise:', errorBody);
          throw new Error(`Request failed with status: ${response.status}`);
        }
      } catch (error) {
        console.error('Error:', error.message);
      }
    }
  }