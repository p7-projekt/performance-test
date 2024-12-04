import fetch from 'node-fetch';
async function createSession(token, classroomId, sessionNumber) {
    const url = `http://localhost:5015/v2/classrooms/${classroomId}/session`;
  
    // Generate session data directly inside this function
    const sessionData = {
      title: generateRandomString(sessionNumber, 60), // Random title
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
  
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`Failed to create session. Status: ${response.status}`);
      }
      const data = await response.json();
      console.log(`Session created for classroom ${classroomId}:`, data);
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