console.log("user js")

var userName = "John Doe";
var userAge = 25;
// module.exports = userName;
// module.exports = userAge;
const getUserData = () => {
    console.log("user data")
}

module.exports = {
    userName,   userAge,
    getUserData
}
// module.exports = getUserData;