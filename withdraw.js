const withdrawalForm = document.getElementById("withdrawal-form");
const withdrawalAmountElem = document.getElementById("withdrawal-amount");
const accountPinElem = document.getElementById("account-pin");

const currentUser = getUserByAccountNumber(currentUserAccountNumber);

const withdraw = () => {
  // get the previous transaction before this one
  const currentBalance = getUserCurrentBalance();
  const allUsers = getAllUsers();

  if (accountPinElem.value !== currentUser.accountPin) {
    alert("Incorrect PIN.");
    return;
  }
  if (withdrawalAmountElem.value > currentBalance) {
    alert("Insufficient Balance");
    return;
  }
  if (withdrawalAmountElem.value < 1) {
    alert("Enter a valid amount");
    return;
  }

  const transactionDetails = {
    timestamp: new Date(),
    transactionReference: `TR${Date.now()}`,
    type: "Withdraw",
    amount: parseInt(withdrawalAmountElem.value),
    balanceBefore: currentBalance,
    balanceAfter: currentBalance - parseInt(withdrawalAmountElem.value),
  };

  // pushing the withdrawal TransactionDetails in to the transaction array
  const currentUserIndex = getUserIndexByAccountNumber(
    currentUserAccountNumber
  );
  allUsers[currentUserIndex].transactions.push(transactionDetails);

  setLocalStorageArrData("MB_USER_ACCOUNTS", allUsers);

  // on transfer, move to transaction page
  location.href = "transactions.html";
};
withdrawalForm.addEventListener("submit", () => withdraw());
