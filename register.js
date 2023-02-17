const registerForm = document.getElementById("register-form");
const accountNameElem = document.getElementById("account-name");
const accountNumberElem = document.getElementById("account-number");
const accountPinElem = document.getElementById("account-pin");
const pinRepeatElem = document.getElementById("pin-repeat");
const regenerateAccountNumberBtn = document.getElementById(
  "regenerate-account-number-btn"
);

const generateAccountNumber = () => {
  const acctNum = Math.random().toString().slice(2, 12);
  accountNumberElem.value = acctNum;
};
generateAccountNumber();
regenerateAccountNumberBtn.addEventListener("click", generateAccountNumber);

const register = () => {
  if (accountPinElem.value !== pinRepeatElem.value) {
    alert("PINs do not match");
    return;
  }

  const accountNumber = accountNumberElem.value;
  const existingUser = getUserByAccountNumber();

  // TODO: check that a user with this account number does not already exist
  if (existingUser) {
    alert("A user with this account number already exists!");
    return;
  }

  // construct the new user object
  const newUserObject = {
    accountName: accountNameElem.value,
    accountNumber: accountNumber,
    accountPin: accountPinElem.value,
    transactions: [],
  };

  const registeredUsers = getAllUsers();

  // add the user to our database
  registeredUsers.push(newUserObject);
  setLocalStorageArrData("MB_USER_ACCOUNTS", registeredUsers);

  // navigate to login page
  location.href = "/";
};

registerForm.addEventListener("submit", register);
