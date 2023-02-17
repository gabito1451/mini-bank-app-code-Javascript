if (!isLoggedIn()) {
  location.href = "index.html";
}

const userAccountBalanceElem = document.getElementById("user-account-balance");
const logoutBtn = document.getElementById("logout-btn");

// important: used in session pages
const currentUserAccountNumber = localStorage.getItem(
  "MB_LOGGEDIN_USER_ACCOUNT_NUMBER"
);

logoutBtn.addEventListener("click", () => {
  // remove the local storage item and redirect to login page
  localStorage.removeItem("MB_LOGGEDIN_USER_ACCOUNT_NUMBER");
  location.href = "index.html";
});

const getUserCurrentBalance = () => {
  const currentUser = getUserByAccountNumber(currentUserAccountNumber);
  const prevTransaction =
    currentUser.transactions[currentUser.transactions.length - 1];
  const currentBalance = prevTransaction?.balanceAfter || 0;
  return currentBalance;
};

const currentBalance = getUserCurrentBalance();
userAccountBalanceElem.textContent = currentBalance;
