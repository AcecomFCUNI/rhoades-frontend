import crypto from 'crypto';
import generator from 'generate-password';

const ALGORITHM = process.env.ALGORITHM;
const IV = process.env.IV;
const KEY = process.env.KEY;

const generateCryptoKey = (password) => {
  return crypto.scryptSync(password, KEY, 24);
};

const encryptMessage = (message, password) => {
  const cryptoKey = generateCryptoKey(password);
  const cipher = crypto.createCipheriv(
    ALGORITHM,
    cryptoKey,
    Buffer.from(IV, 'hex')
  );
  const messageEncrypted =
    cipher.update(message, 'utf8', 'hex') + cipher.final('hex');

  return messageEncrypted;
};

const decryptMessage = (message, password) => {
  const cryptoKey = generateCryptoKey(password);
  const decipher = crypto.createDecipheriv(
    ALGORITHM,
    cryptoKey,
    Buffer.from(IV, 'hex')
  );
  const messageDecrypted =
    decipher.update(message, 'hex', 'utf8') + decipher.final('utf8');

  return messageDecrypted;
};

const generatePassword = (password) => {
  const newPassword = generator.generate({
    length: 16,
    lowercase: true,
    numbers: true,
    strict: true,
    symbols: true,
    uppercase: true,
  });

  return encryptMessage(newPassword, password);
};

export { decryptMessage, encryptMessage, generatePassword };
