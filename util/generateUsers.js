const fetch = require('node-fetch');
const { generateRandomEmail, generatePassword } = require('./randomGenerators.js');


module.exports = { login, createRandomUsers };

async function createRandomUsers(numberOfUsers){
    const results = []
    for (let i = 1; i <= numberOfUsers; i++) {
        results.push(await createRandomUser(i));
    }
    return results;
}

async function createRandomUser(number) {
    const url = 'http://localhost:5015/register'; //we need to update to correct k9s service
    const email = generateRandomEmail(number);
    const password = generatePassword();
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
  
    const response = await fetch(url, options);
    if(response.status === 200){
      return await (login(email, password));
    }
    else
    console.error("register failed");
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
      return data.token; // Return the token
    } catch (error) {
      console.error('Error during login:', error);
      throw error; // Re-throw the error for upstream handling
    }
  }