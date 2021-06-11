const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.+-]+\.com/;
const MIN_NUMBER = 6;
const MIN_NAME_LENGTH = 12;

const validateFields = (email, password) => {
  if (
    regexEmail.test(String(email).toLowerCase())
    && password.length >= MIN_NUMBER
  ) return true;
  return false;
};

const validateName = (name) => {
  const onlyLetters = /^[a-zA-Z_ ]*$/;
  if (name.length >= MIN_NAME_LENGTH && onlyLetters.test(name)) return true;
  return false;
};

export {
  validateFields,
  validateName,
};
