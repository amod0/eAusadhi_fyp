import PrescriptionImage from '../models/prescriptionModel.js';
import asyncHandler from '../middleware/asyncHandler.js';

const getPrescription = asyncHandler(async (req, res) => {
    const users = await PrescriptionImage.find({});
    res.json(users);
  });

export {
    getPrescription
};
