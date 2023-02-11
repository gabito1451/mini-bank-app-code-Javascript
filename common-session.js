const userAccountNumber = document.getElementById("user-account-number");

const userAccountBalance = document.getElementById("user-account-balance");

const accountNumber = localStorage.getItem("MB_LOGGEDIN_USER_ACCOUNT_NUMBER");

const userAccountBalanceElement = document.getElementById(
  "user-account-balance"
);

let accountBalance = 0;
