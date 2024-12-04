import fetch from 'node-fetch';

async function createRandomUsers(numberOfUsers){
    const results = []
    for (let i = 1; i <= numberOfUsers; i++) {
        console.log(`Processing user ${i}`);
        results.push(createRandomUser(i));
    }
}

async function createRandomUser(number) {
    const url = 'http://localhost:5015/register'; //we need to update to correct k9s service
    const email = generateRandomEmail(number);
    const password = generateRandomPassword();
    const confirmPassword = password;
  
    const options = {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        email,
        password,
        confirmPassword,
        name: `User ${Math.random().toString(36).substring(2, 8)}`,
      }),
    };
  
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      console.log('User created successfully:', data);
    } catch (error) {
      console.error('Error creating user:', error);
    }
    return (login(email, password));
  }

  async function login(email, password) {
    const url = 'http://localhost:5015/login';
  
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    };
  
    try {
      const response = await fetch(url, options);
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log('Login successful:', data);
      return data.token; // Return the token
    } catch (error) {
      console.error('Error during login:', error);
      throw error; // Re-throw the error for upstream handling
    }
  }