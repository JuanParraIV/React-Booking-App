import express from "express";
import {
  createRoom,
  updateRoom,
  deleteRoom,
  getRoom,
  getAllRooms,
  updateRoomAvailability,
} from "../controllers/room.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";

export const router = express.Router();

//CREATE A NEW Room
router.post("/:hotelId", verifyAdmin, createRoom);

//UPDATE (PUT)
router.put("/:id", verifyAdmin, updateRoom);
router.put("/availability/:id", verifyAdmin, updateRoomAvailability);

//DELETE    /server/Rooms/:id
router.delete("/:id/:hotelId", verifyAdmin, deleteRoom);
//GET   - one Room
router.get("/:id", verifyUser, getRoom);

//GET ALL (all Rooms)
router.get("/", verifyUser, getAllRooms);

export default router;
