import express from "express";
import {
  updateUser,
  deleteUser,
  getUser,
  getAllUsers,
} from "../controllers/user.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

export const router = express.Router();

//check if user is authenticated
/* router.get("/checkauthentication", verifyToken,(req, res, next) => {
  res.status(200).json({ message: "Hello user, you are logged in" });
});

//check user by id
router.get("/checkuser/:id",verifyUser, (req, res, next) => {
  res.status(200).json({ message: "Hello user, you are logged in and you can delete your account" });
});
router.get("/checkadmin/:id",verifyAdmin, (req, res, next) => {
  res.status(200).json({ message: "Hello admin, you are logged in and you can delete all accounts" });
}); */

//UPDATE (PUT)
router.put("/:id", verifyUser, updateUser);

//DELETE    /server/users/:id
router.delete("/:id",verifyUser, deleteUser);

//GET   - one user
router.get("/:id", verifyUser, getUser);

//GET ALL (all users)
router.get("/", verifyAdmin, getAllUsers);

export default router;
