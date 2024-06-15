const userSchema = require("../models/UserModel");
const roleSchema = require("../models/RoleModel");
const mailutil = require("../utils/MailUtils");
const tokenUtil = require("../utils/TokenUtil");
const encrypt = require("../utils/encrypt");
//db.users.find()
//userSchema.find()

const getAllUsers = async (req, res) => {
  //db.Users.find()
  const users = await userSchema.find().populate("role");
  res.json({
    message: "Users fetched...",
    data: users,
  });
};
const getUserByNameFileter = async (req, res) => {
  const name = req.params.name;
  const user = await userSchema.find({ name: name });
  console.log("user...", user);

  if (user && user.length > 0) {
    res.json({
      message: "User fetched...",
      data: user,
    });
  } else {
    res.json({
      message: "User not found!!!",
    });
  }
};

const getUserById = async (req, res) => {
  const id = req.params.id;
  console.log(id);

  const user = await userSchema.findById(id);
  console.log("user...", user);
  res.json({
    message: "User fetched...",
    data: user,
  });
};

const getUserByAge = async (req, res) => {
  //insted of req.params we will use req.query
  console.log("req query..", req.query);
  const age = req.query.age;
  const user = await userSchema.find({ age: age });
  //if else...
  res.json({
    message: "User fetched...",
    data: user,
  });
};

const addUser = async (req, res) => {
  const hashedPassword = await encrypt.encryptPassword(req.body.password);

  try {
    const userObj = {
      name: req.body.name,
      email: req.body.email,
      age: req.body.age,
      role: req.body.role,
      password: hashedPassword,
    };
    const user = await userSchema.create(userObj);

    const otp = Math.floor(1000 + Math.random() * 9000);
    //await mailutil.sendingMail(user.email, "OTP VERIFACTION", otp);
    //email,otp
    //otpschem.create({ email: user.email, otp: otp });

    res.status(201).json({
      message: "User added",
      data: user,
    });
  } catch (err) {
    res.status(400).json({
      message: "Failed to add user",
      error: err,
    });
  }
};

const deleteUser = async (req, res) => {
  const id = req.params.id; //id from url which we want to delete
  try {
    const deletedUser = await userSchema.findByIdAndDelete(id);
    if (deletedUser == null) {
      res.status(404).json({
        message: "User not found",
      });
    } else {
      res.json({
        message: "User deleted",
        data: deletedUser,
      });
    }
  } catch (err) {
    res.status(400).json({
      message: "Failed to delete user",
      error: err,
    });
  }
};

const updateUser = async (req, res) => {
  //update user set =? ,? where id = ?
  const id = req.params.id; //id from url which we want to update
  const updateObj = req.body; //data from client which we want to update

  //{new:true} --> return updated document
  try {
    const updatedUser = await userSchema.findByIdAndUpdate(id, updateObj, {
      new: true,
    });
    if (updatedUser == null) {
      res.status(404).json({
        message: "User not found",
      });
    } else {
      res.json({
        message: "User updated",
        data: updatedUser,
      });
    }
  } catch (err) {
    res.status(400).json({
      message: "Failed to update user",
      error: err,
    });
  }
};

const softDeleteUser = async (req, res) => {
  const id = req.params.id; //id from url which we want to delete

  try {
    const updatedUser = await userSchema.findByIdAndUpdate(
      id,
      { status: false },
      { new: true }
    );
    res.status(200).json({
      message: "User deleted",
      data: updatedUser,
    });
  } catch (err) {
    res.status(400).json({
      message: "Failed to delete user",
      error: err,
    });
  }
};

// const loginUser = async (req, res) => {
//   const userEmail = req.body.email;
//   const userPassword = req.body.password;

//   try {
//     const user = await userSchema.findOne({
//       email: userEmail,
//       password: userPassword,
//     });
//     if (user) {
//       const token = tokenUtil.generateToken(user.toObject());
//       res.status(200).json({
//         message: "User logged in",
//         token: token,
//       });
//     } else {
//       res.status(404).json({
//         message: "User not found",
//       });
//     }
//   } catch (err) {}
// };

const loginUser = async (req, res) => {
  const userEmail = req.body.email;
  const userPassword = req.body.password; //plain text password

  const userFromEmail = await userSchema.findOne({ email: userEmail });
  if (userFromEmail) {
    const isMatch = await encrypt.comparePassword(
      userPassword,
      userFromEmail.password
    );
    if (isMatch) {
      const token = tokenUtil.generateToken(userFromEmail.toObject());
      res.status(200).json({
        message: "User logged in",
        token: token,
      });
    } else {
      res.status(400).json({
        mFessage: "Invalid Password",
      });
    }
  } else {
    res.status(404).json({
      message: "User not found",
    });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  getUserByNameFileter,
  getUserByAge,
  addUser,
  deleteUser,
  updateUser,
  softDeleteUser,
  loginUser,
};
