module.exports = { generateRandomEmail, generateRandomPassword, generateRandomString };

function generateRandomEmail(number) {
    return `Testuser${number}@test.dk`;
  }

  function generateRandomPassword() {
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const specialChars = '!@#$%?';
    const allChars = uppercase + lowercase + numbers + specialChars;
  
    const getRandomChar = (str) => str[Math.floor(Math.random() * str.length)];
  
    let password = '';
    password += getRandomChar(uppercase);      // Add uppercase letter
    password += getRandomChar(lowercase);      // Add lowercase letter
    password += getRandomChar(numbers);       // Add a number
    password += getRandomChar(specialChars);  // Add a special character
  
    for (let i = password.length; i < 8; i++) {
      password += getRandomChar(allChars);
    }
  
    return password;
  }

  function generateRandomString(num, length) {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += letters[Math.floor(Math.random() * letters.length)];
    }
    return result += `${num}`;
  }