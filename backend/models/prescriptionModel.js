import mongoose from 'mongoose';

const prescriptionImageSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    prescriptionimage: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

/*--------encrypt---------*/
const ENCRYPTION_KEY = 'MySecretKey123!@#';
prescriptionImageSchema.pre('save', async function(next) {
  if (!this.isModified('prescriptionimage')) {
    return next();
  }

  // Encrypt the image before saving
  this.prescriptionimage = CryptoJS.AES.encrypt(this.prescriptionimage, ENCRYPTION_KEY).toString();
  next();
});

prescriptionImageSchema.methods.decryptImage = function() {
  // Decrypt the image when needed
  const decryptedBytes = CryptoJS.AES.decrypt(this.prescriptionimage, ENCRYPTION_KEY);
  return decryptedBytes.toString(CryptoJS.enc.Utf8);
};
/*--------End encrypt---------*/


const PrescriptionImage = mongoose.model('PrescriptionImage', prescriptionImageSchema);

export default PrescriptionImage;
