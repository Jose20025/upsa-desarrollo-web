import bcrypt from 'bcrypt';

export const validatePassword = (plainPassword, password) => {
  return bcrypt.compareSync(plainPassword, password);
};
