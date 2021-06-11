const verifyUserLocalStorage = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user) return user;
  return false;
};

export default verifyUserLocalStorage;
