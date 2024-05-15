import { useState } from 'react';
import { useSendpasswordlinkMutation } from '../slices/usersApiSlice';
import { toast } from 'react-toastify';
import ForgetStyle from '../assets/styles/forgetStyle';

const ForgetPasswordScreen = () => {
    const [email, setEmail] = useState('');
    const [message,setMessage] = useState('');


    const [sendpasswordlink, { isLoading }] = useSendpasswordlinkMutation();

    const setVal = (e) =>{
        setEmail(e.target.value)
    };

    const sendLink = async (e) => {
        e.preventDefault();
        try {
            const res = await sendpasswordlink({ email });
            // console.log(res,'rse')
            if (res.data.status === 201){
                setEmail("");
                setMessage(true)
            }else{

            }

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
                    {message ? <p style={{color:"green",fontWeight:"bold"}}>Password reset link send succsfully in you email</p>: ""}
                    <form >
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange= {setVal}
                            required
                        />
                       <input disabled={isLoading} type="submit" onClick={sendLink} value="Reset" />
                    </form>
                </div>
                <img className="forgetimg" src="./images/login.jpg" alt='sign-in'></img>
            </div>
        </ForgetStyle>
    );
};

export default ForgetPasswordScreen;