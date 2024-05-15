import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import Loader from '../components/Loader';
import { toast } from 'react-toastify';
import { useUploadPrescriptionImageMutation, useUpdatePrescriptionMutation } from '../slices/prescriptionSlice';

const PrescriptionScreen = () => {
  const userData  = localStorage.getItem('userInfo');
  const userId = JSON.parse(userData)._id; 
  const [prescriptionImage, setImage] = useState('');

  const [updatePrescription] = useUpdatePrescriptionMutation();

  const [uploadPrescriptionImage, { isLoading: loadingUpload }] =
    useUploadPrescriptionImageMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      // console.log("hfdsjfd" , prescriptionImage);
      await updatePrescription({
        userId,
        prescriptionImage

      }).unwrap();
      toast.success('Prescription Image Uploaded');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  // useEffect(() =>{
  //   if (prescriptionImage){
  //     console.log(prescriptionImage);
  //     setImage(prescriptionImage.image);
  //   }
  // }, [prescriptionImage]);

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append('image1', e.target.files[0]);
    try {
      const res = await uploadPrescriptionImage(formData).unwrap();
      setImage(res.image);
      toast.success(res.message);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <Link to='/' className='btn btn-light my-3'>
        Go Back
      </Link>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='image1'>
          <h1>Upload Prescription</h1>
          <Form.Control
            type='text' 
            placeholder='Enter image url'
            value={prescriptionImage}
            onChange={(e) => setImage(e.target.value)}
          ></Form.Control>
          <Form.Control
            label='Choose File'
            type='file'
            onChange={uploadFileHandler}
          ></Form.Control>
          {loadingUpload && <Loader />}
        </Form.Group>
        <Button
          type='submit'
          variant='primary'
          style={{ marginTop: '1rem' }}
        >
          Upload
        </Button>
      </Form>
    </>
  );
};

export default PrescriptionScreen;
