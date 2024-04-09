// import path from 'path';
// import express from 'express';
// import multer from 'multer';

// const router = express.Router();

// const storage = multer.diskStorage({
//   destination(req, file, cb) {
//     cb(null, 'uploads/');
//   },
//   filename(req, file, cb) {
//     cb(
//       null,
//       `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
//     );
//   },
// });

// function fileFilter(req, file, cb) {
//   const filetypes = /jpe?g|png|webp/;
//   const mimetypes = /image\/jpe?g|image\/png|image\/webp/;

//   const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//   const mimetype = mimetypes.test(file.mimetype);

//   if (extname && mimetype) {
//     cb(null, true);
//   } else {
//     cb(new Error('Images only!'), false);
//   }
// }

// const upload = multer({ storage, fileFilter });
// const uploadSingleImage = upload.single('image');

// router.post('/', (req, res) => {
//   uploadSingleImage(req, res, function (err) {
//     if (err) {
//       return res.status(400).send({ message: err.message });
//     }

//     res.status(200).send({
//       message: 'Image uploaded successfully',
//       image: `/${req.file.path}`,
//     });
//   });
// });

// export default router;


// uploadRoutes.js

import path from 'path';
import express from 'express';
import multer from 'multer';
import User from '../models/userModel.js';

const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/'); // Define the destination directory for uploads
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    ); // Define the filename for uploaded files
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

// Define a single upload middleware for prescription photo
const uploadPrescriptionPhoto = upload.single('prescriptionPhoto');

// Route to handle prescription photo upload
router.post('/upload-prescription', (req, res) => {
  uploadPrescriptionPhoto(req, res, async function (err) {
    if (err) {
      return res.status(400).send({ message: err.message });
    }

    try {
      const user = await User.findById(req.user._id); // Assuming user ID is stored in req.user._id after authentication
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Handle file upload and update user model with photo URL
      // For example:
      user.prescriptionPhoto = req.file.path; // Assuming Multer is used for file upload
      await user.save();

      res.status(200).send({
        message: 'Prescription photo uploaded successfully',
        photoUrl: req.file.path,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
});

export default router;
