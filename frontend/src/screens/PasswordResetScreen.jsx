import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

// import { LinkContainer } from 'react-router-bootstrap';
// import { useDispatch} from 'react-redux';

import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import { useForgotpasswordMutation } from '../slices/usersApiSlice';
// import { setCredentials } from '../slices/authSlice';
import ForgetStyle from '../assets/styles/forgetStyle';
import { useParams } from 'react-router-dom';


const PasswordResetScreen = () => {

  const { id,token } = useParams();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
console.log(id,token,'token','id')

  const [updateForgotPassword, { isLoading: loadingUpdateProfile }] =
  useForgotpasswordMutation();

  const navigate = useNavigate();

  // const dispatch = useDispatch();
  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      try {
        const res = await updateForgotPassword({
          // NOTE: here we don't need the _id in the request payload as this is
          // not used in our controller.
          // _id: userInfo._id,
          password, id});
          console.log("ressss",res)
        // dispatch(setCredentials({ ...res }));
        toast.success('Password updated successfully');
        navigate('/login');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <ForgetStyle>
      <h2>User Profile</h2>

      <Form onSubmit={submitHandler}>
        <Form.Group className='my-2' controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className='my-2' controlId='confirmPassword'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Confirm password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'>
          Update
        </Button>
        {loadingUpdateProfile && <Loader />}
      </Form>
    </ForgetStyle>
  )
}


export default PasswordResetScreen;
