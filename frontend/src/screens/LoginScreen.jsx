import { useState, useEffect } from 'react';
import {  useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';
import RegisterStyle from '../assets/styles/logStyle';

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [login, { isLoading }] = useLoginMutation();

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
            const res = await login({ email, password }).unwrap();
            dispatch(setCredentials({ ...res }));
            navigate(redirect);
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    };

    return (
        <RegisterStyle>
            <div className="container">
                <div className="create-account">
                    <p className='heading'>Log In</p>
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

                        <label htmlFor="Password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />

                        <input  disabled={isLoading} type="submit" value="Sign In" />
                    </form>
                    <div className="forget"><a href="/forgetPassword">Forget Password</a></div>
                    <div className='footer'>
                        <p>
                            Don't have an account?
                        </p>
                        <a href="/Register">Sign up</a>
                    </div>
                </div>
                <img className="loginimg" src="./images/login.jpg" alt='sign-in'></img>
            </div>
        </RegisterStyle>
    );
};

export default LoginScreen;