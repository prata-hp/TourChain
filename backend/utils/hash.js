const crypto = require('crypto');

const hashIdNumber = (idNumber) => {
  const pepper = process.env.ID_PEPPER || '';
  return crypto.createHmac('sha256', pepper).update(idNumber).digest('hex');
};

module.exports = { hashIdNumber };
