import User from "../models/User.js";

//UPDATE (PUT)
export const updateUser = async (req, res, next) => {
  const id = req.params.id;
  const body = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
};

//DELETE    /api/User/:id
export const deleteUser = async (req, res, next) => {
  const id = req.params.id;
  try {
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: "User deleted" });
  } catch (err) {
    next(err);
  }
};

//GET   - one User
export const getUser = async (req, res, next) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

//GET ALL (all Users)
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};
