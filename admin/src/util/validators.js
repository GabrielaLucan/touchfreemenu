export const checkMaxLength = (value, len) => (value && value.length <= len ? undefined : `trebuie să fie mai scurtă de ${len} caractere`);

export const checkMinLength = (value, len) => (value && value.length >= len ? undefined : `trebuie să fie mai lungă de ${len} caractere`);

export const checkValidChars = (value) => (/^[a-zA-Z0-9_-]+$/.test(value) ? undefined : 'conține caractere invalide');

export const checkValidPhoneChars = (value) => (/^[0-9+]+$/.test(value) ? undefined : 'cconține caractere invalide');

export const checkIfTrimmed = (value) => (value.trim() === value ? undefined : 'nu poate începe sau termina cu whitespace');

export const validUrl = (value) => {
  try {
    new URL(value);
    return undefined;
  } catch (error) {
    return 'trebuie să fie un url valid';
  }
};

const max = (len) => (value) => checkMaxLength(value, len);
const min = (len) => (value) => checkMinLength(value, len);
const validChars = (value) => checkValidChars(value);
const validPhoneChars = (value) => checkValidPhoneChars(value);
const trimmed = (value) => checkIfTrimmed(value);

export const required = (value) => (value ? undefined : 'obligatoriu');
export const postType = (value) => (value === 'link' || value === 'text' ? undefined : 'must be link or text post');
export const countryValidator = [required];
export const phoneNumberValidator = [required, min(7), max(20), validPhoneChars];
export const usernameValidator = [required, max(32), validChars, trimmed];
export const passwordValidator = [required, min(4), max(72)];
export const passwordConfirmValidator = (value, allValues) => (value !== allValues.newPassword ? 'Parolele nu sunt la fel' : undefined);
export const titleValidator = (value) => required(value) || checkMaxLength(value, 100);
export const textPostValidator = (value) => required(value) || checkMinLength(value, 4);
export const urlValidator = (value) => required(value) || validUrl(value);
export const typeValidator = (value) => required(value) || postType(value);
