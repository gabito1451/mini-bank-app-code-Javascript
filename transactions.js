if (!isLoggedIn()) {
  location.href = "index.html";
}

const clearHistoryButtonElem = document.getElementById("clear-history-btn");

const transactionTableDataElem = document.getElementById(
  "transactions-table-body"
);

const storedTransactionsInfo = JSON.parse(
  localStorage.getItem("userTransactionArr")
);

const addRows = () => {
  storedTransactionsInfo.forEach((transaction) => {
    transactionTableDataElem.innerHTML += `<tr class="transaction-row"><td class="transaction-data">${transaction.timestamp}</td>
  <td class="transaction-data">${transaction.transactionReference}</td>
  <td class="transaction-data">${transaction.type}</td>
  <td class="transaction-data">${transaction.amount}</td>
  <td class="transaction-data">${transaction.balanceBefor}</td>
  <td class="transaction-data">${transaction.balanceAfter}</td>
  <td class="transaction-data">${transaction.beneficiaryAccountNumber}</td>
  </tr>
  `;
  });
};
addRows();

const clearTransactionHistory = () => {
  console.log(localStorage.removeItem("userTransactionArr"));
  location.reload();
};

clearHistoryButtonElem.addEventListener("click", clearTransactionHistory);
