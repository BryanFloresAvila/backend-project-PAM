const bcryptjs = require('bcryptjs');
/**
 * @param  {String} password
 * @return {Promise}
 * TODO: return hash instead of password
 */
const encrypt = async (password) => {
  try {
    return await bcryptjs.hash(password, 10);
  } catch (error) {
    return new Error('Error encrypting password');
  }
};
/**
 * @param  {String} password
 * @param  {String} hash
 * @return {Promise}
 * TODO: return true if password is correct and false if not
 */
const compare = async (password, hash) => {
  try {
    return await bcryptjs.compare(password, hash);
  } catch (error) {
    return new Error('Error comparing password');
  }
};
module.exports = { encrypt, compare };
