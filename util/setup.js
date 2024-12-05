const { login, createRandomUsers } = require('./generateUsers');
const { generateRandomClassrooms } = require('./generateClassrooms');
const { createSessionsForAllClassrooms, createExercises } = require('./generateSessions');
const { distributeStudentsToSessions } = require('./distributeStudents');


module.exports = { generateSetup };

async function generateSetup(numberOfUsers, numberOfClassrooms){
    token = await login("admin@p7.dk", "Admin!1234");
    let userIds = []
    userIds = await createRandomUsers(numberOfUsers);
    console.log("User ids collected");
    //Insert exercises 
    //await createExercises(exercises, token);
    //Generate classrooms
    const classRoomIds = await generateRandomClassrooms(numberOfClassrooms, token)
    console.log("ClassRooms created")
    //Generate sessions on classrooms
    await createSessionsForAllClassrooms(classRoomIds, token);
    console.log("Sessions in classrooms created");
    return await distributeStudentsToSessions(userIds, classRoomIds, token);
}