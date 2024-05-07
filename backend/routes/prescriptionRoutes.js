import path from 'path';
import express from 'express';
import multer from 'multer';
// import { uploadPrescriptionImage } from '../controllers/prescriptionController';
const router = express.Router();
import PrescriptionImage from '../models/prescriptionModel.js';
import { getPrescription } from '../controllers/prescriptionController.js';

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'prescription/');
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

// Define the file filter function
function fileFilter(req, file, cb) {
  const filetypes = /jpe?g|png|webp/;
  const mimetypes = /image\/jpe?g|image\/png|image\/webp/;

  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = mimetypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error('Images only!'), false);
  }
}

// Configure multer with storage and fileFilter options
const upload = multer({ storage, fileFilter });
const uploadSingleImage = upload.single('image1');

router.post('/', (req, res) => {
  uploadSingleImage(req, res, function (err) {
    if (err) {
      return res.status(400).send({ message: err.message });
    }

    res.status(200).send({
      // const savedPrescriptionImage = await uploadPrescriptionImage(req, res);
      message: 'Image uploaded successfully',
      image: `/${req.file.path}`,
    });
  });
});


router.post("/data" , async (req, res) => {
  const data = req.body;
    const prescription = new PrescriptionImage({
      user : data.userId,
      prescriptionimage : data.prescriptionImage

    })
    const createdPrescription = await prescription.save();
    res.status(201).json(createdPrescription);

})

router .get("/" , getPrescription )


export default router;
