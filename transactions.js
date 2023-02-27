const clearHistoryButtonElem = document.getElementById("clear-history-btn");
const transactionsTableBody = document.getElementById(
  "transactions-table-body"
);

const renderTransactionRow = (transaction) => {
  if (!transaction) {
    return;
  }

  // row
  const transactionRow = document.createElement("tr");
  transactionRow.setAttribute("class", "transaction-row");

  //cell
  const rowDataKeys = [
    "timestamp",
    "transactionReference",
    "type",
    "amount",
    "balanceBefore",
    "balanceAfter",
    "beneficiaryAccountNumber",
  ];

  for (const rowDataKey of rowDataKeys) {
    const transactionRowData = document.createElement("td");
    transactionRowData.setAttribute("class", "transaction-data");
    // if transfer transaction, show beneficiary's name instead of account number
    if (
      rowDataKey === "beneficiaryAccountNumber" &&
      transaction["beneficiaryAccountNumber"]
    ) {
      const beneficiary = getUserByAccountNumber(transaction[rowDataKey]);
      const beneficiaryName = beneficiary?.accountName;
      transactionRowData.textContent =
        beneficiaryName || transaction[rowDataKey];
    } else {
      transactionRowData.textContent = transaction[rowDataKey];
    }
    //append cell to the transaction row
    transactionRow.append(transactionRowData);
  }

  transactionsTableBody.prepend(transactionRow);
};

const renderUserTransactions = () => {
  const currentUser = getUserByAccountNumber(currentUserAccountNumber);
  const userTransactions = currentUser.transactions;
  userTransactions.forEach((transaction) => {
    renderTransactionRow(transaction);
  });
};

renderUserTransactions();

const clearTransactionHistory = () => {
  const allUsers = getAllUsers();
  const currentUserIndex = getUserIndexByAccountNumber(
    currentUserAccountNumber
  );
  allUsers[currentUserIndex].transactions = [];

  setLocalStorageArrData("MB_USER_ACCOUNTS", allUsers);
  transactionsTableBody.innerHTML = "";
};

clearHistoryButtonElem.addEventListener("click", clearTransactionHistory);
