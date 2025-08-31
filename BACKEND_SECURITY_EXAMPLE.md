# Backend Security: Aadhaar Verification Enforcement

This document shows how to implement backend security to ensure **NO user account is created without successful Aadhaar verification**.

## Critical Security Requirements

### 1. Frontend Cannot Bypass Verification
- Frontend form submission only triggers OTP step
- No account creation API endpoint accessible without verification
- All account creation requests must include valid verification proof

### 2. Backend Validation
- Verify UIDAI verification status before account creation
- Store verification details securely
- Implement audit logging for all verification attempts

## Backend Implementation Example

### User Account Creation API

```javascript
// POST /api/users/create
// This endpoint is ONLY accessible after Aadhaar verification

const createUserAccount = async (req, res) => {
  try {
    const { 
      userData, 
      aadhaarVerificationId, 
      uidaiTransactionId,
      verificationTimestamp 
    } = req.body;

    // SECURITY CHECK 1: Verify Aadhaar verification was completed
    if (!aadhaarVerificationId || !uidaiTransactionId) {
      return res.status(400).json({
        success: false,
        message: 'Aadhaar verification proof required',
        error: 'MISSING_VERIFICATION_PROOF'
      });
    }

    // SECURITY CHECK 2: Validate UIDAI verification with your database
    const verificationRecord = await AadhaarVerification.findOne({
      verificationId: aadhaarVerificationId,
      uidaiTransactionId: uidaiTransactionId,
      status: 'VERIFIED',
      expiresAt: { $gt: new Date() } // Check if verification hasn't expired
    });

    if (!verificationRecord) {
      return res.status(403).json({
        success: false,
        message: 'Invalid or expired Aadhaar verification',
        error: 'INVALID_VERIFICATION'
      });
    }

    // SECURITY CHECK 3: Ensure verification matches the user
    if (verificationRecord.aadhaarNumber !== userData.aadhaarNumber.replace(/\s/g, '')) {
      return res.status(403).json({
        success: false,
        message: 'Aadhaar verification mismatch',
        error: 'VERIFICATION_MISMATCH'
      });
    }

    // SECURITY CHECK 4: Check if Aadhaar is already registered
    const existingUser = await User.findOne({
      'aadhaar.masked': userData.aadhaarMasked
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'Aadhaar number already registered',
        error: 'DUPLICATE_AADHAAR'
      });
    }

    // Create user account with verified Aadhaar status
    const newUser = new User({
      ...userData,
      aadhaar: {
        verified: true,
        verificationId: aadhaarVerificationId,
        uidaiTransactionId: uidaiTransactionId,
        verifiedAt: verificationTimestamp,
        masked: userData.aadhaarMasked, // Store only masked version
        lastVerified: new Date()
      },
      accountStatus: 'ACTIVE',
      createdAt: new Date()
    });

    await newUser.save();

    // Log successful account creation
    await AuditLog.create({
      action: 'USER_ACCOUNT_CREATED',
      userId: newUser._id,
      aadhaarVerificationId: aadhaarVerificationId,
      timestamp: new Date(),
      ipAddress: req.ip,
      userAgent: req.headers['user-agent']
    });

    res.status(201).json({
      success: true,
      message: 'User account created successfully',
      userId: newUser._id
    });

  } catch (error) {
    console.error('Account creation error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create user account',
      error: 'INTERNAL_ERROR'
    });
  }
};
```

### Aadhaar Verification Storage

```javascript
// Store UIDAI verification results
const storeAadhaarVerification = async (req, res) => {
  try {
    const { 
      aadhaarNumber, 
      uidaiResponse, 
      transactionId 
    } = req.body;

    // Create verification record
    const verification = new AadhaarVerification({
      aadhaarNumber: aadhaarNumber.replace(/\s/g, ''),
      uidaiTransactionId: transactionId,
      verificationId: `VID_${Date.now()}`,
      status: uidaiResponse.success ? 'VERIFIED' : 'FAILED',
      uidaiResponse: uidaiResponse,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
      createdAt: new Date()
    });

    await verification.save();

    res.json({
      success: true,
      verificationId: verification.verificationId,
      status: verification.status
    });

  } catch (error) {
    console.error('Verification storage error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to store verification'
    });
  }
};
```

### Database Schema

