import http from 'k6/http';
import { check } from 'k6';
import { generateRandomString } from './randomGenerators.js';

export async function generateRandomClassrooms(numberOfClassrooms, token) {
  for (let i = 1; i <= numberOfClassrooms; i++) {
    createRandomClassroom(i, token);
    activateClassroom(i, token);
  }
  return fetchClassroomIds(token);
}

export async function createRandomClassroom(classNumber, token) {
  const url = 'http://10.92.1.109:5015/v2/classrooms';
  const title = generateRandomString(classNumber, 60); // Title longer than 10 characters
  const description = generateRandomString(classNumber, 20); // Description longer than 10 characters

  const payload = JSON.stringify({
    title,
    description,
  });

  const options = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  };

  const response = http.post(url, payload, options);

  // Check if the classroom was created successfully
  check(response, {
    'classroom created successfully': (r) => r.status === 200,
  });

  if (response.status !== 200) {
    console.error('Error during classroom creation:', response.status, response.body);
  }
}

export async function fetchClassroomIds(token) {
  const url = 'http://10.92.1.109:5015/v2/classrooms';

  const options = {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  };

  const response = http.get(url, options);

  // Check if the classroom IDs were fetched successfully
  check(response, {
    'classroom IDs fetched successfully': (r) => r.status === 200,
  });

  if (response.status === 200) {
    const classrooms = JSON.parse(response.body);
    const ids = classrooms.map((classroom) => classroom.id);
    return ids;
  } else {
    console.error('Error fetching classroom IDs:', response.status, response.body);
  }
}

export async function activateClassroom(classNumber, token) {
  const url = `http://10.92.1.109:5015/v2/classrooms/${classNumber}`;
  const title = generateRandomString(classNumber, 60); // Title longer than 10 characters
  const description = generateRandomString(classNumber, 20); // Description longer than 10 characters
  const registrationOpen = true;

  const payload = JSON.stringify({
    title,
    description,
    registrationOpen,
  });

  const options = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  };

  const response = http.put(url, payload, options);

  // Check if the classroom was activated successfully
  check(response, {
    'classroom activated successfully': (r) => r.status === 200,
  });

  if (response.status !== 200) {
    console.error('Error during classroom activation:', response.status, response.body);
  }
}
