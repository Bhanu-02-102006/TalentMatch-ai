const crypto = require("crypto");

/**
 * Hashes a password using PBKDF2 with a secure random salt.
 * @param {string} password 
 * @returns {string} The salt and hash formatted as 'salt:hash'
 */
function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
  return `${salt}:${hash}`;
}

/**
 * Compares a plain password against a stored hashed password.
 * @param {string} password 
 * @param {string} storedPassword The salt and hash formatted as 'salt:hash'
 * @returns {boolean} True if password matches, false otherwise
 */
function comparePassword(password, storedPassword) {
  if (!storedPassword || !storedPassword.includes(":")) {
    return false;
  }
  const [salt, originalHash] = storedPassword.split(":");
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
  return hash === originalHash;
}

module.exports = {
  hashPassword,
  comparePassword
};
