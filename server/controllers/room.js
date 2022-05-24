import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";
import { createError } from "../utils/error.js";

export const createRoom = async (req, res, next) => {

  const { hotelId } = req.params;
  const newRoom = new Room(req.body);
    try {

        const savedRoom = await newRoom.save();
        try {
          await Hotel.findByIdAndUpdate(hotelId, {
            $push: { rooms: savedRoom._id },
          });
      
        } catch (error) {
          next(error);
        }
        res.status(201).json(savedRoom);
    } catch (error) {
        next(error);
    }
};

//UPDATE (PUT)
export const updateRoom = async (req, res, next) => {
  const id = req.params.id;
  const body = req.body;
  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true }
    );
    res.status(200).json(updatedRoom);
  } catch (err) {
    next(err);
  }
}

//DELETE    /api/Rooms/:id
export const deleteRoom = async (req, res, next) => {
  const id = req.params.id;
  const { hotelId } = req.params;
  try {
    await Room.findByIdAndDelete(id);
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $pull: { rooms: id },
      });
  
    } catch (error) {
      next(error);
    }
    res.status(200).json({ message: "Room has been deleted" });
  } catch (err) {
    next(err);
  }
}


//GET   - one Room
export const getRoom = async (req, res, next) => {
  
  const id = req.params.id;
  try {
    const room = await Room.findById(id);
    res.status(200).json(room);
  } catch (err) {
    next(err);
  }
}



//GET ALL (all Rooms)
export const getAllRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (err) {
    next(err);
  }
}
