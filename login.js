if (isLoggedIn()) {
  location.href = "transactions.html";
}

const loginForm = document.getElementById("login-form");
const accountNumberElem = document.getElementById("account-number");
const accountPinElem = document.getElementById("account-pin");

// populate users in our database into the select field.
// note that this is done for testing purposes only.
const registeredUsers = getAllUsers();
registeredUsers.forEach((user) => {
  const optionElem = document.createElement("option");
  optionElem.value = user.accountNumber;
  optionElem.textContent = `${user.accountName} (${user.accountPin})`;
  accountNumberElem.append(optionElem);
});

// function for logging in
const login = () => {
  const accountNumber = accountNumberElem.value;
  const existingUser = getUserByAccountNumber(accountNumber);

  if (!existingUser) {
    alert("Account not found");
    return;
  }

  if (existingUser.accountPin !== accountPinElem.value) {
    alert("Incorrect PIN");
    return;
  }

  // all goes well, store user session and redirect to transactions page
  localStorage.setItem(
    "MB_LOGGEDIN_USER_ACCOUNT_NUMBER",
    accountNumber
  );

  location.href = "transactions.html";
}

loginForm.addEventListener("submit", login);
