module.exports = {
	generateRandomEmail,
	generatePassword,
	generateRandomString,
};

function generateRandomEmail(number) {
	return `Testuser${number}@test.dk`;
}

function generatePassword() {
	return "Admin!1234";
}

function generateRandomString(num, length) {
	const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
	let result = "";
	for (let i = 0; i < length; i++) {
		result += letters[Math.floor(Math.random() * letters.length)];
	}
	return (result += `${num}`);
}

