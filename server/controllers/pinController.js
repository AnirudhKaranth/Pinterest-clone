import mongoose from "mongoose";
import pin from "../models/pin.js";
import user from "../models/user.js"
import { createCustomError } from "../errors/CustomError.js";
import checkPermissions from "../utils/checkPermissions.js";

export const createPin = async (req, res, next) => {
    try {
        req.body.createdBy = req.User.userId;
        const USER = await user.findById({ _id: req.User.userId });
        const userName = USER.name;
        const profile = USER?.profile
        const { title, destination, about, image, altText, createdBy } = req.body;


        const Pin = await pin.create({ title, destination, about, image, altText, createdBy, userName, profile });

        res.status(201).json({ Pin });

    } catch (error) {
        next(error)
    }
}

export const savePin = async (req, res, next) => {
    try {
        const { _id: pinId } = req.body
        const _id = req.User.userId;

        const Pin = await pin.findOne({ _id: pinId })

        if (!Pin) {
            return next(createCustomError(`There is no pin with id ${pinId} `))
        }
        const savedPin = await pin.findByIdAndUpdate(pinId, { $set: { 'savedBy': [{ _id }] } }, { new: true })

        let Pins = await pin.find();
        
        res.status(200).json({ savedPin, Pins });
    } catch (error) {
        next(error)
    }
}

export const deletePin = async (req, res, next) => {
    try {
        const { id: PinId } = req.params;

        const Pin = await pin.findOne({ _id: PinId })

        if (!Pin) {
            return next(createCustomError(`There is no pin with id ${pinId} `))
        }

        checkPermissions(req.User, Pin.createdBy, next);

        await Pin.remove();
        let Pins = await pin.find();
        res.status(200).send({ Pins })
    } catch (error) {
        next(error)
    }
}

export const getAllPins = async (req, res, next) => {
    try {
        const { search } = req.query;
        if (search === 'all') {
            let Pins = await pin.find();
            res.status(200).send({ Pins })
        }
        else {
           
            let Pins = await pin.find({ $or: [{ title: { $regex: search, $options: 'i' } }, { about: { $regex: search, $options: 'i' } }] })
            
            res.status(200).json({ Pins })
        }
    } catch (error) {
        next(error)
    }
}

export const addComment = async (req, res, next) => {
    try {
        const { id: pinId } = req.params;

        const UserID = req.User.userId;
        const USER = await user.findById({ _id: UserID });
        const commentedBy = USER.name;

        const  comment = req.body;

        const {commentBody, profileImage} = comment

        const commentedPin = await pin.findByIdAndUpdate(pinId, { $addToSet: { 'comments': [{ commentBody, commentedBy, UserID, profileImage }] } }, { new: true })

        res.status(200).json({ commentedPin })

    } catch (error) {
        next(error)
    }
}

export const deleteComment = async (req, res, next) => {
    try {
        const { id: pinId } = req.params;
        const { cId } = req.query
        const cID  = mongoose.Types.ObjectId(cId);

        const commentedPin = await pin.findByIdAndUpdate(pinId, { $pull: { 'comments': { _id: { $eq: cID } } } }, { new: true })
        
        res.status(200).json({ commentedPin })

    } catch (error) {
        next(error)
    }
}

// export const getAllComments = async(req, res, next)=>{
//     try {
//         const {id: _id} = req.params;
//         let PIN = await pin.findById({_id});
//         const comments = PIN.comments
//         res.status(200).send({comments})

//     } catch (error) {
//         next(error)
//     }
// }

export const getPinDetail = async (req, res, next) => {
    try {

        const { id: _id } = req.params;
        const Pin = await pin.findById({ _id });
        res.status(200).json({ Pin });
    } catch (error) {
        next(error)
    }
}
