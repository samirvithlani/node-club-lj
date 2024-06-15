const bcrypt = require('bcrypt');

const encryptPassword = async (password) => {

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
}
const comparePassword = async(password,hasedPassword)=>{

    const isMatch = await bcrypt.compare(password,hasedPassword);
    return isMatch;

}
module.exports = {
    encryptPassword,
    comparePassword
}
