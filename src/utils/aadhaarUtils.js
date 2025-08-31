/**
 * Aadhaar utility functions for validation and verification
 */

/**
 * Validates Aadhaar number format
 * @param {string} aadhaar - Aadhaar number (with or without spaces)
 * @returns {boolean} - True if valid format
 */
export const validateAadhaarFormat = (aadhaar) => {
  if (!aadhaar) return false;
  
  // Remove spaces and check if it's exactly 12 digits
  const cleanAadhaar = aadhaar.replace(/\s/g, '');
  return /^\d{12}$/.test(cleanAadhaar);
};

/**
 * Formats Aadhaar number with spaces for readability
 * @param {string} aadhaar - Raw Aadhaar number
 * @returns {string} - Formatted Aadhaar number (XXXX XXXX XXXX)
 */
export const formatAadhaarNumber = (aadhaar) => {
  if (!aadhaar) return '';
  
  // Remove all non-digits
  const digitsOnly = aadhaar.replace(/\D/g, '');
  // Limit to 12 digits
  const limited = digitsOnly.slice(0, 12);
  // Add spaces for formatting (XXXX XXXX XXXX)
  return limited.replace(/(\d{4})(?=\d)/g, '$1 ');
};

/**
 * Masks Aadhaar number for display (shows only first 4 and last 4 digits)
 * @param {string} aadhaar - Aadhaar number
 * @returns {string} - Masked Aadhaar number (XXXX **** ****)
 */
export const maskAadhaarNumber = (aadhaar) => {
  if (!aadhaar) return '';
  
  const cleanAadhaar = aadhaar.replace(/\s/g, '');
  if (cleanAadhaar.length !== 12) return aadhaar;
  
  return `${cleanAadhaar.slice(0, 4)} **** ****`;
};

/**
 * Simulates Aadhaar verification with UIDAI
 * In production, this would integrate with UIDAI's API
 * @param {string} aadhaar - Aadhaar number
 * @param {string} otp - OTP received on registered mobile
 * @returns {Promise<Object>} - Verification result
 */
export const verifyAadhaarWithUIDAI = async (aadhaar, otp) => {
  // This is a simulation - in production, you would:
  // 1. Call UIDAI's verification API
  // 2. Pass the Aadhaar number and OTP
  // 3. Get verification result from UIDAI
  
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulate API response
      const isVerified = Math.random() > 0.1; // 90% success rate for demo
      
      if (isVerified) {
        resolve({
          success: true,
          message: 'Aadhaar verification successful',
          data: {
            aadhaarNumber: maskAadhaarNumber(aadhaar),
            verificationId: `VID_${Date.now()}`,
            timestamp: new Date().toISOString()
          }
        });
      } else {
        resolve({
          success: false,
          message: 'Aadhaar verification failed. Please check your details and try again.',
          error: 'VERIFICATION_FAILED'
        });
      }
    }, 2000); // Simulate 2-second API call
  });
};

/**
 * Generates a verification OTP (simulation)
 * In production, this would be sent via SMS by UIDAI
 * @param {string} aadhaar - Aadhaar number
 * @returns {Promise<Object>} - OTP generation result
 */
export const generateAadhaarOTP = async (aadhaar) => {
  // This is a simulation - in production, UIDAI would:
  // 1. Generate and send OTP to the mobile number linked with Aadhaar
  // 2. Return success/failure status
  
  return new Promise((resolve) => {
    setTimeout(() => {
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      
      resolve({
        success: true,
        message: 'OTP sent successfully to your registered mobile number',
        data: {
          requestId: `REQ_${Date.now()}`,
          // In production, you wouldn't get the actual OTP
          // It would be sent via SMS to the user
          otp: otp // Only for demo purposes
        }
      });
    }, 1000);
  });
};

/**
 * Checks if Aadhaar number is in valid range
 * @param {string} aadhaar - Aadhaar number
 * @returns {boolean} - True if in valid range
 */
export const isAadhaarInValidRange = (aadhaar) => {
  if (!aadhaar) return false;
  
  const cleanAadhaar = aadhaar.replace(/\s/g, '');
  if (cleanAadhaar.length !== 12) return false;
  
  // Aadhaar numbers start with specific patterns
  // This is a basic validation - UIDAI has more specific rules
  const firstDigit = parseInt(cleanAadhaar.charAt(0));
  return firstDigit >= 1 && firstDigit <= 9;
};

/**
 * Extracts demographic data from Aadhaar (simulation)
 * In production, this would come from UIDAI after verification
 * @param {string} aadhaar - Aadhaar number
 * @returns {Object} - Demographic data
 */
export const getAadhaarDemographics = (aadhaar) => {
  // This is a simulation - in production, UIDAI would provide:
  // - Name
  // - Date of Birth
  // - Gender
  // - Address (if authorized)
  
  return {
    name: 'Sample User',
    dateOfBirth: '1990-01-01',
    gender: 'M',
    address: 'Sample Address, City, State - PIN',
    photo: null // UIDAI provides photo if authorized
  };
};
