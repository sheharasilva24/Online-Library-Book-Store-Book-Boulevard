import React, { useState } from 'react';
import './styles/LoginPage.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import ReactLoading from 'react-loading';
import { useNavigate } from 'react-router-dom';



function LoginPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [twoFactorCode, setTwoFactorCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [stage, setStage] = useState('login'); // Stages: 'login', 'verify2FA', 'forgotPassword', 'resetPassword'
    const [isLoading, setIsLoading] = useState(false);

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await axios.post(`${process.env.REACT_APP_API_PATH}/users/login`, { email, password });
            setStage('verify2FA');
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Failed to log in. Please try again!',
            });
        }
        setIsLoading(false);
    };

    const handle2FASubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_PATH}/users/login2fa`, { email, twoFactorCode });
            console.log(response.data);
            localStorage.setItem('jwtToken', response.data.token);
            const token = localStorage.getItem("jwtToken");
            console.log(token);
            Swal.fire({
                icon: 'success',
                title: 'Logged In',
                text: '2FA verification successful, you are now logged in!',
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/Home'); // Adjust the '/home' path if necessary to match your routing setup
                }
            });
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Failed to verify 2FA. Please try again!',
            });
        }
        setIsLoading(false);
    };

    const handleForgotPassword = async () => {
        setIsLoading(true);
        try {
            await axios.post(`${process.env.REACT_APP_API_PATH}/users/forgotPassword`, { email });
            Swal.fire('Success', 'Please check your email for the reset code.', 'success');
            setStage('resetPassword'); // Move to reset password stage
        } catch (error) {
            console.error(error);
            Swal.fire('Error', 'Failed to send reset password code.', 'error');
        }
        setIsLoading(false);
    };

    const handleResetPasswordSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await axios.post(`${process.env.REACT_APP_API_PATH}/users/forgotPasswordSuccess`, {
                email, twoFactorCode, newPassword
            });
            Swal.fire('Success', 'Your password has been reset successfully.', 'success');
            setStage('login'); // Move back to login stage
        } catch (error) {
            console.error(error);
            Swal.fire('Error', 'Failed to reset password.', 'error');
        }
        setIsLoading(false);
    };

    if (isLoading) {
        return <div className="loading-screen" style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'
        }}>
            <ReactLoading type="spin" color="#000" height={'10%'} width={'10%'} />
        </div>;
    }

    return (
        <div className="login-page">
            <div className="login-section">
                {stage === 'login' && (
                    <form className="login-form" onSubmit={handleLoginSubmit}>
                        <h2><span>Login</span></h2>
                        <div className="input-container">
                            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className='buttons-log-form'>
                            <button type="submit" className="Login-button" data='Login'></button>
                            <Link to={"/Registration"}><button className="Login-button" data="Register Now!"></button></Link>
                            <button type="button" onClick={() => setStage('forgotPassword')} className="Login-button" data='Forgot Password'></button>
                        </div>
                    </form>
                )}

                {stage === 'verify2FA' && (
                    <form className="login-form" onSubmit={handle2FASubmit}>
                        <h2><span>Enter 2FA Code</span></h2>
                        <div className="input-container">
                            <input type="text" placeholder="2FA Code" value={twoFactorCode} onChange={(e) => setTwoFactorCode(e.target.value)} />
                        </div>
                        <div className='buttons-log-form'>
                            <button type="submit" className="Login-button" data='Verify'></button>
                        </div>
                    </form>
                )}
                {stage === 'forgotPassword' && (
                    <div className="forgot-password-section">
                        <h2>Forgot Password</h2>
                        <div className="input-container">
                            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className='buttons-log-form'>
                            <button onClick={handleForgotPassword} className="Login-button" data="Send Reset Code"></button>
                            <button onClick={() => setStage('login')} className="Login-button" data='Back to Login'></button>
                        </div>
                    </div>
                )}

                {stage === 'resetPassword' && (
                    <form className="reset-password-form" onSubmit={handleResetPasswordSubmit}>
                        <h2>Reset Password</h2>
                        <div className="input-container">
                            <input type="text" placeholder="Reset Code" value={twoFactorCode} onChange={(e) => setTwoFactorCode(e.target.value)} required />
                            <input type="password" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
                        </div>
                        <div className='buttons-log-form'>
                            <button type="submit" className="Login-button" data="Reset Password"></button>
                            <button onClick={() => setStage('login')} className="Login-button" data="Back to Login"></button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}

export default LoginPage;
