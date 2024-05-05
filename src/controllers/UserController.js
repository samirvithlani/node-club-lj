const userSchema = require("../models/UserModel");
//db.users.find()
//userSchema.find()

const getAllUsers = async (req, res) => {
  //db.Users.find()
  const users = await userSchema.find();
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
  // const user = req.body;
  // console.log(user)

  // res.json({
  //     message:"ok.."
  // })

  try {
    const user = await userSchema.create(req.body);
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

module.exports = {
  getAllUsers,
  getUserById,
  getUserByNameFileter,
  getUserByAge,
  addUser,
  deleteUser,
  updateUser,
};
