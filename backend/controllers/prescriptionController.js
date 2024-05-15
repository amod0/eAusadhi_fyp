import PrescriptionImage from '../models/prescriptionModel.js';
import asyncHandler from '../middleware/asyncHandler.js';

const getPrescription = asyncHandler(async (req, res) => {
  // console.log(res,'res')  
  const users = await PrescriptionImage.find({});
    console.log(users,'tt');
    res.json(users);
  });

export {
    getPrescription
};
