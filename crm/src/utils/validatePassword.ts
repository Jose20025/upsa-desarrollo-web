import bcrypt from 'bcrypt';

export const validatePassword = (plainPassword: string, password: string) => {
  return bcrypt.compareSync(plainPassword, password);
};
