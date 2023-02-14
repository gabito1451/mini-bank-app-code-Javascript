const depositForm = document.getElementById("deposit-form");
const depositAmountElem = document.getElementById("deposit-amount");
const accountPinElem = document.getElementById("account-pin");

const currentUser = getUserByAccountNumber(currentUserAccountNumber);

const deposit = () => {
  if (accountPinElem.value !== currentUser.accountPin) {
    alert("Incorrect PIN.");
    return;
  }

  const allUsers = getAllUsers();

  // get the previous transaction before this one
  const currentBalance = getUserCurrentBalance();
  
  const transactionDetails = {
    timestamp: new Date(),
    transactionReference: `TR${Date.now()}`,
    type: "Deposit",
    amount: parseInt(depositAmountElem.value),
    balanceBefore: currentBalance,
    balanceAfter: currentBalance + parseInt(depositAmountElem.value),
  };

  // pushing the depositTransactionDetails in to the transaction array
  const currentUserIndex = getUserIndexByAccountNumber(currentUserAccountNumber);
  allUsers[currentUserIndex].transactions.push(transactionDetails);

  setLocalStorageArrData('MB_USER_ACCOUNTS', allUsers);

  // on deposit, move to transaction page
  location.href = "transactions.html";
};
depositForm.addEventListener("submit", () => deposit());
