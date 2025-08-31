import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    aadhaarNumber: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
    newsletter: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showOtpStep, setShowOtpStep] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpError, setOtpError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    let processedValue = value;
    
    // Format Aadhaar number with spaces for better readability
    if (name === 'aadhaarNumber') {
      // Remove all non-digits
      const digitsOnly = value.replace(/\D/g, '');
      // Limit to 12 digits
      const limited = digitsOnly.slice(0, 12);
      // Add spaces for formatting (XXXX XXXX XXXX)
      processedValue = limited.replace(/(\d{4})(?=\d)/g, '$1 ');
    }
    
    // Format phone number
    if (name === 'phone') {
      // Remove all non-digits
      processedValue = value.replace(/\D/g, '').slice(0, 10);
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : processedValue
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[6-9]\d{9}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid 10-digit mobile number';
    }
    
    if (!formData.aadhaarNumber.trim()) {
      newErrors.aadhaarNumber = 'Aadhaar number is required';
    } else {
      // Remove spaces and check if it's exactly 12 digits
      const cleanAadhaar = formData.aadhaarNumber.replace(/\s/g, '');
      if (!/^\d{12}$/.test(cleanAadhaar)) {
        newErrors.aadhaarNumber = 'Aadhaar number must be 12 digits';
      }
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    // IMPORTANT: Form submission only shows OTP step
    // NO account is created until Aadhaar is verified
    setShowOtpStep(true);
  };

  const handleSendOtp = async () => {
    setOtpLoading(true);
    setOtpError('');
    
    try {
      // Simulate sending OTP to mobile number linked with Aadhaar
      // In production, this would call UIDAI API
      setTimeout(() => {
        setOtpLoading(false);
        setOtpSent(true);
        // For demo purposes, show a sample OTP
        alert('OTP sent! For demo: Use any 6-digit number (e.g., 123456)');
      }, 2000);
    } catch (error) {
      setOtpLoading(false);
      setOtpError('Failed to send OTP. Please try again.');
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp || otp.length !== 6) {
      setOtpError('Please enter a valid 6-digit OTP');
      return;
    }

    setIsLoading(true);
    setOtpError('');
    
    try {
      // Simulate OTP verification with UIDAI
      // In production, this would call UIDAI verification API
      setTimeout(() => {
        setIsLoading(false);
        
        // CRITICAL: Only after successful Aadhaar verification do we:
        // 1. Create the user account
        // 2. Store Aadhaar verification status
        // 3. Allow access to the platform
        
        // Simulate account creation API call
        createUserAccount();
        
      }, 2000);
    } catch (error) {
      setIsLoading(false);
      setOtpError('OTP verification failed. Please try again.');
    }
  };

  // This function is ONLY called after successful Aadhaar verification
  const createUserAccount = async () => {
    try {
      // SECURITY CHECK: Ensure Aadhaar verification was completed
      if (!otpSent || !otp || otp.length !== 6) {
        throw new Error('Aadhaar verification incomplete');
      }

      // In production, this would be your backend API call
      // to create the user account with verified Aadhaar status
      
      const userData = {
        ...formData,
        aadhaarVerified: true,
        aadhaarVerificationId: `VID_${Date.now()}`,
        verificationTimestamp: new Date().toISOString(),
        // Store masked Aadhaar for reference (never store full Aadhaar)
        aadhaarMasked: formData.aadhaarNumber.replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, '$1 ').replace(/(\d{4})\s(\d{4})\s(\d{4})/, '$1 **** ****')
      };

      // Simulate API call to create account
      console.log('Creating user account with verified Aadhaar:', userData);
      
      // Success - redirect to home
      navigate('/');
      
    } catch (error) {
      console.error('Failed to create user account:', error);
      setOtpError('Account creation failed. Please try again.');
    }
  };

  const handleBackToForm = () => {
    setShowOtpStep(false);
    setOtp('');
    setOtpSent(false);
    setOtpError('');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Logo */}
        <div className="text-center">
          <Link to="/" className="text-3xl font-bold text-blue-600 hover:text-blue-700 transition-colors">
            YourLogo
          </Link>
        </div>
        
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500 transition-colors">
            Sign in here
          </Link>
        </p>
        <p className="mt-1 text-center text-sm text-gray-600">
          Want to sell products?{' '}
          <Link to="/company/signup" className="font-medium text-blue-600 hover:text-blue-500 transition-colors">
            Register your business
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
                         {/* Name Fields */}
             <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
               <div>
                 <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                   First name
                 </label>
                 <div className="mt-1">
                   <input
                     id="firstName"
                     name="firstName"
                     type="text"
                     autoComplete="given-name"
                     required
                     value={formData.firstName}
                     onChange={handleChange}
                     className={`appearance-none block w-full px-3 py-2 border rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                       errors.firstName ? 'border-red-300' : 'border-gray-300'
                     }`}
                     placeholder="First name"
                   />
                   {errors.firstName && (
                     <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
                   )}
                 </div>
               </div>

               <div>
                 <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                   Last name
                 </label>
                 <div className="mt-1">
                   <input
                     id="lastName"
                     name="lastName"
                     type="text"
                     autoComplete="family-name"
                     required
                     value={formData.lastName}
                     onChange={handleChange}
                     className={`appearance-none block w-full px-3 py-2 border rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                       errors.lastName ? 'border-red-300' : 'border-gray-300'
                     }`}
                     placeholder="Last name"
                   />
                   {errors.lastName && (
                     <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
                   )}
                 </div>
               </div>
             </div>

             {/* Contact Information */}
             <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
               <div>
                 <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                   Mobile Number *
                 </label>
                 <div className="mt-1">
                   <input
                     id="phone"
                     name="phone"
                     type="tel"
                     autoComplete="tel"
                     required
                     value={formData.phone}
                     onChange={handleChange}
                     className={`appearance-none block w-full px-3 py-2 border rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                       errors.phone ? 'border-red-300' : 'border-gray-300'
                     }`}
                     placeholder="Enter 10-digit mobile number"
                     maxLength="10"
                   />
                   {errors.phone && (
                     <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                   )}
                 </div>
               </div>

               <div>
                 <label htmlFor="aadhaarNumber" className="block text-sm font-medium text-gray-700">
                   Aadhaar Number *
                 </label>
                 <div className="mt-1">
                   <input
                     id="aadhaarNumber"
                     name="aadhaarNumber"
                     type="text"
                     required
                     value={formData.aadhaarNumber}
                     onChange={handleChange}
                     className={`appearance-none block w-full px-3 py-2 border rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                       errors.aadhaarNumber ? 'border-red-300' : 'border-gray-300'
                     }`}
                     placeholder="XXXX XXXX XXXX"
                     maxLength="12"
                   />
                   {errors.aadhaarNumber && (
                     <p className="mt-1 text-sm text-red-600">{errors.aadhaarNumber}</p>
                   )}
                   <p className="mt-1 text-xs text-gray-500">
                     Enter your 12-digit Aadhaar number for verification
                   </p>
                 </div>
               </div>
             </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className={`appearance-none block w-full px-3 py-2 border rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    errors.email ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>
            </div>

            {/* Password Fields */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className={`appearance-none block w-full px-3 py-2 border rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                      errors.password ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="Create password"
                  />
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirm password
                </label>
                <div className="mt-1">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`appearance-none block w-full px-3 py-2 border rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                      errors.confirmPassword ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="Confirm password"
                  />
                  {errors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
                  )}
                </div>
              </div>
            </div>

                         {/* Aadhaar Verification Notice */}
             <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
               <div className="flex items-start">
                 <div className="flex-shrink-0">
                   <svg className="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                   </svg>
                 </div>
                 <div className="ml-3">
                   <h3 className="text-sm font-medium text-blue-900">Aadhaar Verification</h3>
                   <div className="mt-2 text-sm text-blue-800">
                     <p>Your Aadhaar number will be verified through UIDAI's secure verification system using OTP sent to your registered mobile number. This helps ensure:</p>
                     <ul className="mt-1 list-disc list-inside space-y-1">
                       <li>• Identity verification and fraud prevention</li>
                       <li>• Secure and trusted transactions</li>
                       <li>• Compliance with government regulations</li>
                       <li>• Two-factor authentication (Aadhaar + Mobile OTP)</li>
                     </ul>
                   </div>
                 </div>
               </div>
             </div>

             {/* Checkboxes */}
             <div className="space-y-4">
               <div className="flex items-start">
                 <div className="flex items-center h-5">
                   <input
                     id="agreeToTerms"
                     name="agreeToTerms"
                     type="checkbox"
                     checked={formData.agreeToTerms}
                     onChange={handleChange}
                     className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                   />
                 </div>
                 <div className="ml-3 text-sm">
                   <label htmlFor="agreeToTerms" className="text-gray-700">
                     I agree to the{' '}
                     <Link to="/terms" className="text-blue-600 hover:text-blue-500">
                       Terms and Conditions
                     </Link>
                     {' '}and{' '}
                     <Link to="/privacy" className="text-blue-600 hover:text-blue-500">
                       Privacy Policy
                     </Link>
                   </label>
                   {errors.agreeToTerms && (
                     <p className="mt-1 text-sm text-red-600">{errors.agreeToTerms}</p>
                   )}
                 </div>
               </div>

               <div className="flex items-start">
                 <div className="flex items-center h-5">
                   <input
                     id="newsletter"
                     name="newsletter"
                     type="checkbox"
                     checked={formData.newsletter}
                     onChange={handleChange}
                     className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                   />
                 </div>
                 <div className="ml-3 text-sm">
                   <label htmlFor="newsletter" className="text-gray-700">
                     I want to receive updates about new products and special offers
                   </label>
                 </div>
               </div>
             </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating account...
                  </div>
                                 ) : (
                   'Continue to Aadhaar Verification'
                 )}
              </button>
            </div>
                     </form>

           {/* OTP Verification Step */}
           {showOtpStep && (
             <div className="mt-6 p-6 bg-blue-50 rounded-lg border border-blue-200">
                               <div className="text-center mb-4">
                  <h3 className="text-lg font-medium text-blue-900">Aadhaar Verification Required</h3>
                  <p className="text-sm text-blue-800 mt-1">
                    We need to verify your Aadhaar number to complete your registration
                  </p>
                  <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded">
                    <p className="text-xs text-red-700 font-medium">
                      ⚠️ Account creation is BLOCKED until Aadhaar verification is successful
                    </p>
                  </div>
                </div>

               <div className="space-y-4">
                 {/* Aadhaar Info Display */}
                 <div className="p-3 bg-white rounded border">
                   <div className="flex justify-between items-center">
                     <span className="text-sm text-gray-600">Aadhaar Number:</span>
                     <span className="text-sm font-medium text-gray-900">
                       {formData.aadhaarNumber.replace(/\s/g, '').replace(/(\d{4})(?=\d)/g, '$1 ')}
                     </span>
                   </div>
                   <div className="flex justify-between items-center mt-1">
                     <span className="text-sm text-gray-600">Mobile Number:</span>
                     <span className="text-sm font-medium text-gray-900">{formData.phone}</span>
                   </div>
                 </div>

                 {/* OTP Input */}
                 {otpSent && (
                   <div>
                     <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-2">
                       Enter OTP sent to your mobile
                     </label>
                     <div className="flex space-x-2">
                       <input
                         id="otp"
                         type="text"
                         value={otp}
                         onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                         className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                         placeholder="Enter 6-digit OTP"
                         maxLength="6"
                       />
                       <button
                         onClick={handleVerifyOtp}
                         disabled={isLoading || !otp || otp.length !== 6}
                         className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                       >
                         {isLoading ? 'Verifying...' : 'Verify OTP'}
                       </button>
                     </div>
                     {otpError && (
                       <p className="mt-1 text-sm text-red-600">{otpError}</p>
                     )}
                   </div>
                 )}

                 {/* Action Buttons */}
                 <div className="flex space-x-3">
                   {!otpSent ? (
                     <button
                       onClick={handleSendOtp}
                       disabled={otpLoading}
                       className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                     >
                       {otpLoading ? (
                         <div className="flex items-center justify-center">
                           <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                             <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                             <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                           </svg>
                           Sending OTP...
                         </div>
                       ) : (
                         'Send OTP to Mobile'
                       )}
                     </button>
                   ) : (
                     <button
                       onClick={handleSendOtp}
                       className="px-4 py-2 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                     >
                       Resend OTP
                     </button>
                   )}
                   
                   <button
                     onClick={handleBackToForm}
                     className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500"
                   >
                     Back to Form
                   </button>
                 </div>

                                   {/* OTP Instructions */}
                  <div className="text-xs text-blue-700 bg-blue-100 p-3 rounded">
                    <p className="font-medium mb-1">How it works:</p>
                    <ol className="list-decimal list-inside space-y-1">
                      <li>Click "Send OTP" to receive a 6-digit code on your mobile</li>
                      <li>Enter the OTP received from UIDAI</li>
                      <li>Click "Verify OTP" to complete your registration</li>
                    </ol>
                    <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded">
                      <p className="text-xs text-yellow-800">
                        <strong>Security Note:</strong> Your account will ONLY be created after UIDAI successfully verifies your Aadhaar number. 
                        This is a mandatory requirement and cannot be bypassed.
                      </p>
                    </div>
                  </div>
               </div>
             </div>
           )}

           {/* Divider */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            {/* Social Signup Buttons */}
            <div className="mt-6 grid grid-cols-2 gap-3">
              <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors">
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span className="ml-2">Google</span>
              </button>

              <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span className="ml-2">Facebook</span>
              </button>
            </div>
          </div>

          {/* Security Notice */}
          <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-green-900">Your Data is Secure</h3>
                <div className="mt-2 text-sm text-green-800">
                  <p>We use industry-standard encryption and follow UIDAI guidelines for Aadhaar verification. Your personal information is protected and never shared with unauthorized parties.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
