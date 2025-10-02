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

const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
router.use(protect);
router.route('/me')
    .get(getProfile)       
    .put(updateProfile);    
router.route('/members')
    .post(addFamilyMember); 
router.route('/members/:memberId')
    .put(updateFamilyMember)      
    .delete(deleteFamilyMember);  
router.route('/contacts')
    .post(addEmergencyContact); 
router.route('/contacts/:contactId')
    .put(updateEmergencyContact)   
    .delete(deleteEmergencyContact);
router.route('/documents')
    .post(upload.single('document'), addDocumentToWallet); 
router.route('/documents/:docId')
    .delete(deleteDocumentFromWallet); 

module.exports = router;