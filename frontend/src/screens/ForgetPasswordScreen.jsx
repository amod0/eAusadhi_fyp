import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { useLoginMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';
import ForgetStyle from '../assets/styles/forgetStyle';

const ForgetPasswordScreen = () => {
    const [email, setEmail] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [forgetPassword, { isLoading }] = useLoginMutation();

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
        try {
            const res = await forgetPassword({ email }).unwrap();
            dispatch(setCredentials({ ...res }));
            navigate(redirect);
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    };

    return (
        <ForgetStyle>
            <div className="container">
                <div className="forget-account">
                    <p className='heading'>Forget Password</p>
                    <div className="mb-24">Enter your email to <b>reset</b> your <b>password</b></div>
                    <form onSubmit={submitHandler}>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                       <input type="submit" value="Reset" />
                    </form>
                </div>
                <img className="forgetimg" src="./images/login.jpg" alt='sign-in'></img>
            </div>
        </ForgetStyle>
    );
};

export default ForgetPasswordScreen;