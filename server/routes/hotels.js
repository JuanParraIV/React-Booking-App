import express from "express";
import {
  createHotel,
  updateHotel,
  deleteHotel,
  getHotel,
  getAllHotels,
  countByCity,
  countByType
} from "../controllers/hotel.js";

import { verifyAdmin} from "../utils/verifyToken.js";

export const router = express.Router();

//CREATE A NEW HOTEL
router.post("/", verifyAdmin,createHotel);

//UPDATE (PUT)
router.put("/:id", verifyAdmin, updateHotel);

//DELETE    /server/hotels/:id
router.delete("/:id", verifyAdmin, deleteHotel);
//GET   - one hotel
router.get("/find/:id", getHotel);

//GET ALL (all hotels)
router.get("/", getAllHotels);
router.get("/countByCity",countByCity);
router.get("/countByType", countByType);

export default router;
