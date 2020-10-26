import scryptJs from 'scrypt-js';
import aesJs from 'aes-js';

import { SALT, IV } from 'keys';
import {
  deleteFinalCharactersFromMessage,
  getObjectFromString,
} from './object';

const defaultNodeCryptoOptions = {
  N: 16384,
  r: 8,
  p: 1,
  keylen: 24,
};

const generateCryptoKey = (password) =>
  Buffer.from(
    scryptJs.syncScrypt(
      Buffer.from(password),
      Buffer.from(SALT),
      defaultNodeCryptoOptions.N,
      defaultNodeCryptoOptions.r,
      defaultNodeCryptoOptions.p,
      defaultNodeCryptoOptions.keylen
    ).buffer
  );

const decryptMessage = (message, password) => {
  const cryptoKey = generateCryptoKey(password);

  const encryptedBytes = aesJs.utils.hex.toBytes(message);
  const aesCbc = new aesJs.ModeOfOperation.cbc(
    cryptoKey,
    Buffer.from(IV, 'hex')
  );
  const decryptedBytes = aesCbc.decrypt(encryptedBytes);
  const decryptedMessage = aesJs.utils.utf8.fromBytes(decryptedBytes);

  return decryptedMessage;
};

const encryptMessage = (message, password) => {
  const cryptoKey = generateCryptoKey(password);
  const decryptedBytes = aesJs.utils.utf8.toBytes(message);
  const aesCbc = new aesJs.ModeOfOperation.cbc(
    cryptoKey,
    Buffer.from(IV, 'hex')
  );

  const encryptedBytes = aesCbc.encrypt(decryptedBytes);
  const encryptedMessage = aesJs.utils.hex.fromBytes(encryptedBytes);

  return encryptedMessage;
};

const decryptJsonFromString = (string, password) => {
  const decryptedMessage = decryptMessage(string, password);

  // clean the final characters if they'd exist
  const decryptedCleanMessage = deleteFinalCharactersFromMessage(
    decryptedMessage
  );
  const json = getObjectFromString(decryptedCleanMessage);

  return json;
};

export { encryptMessage, decryptMessage, decryptJsonFromString };
