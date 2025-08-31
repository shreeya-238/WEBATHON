import React, { useState } from 'react';

/**
 * Demo component showing how Aadhaar OTP verification works
 * This is for demonstration purposes only
 */
const AadhaarOtpDemo = () => {
  const [step, setStep] = useState(1);
  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleStep1 = () => {
    if (!aadhaarNumber || aadhaarNumber.length !== 12) {
      setMessage('Please enter a valid 12-digit Aadhaar number');
      return;
    }
    if (!mobileNumber || mobileNumber.length !== 10) {
      setMessage('Please enter a valid 10-digit mobile number');
      return;
    }
    setStep(2);
    setMessage('');
  };

  const handleSendOtp = () => {
    setIsLoading(true);
    setMessage('Sending OTP to mobile number linked with Aadhaar...');
    
    // Simulate UIDAI API call
    setTimeout(() => {
      setIsLoading(false);
      setStep(3);
      setMessage('OTP sent successfully! Check your mobile for the 6-digit code.');
    }, 2000);
  };

  const handleVerifyOtp = () => {
    if (!otp || otp.length !== 6) {
      setMessage('Please enter a valid 6-digit OTP');
      return;
    }

    setIsLoading(true);
    setMessage('Verifying OTP with UIDAI...');
    
    // Simulate UIDAI verification
    setTimeout(() => {
      setIsLoading(false);
      setStep(4);
      setMessage('Aadhaar verification successful! Your identity has been verified.');
    }, 2000);
  };

  const resetDemo = () => {
    setStep(1);
    setAadhaarNumber('');
    setMobileNumber('');
    setOtp('');
    setMessage('');
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-bold text-center mb-6 text-blue-600">
        Aadhaar OTP Verification Demo
      </h2>

      {/* Step 1: Aadhaar and Mobile Input */}
      {step === 1 && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Step 1: Enter Aadhaar & Mobile</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Aadhaar Number
            </label>
            <input
              type="text"
              value={aadhaarNumber}
              onChange={(e) => setAadhaarNumber(e.target.value.replace(/\D/g, '').slice(0, 12))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter 12-digit Aadhaar"
              maxLength="12"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mobile Number (linked with Aadhaar)
            </label>
            <input
              type="tel"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter 10-digit mobile"
              maxLength="10"
            />
          </div>

          <button
            onClick={handleStep1}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Continue
          </button>
        </div>
      )}

      {/* Step 2: Send OTP */}
      {step === 2 && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Step 2: Send OTP</h3>
          
          <div className="p-3 bg-gray-50 rounded border">
            <p className="text-sm text-gray-600">Aadhaar: {aadhaarNumber}</p>
            <p className="text-sm text-gray-600">Mobile: {mobileNumber}</p>
          </div>

          <p className="text-sm text-gray-700">
            Click the button below to send OTP to the mobile number linked with your Aadhaar.
            UIDAI will generate and send a 6-digit OTP via SMS.
          </p>

          <button
            onClick={handleSendOtp}
            disabled={isLoading}
            className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50"
          >
            {isLoading ? 'Sending OTP...' : 'Send OTP via UIDAI'}
          </button>
        </div>
      )}

      {/* Step 3: Enter OTP */}
      {step === 3 && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Step 3: Enter OTP</h3>
          
          <p className="text-sm text-gray-700">
            Enter the 6-digit OTP received on your mobile number from UIDAI.
          </p>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Enter OTP
            </label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-center text-lg font-mono"
              placeholder="000000"
              maxLength="6"
            />
          </div>

          <button
            onClick={handleVerifyOtp}
            disabled={isLoading || !otp || otp.length !== 6}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {isLoading ? 'Verifying...' : 'Verify OTP with UIDAI'}
          </button>
        </div>
      )}

      {/* Step 4: Success */}
      {step === 4 && (
        <div className="space-y-4 text-center">
          <div className="text-green-600">
            <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          
          <h3 className="text-lg font-medium text-gray-900">Verification Successful!</h3>
          
          <p className="text-sm text-gray-700">
            Your Aadhaar number has been successfully verified with UIDAI.
            Your identity is now confirmed and you can proceed with registration.
          </p>

          <button
            onClick={resetDemo}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Message Display */}
      {message && (
        <div className={`mt-4 p-3 rounded text-sm ${
          message.includes('successful') || message.includes('success') 
            ? 'bg-green-100 text-green-800' 
            : 'bg-blue-100 text-blue-800'
        }`}>
          {message}
        </div>
      )}

      {/* Demo Info */}
      <div className="mt-6 p-3 bg-yellow-50 rounded border border-yellow-200">
        <h4 className="text-sm font-medium text-yellow-900 mb-2">Demo Information:</h4>
        <ul className="text-xs text-yellow-800 space-y-1">
          <li>• This is a simulation of UIDAI's OTP verification process</li>
          <li>• In production, UIDAI would send real OTP via SMS</li>
          <li>• For demo: Use any 6-digit number as OTP</li>
          <li>• Real implementation requires UIDAI AUA license</li>
        </ul>
      </div>
    </div>
  );
};

export default AadhaarOtpDemo;