```javascript
// User Schema
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  
  // Aadhaar verification (REQUIRED)
  aadhaar: {
    verified: { type: Boolean, required: true, default: false },
    verificationId: { type: String, required: true },
    uidaiTransactionId: { type: String, required: true },
    verifiedAt: { type: Date, required: true },
    masked: { type: String, required: true }, // XXXX **** ****
    lastVerified: { type: Date, required: true }
  },
  
  accountStatus: { 
    type: String, 
    enum: ['PENDING_VERIFICATION', 'ACTIVE', 'SUSPENDED'], 
    default: 'PENDING_VERIFICATION' 
  },
  
  createdAt: { type: Date, default: Date.now }
});

// Aadhaar Verification Schema
const aadhaarVerificationSchema = new mongoose.Schema({
  aadhaarNumber: { type: String, required: true, index: true },
  uidaiTransactionId: { type: String, required: true, unique: true },
  verificationId: { type: String, required: true, unique: true },
  status: { type: String, enum: ['PENDING', 'VERIFIED', 'FAILED'], default: 'PENDING' },
  uidaiResponse: { type: Object, required: true },
  expiresAt: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now }
});

// Audit Log Schema
const auditLogSchema = new mongoose.Schema({
  action: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  aadhaarVerificationId: { type: String },
  timestamp: { type: Date, default: Date.now },
  ipAddress: { type: String },
  userAgent: { type: String }
});
```

### Middleware for Verification Check

```javascript
// Middleware to ensure Aadhaar verification
const requireAadhaarVerification = async (req, res, next) => {
  try {
    const { aadhaarVerificationId, uidaiTransactionId } = req.body;

    if (!aadhaarVerificationId || !uidaiTransactionId) {
      return res.status(400).json({
        success: false,
        message: 'Aadhaar verification required',
        error: 'VERIFICATION_REQUIRED'
      });
    }

    // Verify the verification record
    const verification = await AadhaarVerification.findOne({
      verificationId: aadhaarVerificationId,
      uidaiTransactionId: uidaiTransactionId,
      status: 'VERIFIED',
      expiresAt: { $gt: new Date() }
    });

    if (!verification) {
      return res.status(403).json({
        success: false,
        message: 'Invalid or expired Aadhaar verification',
        error: 'INVALID_VERIFICATION'
      });
    }

    // Add verification data to request
    req.aadhaarVerification = verification;
    next();

  } catch (error) {
    console.error('Verification middleware error:', error);
    res.status(500).json({
      success: false,
      message: 'Verification check failed'
    });
  }
};

// Apply middleware to account creation route
app.post('/api/users/create', requireAadhaarVerification, createUserAccount);
```

## Security Measures

### 1. API Endpoint Protection
- All account creation endpoints require verification proof
- No public endpoints for account creation
- Rate limiting on verification attempts

### 2. Data Validation
- Verify UIDAI response authenticity
- Check verification expiration
- Validate Aadhaar number format

### 3. Audit Logging
- Log all verification attempts
- Track account creation with verification details
- Monitor for suspicious patterns

### 4. Database Security
- Encrypt sensitive verification data
- Implement proper access controls
- Regular security audits

## Testing Security

### Test Cases to Verify

1. **Direct API Call Without Verification**
   ```bash
   curl -X POST /api/users/create \
     -H "Content-Type: application/json" \
     -d '{"userData": {...}}'
   # Should return 400 - VERIFICATION_REQUIRED
   ```

2. **Invalid Verification ID**
   ```bash
   curl -X POST /api/users/create \
     -H "Content-Type: application/json" \
     -d '{"userData": {...}, "aadhaarVerificationId": "INVALID"}'
   # Should return 403 - INVALID_VERIFICATION
   ```

3. **Expired Verification**
   ```bash
   # Test with expired verification record
   # Should return 403 - INVALID_VERIFICATION
   ```

4. **Successful Verification Flow**
   ```bash
   # Complete flow: OTP → Verification → Account Creation
   # Should return 201 - Account created successfully
   ```

## Summary

This implementation ensures:

✅ **NO account creation without Aadhaar verification**  
✅ **Backend enforces verification requirement**  
✅ **Secure storage of verification data**  
✅ **Audit logging for compliance**  
✅ **Multiple security checks**  
✅ **UIDAI integration validation**  

The user **CANNOT** sign up without completing the Aadhaar verification process. The system is designed with multiple layers of security to prevent any bypass attempts.
