import fetch from 'node-fetch';
async function generateRandomClassrooms(numberOfClassrooms, token){
  for (let i = 1; i <= numberOfClassrooms; i++) {
    console.log(`Processing classroom ${i}`);
    createRandomClassroom(i, token);
  }
  return fetchClassroomIds(token);
}

async function createRandomClassroom(classNumber, token) {
    const url = 'http://localhost:5015/v2/classrooms';
    const title = generateRandomString(classNumber, 60); // Title longer than 10 characters
    const description = generateRandomString(classNumber, 20); // Description longer than 10 characters
  
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Add Bearer token for authorization
      },
      body: JSON.stringify({
        title,
        description,
      }),
    };
    try {
        const response = await fetch(url, options);
        const data = await response.json();
        console.log('Classroom created successfully:', data);
      } catch (error) {
        console.error('Error creating classroom:', error);
    }
}

async function fetchClassroomIds(token) {
  const url = 'http://localhost:5015/v2/classrooms';

  const options = {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`, // Add Bearer token for authorization
    },
  };

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const classrooms = await response.json();
    const ids = classrooms.map((classroom) => classroom.id);
    return ids;
  } catch (error) {
    console.error('Error fetching classroom IDs:', error);
  }
}
