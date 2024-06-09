const jwt = require('jsonwebtoken');
const secret = 'samir';

//payload --> object
const generateToken = (payload) => {

    const token = jwt.sign(payload,secret);
    console.log(token);
    return token;

}


module.exports = {
    generateToken
}
