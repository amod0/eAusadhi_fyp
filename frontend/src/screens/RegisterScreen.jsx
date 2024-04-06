import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useRegisterMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';
import RegisterStyle from '../assets/styles/logStyle';

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      try {
        const res = await register({ name, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate(redirect);
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
  
  <RegisterStyle>
      <div className="container">
        <div className="create-account">
          <p className='heading'>Create Account</p>
          <form onSubmit={submitHandler}>
            <label htmlFor="FullName">Full Name:</label>
            <input
              type="name"
              id="FullName"
              name="FullName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <label htmlFor="Email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label htmlFor="Password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <label htmlFor="Password">Confirm Password:</label>
            <input
              type="password"
              id="Password1"
              name="Password1"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            <label htmlFor="PhoneNumber">Phone Number:</label>
            <input
              type="text"
              id="Phone"
              name="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
            <input disabled={isLoading} type="submit" value="Sign Up" />
          </form>
          <div className='footer'>
            <p>
              Already have an account?
            </p>
            <a href="/login">Sign In</a>
          </div>
        </div>
        <img className='registerimg' src="./images/register.jpg" alt='sign-up'></img>

      </div>
    </RegisterStyle>
  );
};

export default RegisterScreen;
