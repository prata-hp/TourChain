const Profile = require('../models/Profile');
// NOTE: In a real application, you would have a service to upload files to a cloud provider.
// const { uploadFileToCloud } = require('../services/fileUploadService');

// @desc    Get user profile
// @route   GET /api/profile
exports.getProfile = async (req, res) => {
    try {
        // req.user.id is available because of the 'protect' middleware
        const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['phone', 'role']);
        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }
        res.json(profile);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Update user profile
// @route   PUT /api/profile
exports.updateProfile = async (req, res) => {
    const { fullName, email, idType, idNumberHash, medical } = req.body;
    try {
        const profile = await Profile.findOneAndUpdate(
            { user: req.user.id },
            { $set: { fullName, email, idType, idNumberHash, medical } },
            { new: true, runValidators: true }
        );
        res.json(profile);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Add a family member
// @route   POST /api/profile/members
exports.addFamilyMember = async (req, res) => {
    const { fullName, age, idNumberHash } = req.body;
    try {
        const profile = await Profile.findOne({ user: req.user.id });
        profile.familyMembers.push({ fullName, age, idNumberHash });
        await profile.save();
        res.status(201).json(profile.familyMembers);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Update a family member
// @route   PUT /api/profile/members/:memberId
exports.updateFamilyMember = async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id });
        const member = profile.familyMembers.id(req.params.memberId);
        if (!member) return res.status(404).json({ message: 'Family member not found' });

        Object.assign(member, req.body); // Update member fields
        await profile.save();
        res.json(profile.familyMembers);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Delete a family member
// @route   DELETE /api/profile/members/:memberId
exports.deleteFamilyMember = async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id });
        const member = profile.familyMembers.id(req.params.memberId);
        if (!member) return res.status(404).json({ message: 'Family member not found' });

        member.remove();
        await profile.save();
        res.json({ message: 'Family member removed' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

// --- Emergency Contact Functions (similar logic to family members) ---
exports.addEmergencyContact = async (req, res) => { /* ... similar to addFamilyMember ... */ };
exports.updateEmergencyContact = async (req, res) => { /* ... similar to updateFamilyMember ... */ };
exports.deleteEmergencyContact = async (req, res) => { /* ... similar to deleteFamilyMember ... */ };

// --- Document Wallet Functions ---
// @desc    Add a document to the wallet
// @route   POST /api/profile/documents
exports.addDocumentToWallet = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'Please upload a file' });
        }
        // In a real app, you'd upload req.file.buffer to a cloud service here
        // const fileUrl = await uploadFileToCloud(req.file);
        const fileUrl = `https://fake-storage.com/${req.file.originalname}`; // Placeholder URL

        const profile = await Profile.findOne({ user: req.user.id });
        profile.documentWallet.push({ docName: req.body.docName, docUrl: fileUrl });
        await profile.save();
        res.status(201).json(profile.documentWallet);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

// @desc    Delete a document from the wallet
// @route   DELETE /api/profile/documents/:docId
exports.deleteDocumentFromWallet = async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id });
        const doc = profile.documentWallet.id(req.params.docId);
        if (!doc) return res.status(404).json({ message: 'Document not found' });

        // In a real app, you'd also delete the file from your cloud storage here
        doc.remove();
        await profile.save();
        res.json({ message: 'Document removed' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};