const isLoggedIn = () => {
  const accountNumber = localStorage.getItem("MB_LOGGEDIN_USER_ACCOUNT_NUMBER");
  return !!accountNumber;
};

const getAllUsers = () => {
  const usersStr = localStorage.getItem("MB_USER_ACCOUNTS") || null;
  const usersArr = JSON.parse(usersStr) || [];
  return usersArr;
};

const getUserByAccountNumber = (accountNumber) => {
  const usersArr = getAllUsers();
  const user = usersArr.find((user) => user.accountNumber === accountNumber);
  return user;
};

const getUserIndexByAccountNumber = (accountNumber) => {
  const usersArr = getAllUsers();
  const userIndex = usersArr.findIndex(
    (user) => user.accountNumber === accountNumber
  );
  return userIndex;
};

const setLocalStorageArrData = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};
