const Profile = require('../models/Profile');
exports.getProfile = async (req, res) => {
    try {
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
exports.updateFamilyMember = async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id });
        const member = profile.familyMembers.id(req.params.memberId);
        if (!member) return res.status(404).json({ message: 'Family member not found' });

        Object.assign(member, req.body); 
        await profile.save();
        res.json(profile.familyMembers);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};
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
exports.addEmergencyContact = async (req, res) => { };
exports.updateEmergencyContact = async (req, res) => { };
exports.deleteEmergencyContact = async (req, res) => { };
exports.addDocumentToWallet = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'Please upload a file' });
        }
        const fileUrl = `https://fake-storage.com/${req.file.originalname}`;

        const profile = await Profile.findOne({ user: req.user.id });
        profile.documentWallet.push({ docName: req.body.docName, docUrl: fileUrl });
        await profile.save();
        res.status(201).json(profile.documentWallet);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

exports.deleteDocumentFromWallet = async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id });
        const doc = profile.documentWallet.id(req.params.docId);
        if (!doc) return res.status(404).json({ message: 'Document not found' });
        doc.remove();
        await profile.save();
        res.json({ message: 'Document removed' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};