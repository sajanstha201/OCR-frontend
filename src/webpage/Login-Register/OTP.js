import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { activate_loader, showAlert } from '../../components/AlertLoader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRedoAlt } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';

export const OTP = () => {
    const [isVerifiedOTP, setIsVerifiedOTP] = useState(false);
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState(new Array(4).fill(''));
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [isSpinning, setIsSpinning] = useState(false);
    const baseUrl = useSelector((state) => state.baseUrl).backend;
    const navigate = useNavigate();

    if (isVerifiedOTP) {
        navigate(`/anti-nav/forgot-password?email=${encodeURIComponent(email)}&otp=${encodeURIComponent(parseInt(otp.join('')))}`);
    }

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        try {
            activate_loader(true);
            const response = await axios.post(baseUrl + 'api/forgot-password/', { email });
            showAlert('OTP has been sent to your registered email address', 'green');
            setIsEmailValid(true);
        } catch (error) {
            console.log('error:', error);
            showAlert(error.response.data.error, 'red');
        } finally {
            activate_loader(false);
        }
    };

    const handleChange = (element, index) => {
        const value = element.value;
        if (!isNaN(value)) {
            setOtp([...otp.map((d, idx) => (idx === index ? value : d))]);
            if (element.nextSibling && value) {
                element.nextSibling.focus();
            }
        }
    };

    const handleKeyDown = (element, index, event) => {
        if (event.key === 'Backspace') {
            setOtp([...otp.map((d, idx) => (idx === index ? '' : d))]);
            if (element.previousSibling) {
                element.previousSibling.focus();
            }
        }
    };

    const verifyOTP = async () => {
        try {
            activate_loader(true);
            const otpValue = parseInt(otp.join(''));
            const response = await axios.post(baseUrl + 'api/check-otp/', {
                email,
                otp: otpValue
            });
            console.log(response.data);
            setIsVerifiedOTP(true);
        } catch (error) {
            console.log('Error while verifying the otp:', error);
            showAlert(error.response.data.error, 'red');
        } finally {
            activate_loader(false);
        }
    };

    const resendOTP = async (e) => {
        e.preventDefault();
        try {
            activate_loader(true);
            setOtp(new Array(4).fill(''));
            setIsSpinning(true);
            setTimeout(() => setIsSpinning(false), 1000);
            const response = await axios.post(baseUrl + 'api/forgot-password/', { email });
            showAlert('OTP has been sent to your registered email address', 'green');
            setIsEmailValid(true);
        } catch (error) {
            console.log('error:', error);
            showAlert(error.response.data.error, 'red');
        } finally {
            activate_loader(false);
        }
    };

    return (
        <div className="flex justify-center items-center flex-col space-y-4 mt-56">
                <form onSubmit={handleEmailSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Enter your email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 mt-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <Button type="submit" variant="primary">
                        Submit
                    </Button>
                </form>


                <div className='p-20 flex flex-col justify-center items-center gap-3'>
                    <label>OTP has been sent to your {email} email address</label>
                    <div className="flex justify-center items-center space-x-2">
                        {otp.map((data, index) => (
                            <input
                                className="otp-field w-10 h-10 text-center text-lg border rounded border-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                                type="text"
                                name="otp"
                                maxLength="1"
                                key={index}
                                value={data}
                                onChange={(e) => handleChange(e.target, index)}
                                onKeyDown={(e) => handleKeyDown(e.target, index, e)}
                                onFocus={(e) => e.target.select()}
                            />
                        ))}
                    </div>
                    <div>
                        <div onClick={resendOTP} className="flex items-center cursor-pointer">
                            <FontAwesomeIcon
                                icon={faRedoAlt}
                                className={`mr-2 ${isSpinning ? 'animate-spin' : ''}`}
                            />
                            <div>Resend OTP</div>
                        </div>
                        <Button variant="primary" onClick={verifyOTP}>
                            Continue
                        </Button>
                    </div>
                    </div>
        </div>
    );
};
