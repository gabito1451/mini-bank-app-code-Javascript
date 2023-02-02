if (!isLoggedIn()) {
  location.href = "index.html";
}
console.log("You can see this if only you're logged in!");

const userAccountNumberElement = document.getElementById("user-account-number");

const userAccountBalanceElement = document.getElementById(
  "user-account-balance"
);
const buttonElem = document.getElementById("clear-history-btn");

const tableDataElem = document.querySelectorAll(".transaction-data");

const accountNumber = localStorage.getItem("MB_LOGGEDIN_USER_ACCOUNT_NUMBER");

userAccountNumberElement.textContent = `Account: ${accountNumber}`;
userAccountBalanceElement.textContent = `#Balance`;

function deleteTransactionHistory() {
  tableDataElem.forEach((tableData) => {
    tableData.remove(tableDataElem);
  });
}

buttonElem.addEventListener("click", deleteTransactionHistory);
