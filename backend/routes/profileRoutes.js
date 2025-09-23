const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const {
    getProfile,
    updateProfile,
    addFamilyMember,
    updateFamilyMember,
    deleteFamilyMember,
    addEmergencyContact,
    updateEmergencyContact,
    deleteEmergencyContact,
    addDocumentToWallet,
    deleteDocumentFromWallet
} = require('../controllers/profileController');

// --- File Upload Middleware Setup (Multer) ---
const multer = require('multer');
// We will store uploaded documents in memory for this example.
// For production, you should use a service like AWS S3 or Google Cloud Storage.
const upload = multer({ storage: multer.memoryStorage() });

// This applies the 'protect' middleware to ALL routes in this file.
router.use(protect);

// --- Main Profile Routes ---
router.route('/me')
    .get(getProfile)       // GET /api/profile
    .put(updateProfile);    // PUT /api/profile

// --- Family Member Routes ---
router.route('/members')
    .post(addFamilyMember); // POST /api/profile/members

router.route('/members/:memberId')
    .put(updateFamilyMember)      // PUT /api/profile/members/:memberId
    .delete(deleteFamilyMember);  // DELETE /api/profile/members/:memberId

// --- Emergency Contact Routes ---
router.route('/contacts')
    .post(addEmergencyContact); // POST /api/profile/contacts

router.route('/contacts/:contactId')
    .put(updateEmergencyContact)    // PUT /api/profile/contacts/:contactId
    .delete(deleteEmergencyContact);// DELETE /api/profile/contacts/:contactId

// --- Document Wallet Routes ---
router.route('/documents')
    .post(upload.single('document'), addDocumentToWallet); // POST /api/profile/documents

router.route('/documents/:docId')
    .delete(deleteDocumentFromWallet); // DELETE /api/profile/documents/:docId

module.exports = router;